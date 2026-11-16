import http.cookiejar
import json
import re
import time
import urllib.error
import urllib.request
import uuid

API_BASE = "http://127.0.0.1:8000/api/v1"
MAILPIT_BASE = "http://127.0.0.1:8025/api/v1"
ORIGIN = "http://localhost:3000"

cookie_jar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookie_jar))

def request(method, path, body=None, headers=None):
    url = f"{API_BASE}{path}"
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    req.add_header("Origin", ORIGIN)
    req.add_header("X-Requested-With", "XMLHttpRequest")
    if headers:
        for k, v in headers.items():
            req.add_header(k, v)
    try:
        with opener.open(req) as resp:
            content = resp.read().decode("utf-8")
            return resp.status, json.loads(content) if content else None
    except urllib.error.HTTPError as e:
        content = e.read().decode("utf-8")
        return e.code, json.loads(content) if content else None

def get_latest_mailpit_token(to_email, link_type="verify-email", retries=6, delay=0.5):
    for _ in range(retries):
        time.sleep(delay)
        req = urllib.request.Request(f"{MAILPIT_BASE}/messages")
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        for msg in data.get("messages", []):
            to_addresses = [t.get("Address", "").lower() for t in msg.get("To", [])]
            if to_email.lower() in to_addresses:
                msg_id = msg["ID"]
                m_req = urllib.request.Request(f"{MAILPIT_BASE}/message/{msg_id}")
                with urllib.request.urlopen(m_req) as m_resp:
                    m_data = json.loads(m_resp.read().decode("utf-8"))
                    html = m_data.get("HTML", "") + m_data.get("Text", "")
                    match = re.search(rf"{link_type}\?token=([a-zA-Z0-9_\-]+)", html)
                    if match:
                        return match.group(1)
    return None

def run_tests():
    print("=== Step 2 End-to-End Verification ===")
    test_email = f"testfounder_{uuid.uuid4().hex[:6]}@forma.dev"
    password = "LivePassword123!"

    # 1. Register
    print("1. Registering user:", test_email)
    st, data = request("POST", "/auth/register", {
        "email": test_email,
        "password": password,
        "role": "startup",
        "display_name": "Live Founder"
    })
    print("   Register status:", st, "| Primary email:", data.get("primary_email"))
    assert st == 201, f"Expected 201, got {st}"

    # 2. Inspect Mailpit for verification token
    print("2. Retrieving verification token from Mailpit...")
    verify_token = get_latest_mailpit_token(test_email, "verify-email")
    print("   Verification token extracted:", verify_token[:10] + "...")
    assert verify_token is not None, "Failed to extract verification token from Mailpit"

    # 3. Verify Email
    print("3. Verifying email with token...")
    st, data = request("POST", "/auth/verify-email", {"token": verify_token})
    print("   Verify status:", st, "| Message:", data.get("message"))
    assert st == 200

    # 4. Login
    print("4. Logging in...")
    st, data = request("POST", "/auth/login", {"email": test_email, "password": password})
    print("   Login status:", st, "| Token type:", data.get("token_type"))
    assert st == 200
    access_token = data["access_token"]
    assert any(c.name == "refresh_token" for c in cookie_jar), "refresh_token cookie not found"

    # 5. Refresh token
    print("5. Refreshing token via cookie...")
    st, data = request("POST", "/auth/refresh")
    print("   Refresh status:", st, "| New access token received")
    assert st == 200
    new_access_token = data["access_token"]

    # 6. GET /users/me
    print("6. Fetching /users/me with access token...")
    st, data = request("GET", "/users/me", headers={"Authorization": f"Bearer {new_access_token}"})
    print("   /users/me status:", st, "| Display name:", data.get("display_name"), "| Roles:", [r["role"] for r in data.get("roles", [])])
    assert st == 200
    assert data["roles"][0]["role"] == "startup"

    # 7. Logout
    print("7. Logging out...")
    st, data = request("POST", "/auth/logout")
    print("   Logout status:", st, "| Message:", data.get("message"))
    assert st == 200

    # 8. Forgot password
    print("8. Requesting password reset...")
    st, data = request("POST", "/auth/forgot-password", {"email": test_email})
    print("   Forgot password status:", st, "| Message:", data.get("message"))
    assert st == 200

    # 9. Extract reset token from Mailpit
    print("9. Extracting password reset token from Mailpit...")
    reset_token = get_latest_mailpit_token(test_email, "reset-password")
    print("   Reset token extracted:", reset_token[:10] + "...")
    assert reset_token is not None

    # 10. Reset password
    new_password = "UpdatedPassword456!"
    print("10. Resetting password...")
    st, data = request("POST", "/auth/reset-password", {
        "token": reset_token,
        "new_password": new_password
    })
    print("    Reset password status:", st, "| Message:", data.get("message"))
    assert st == 200

    # 11. Login with new password
    print("11. Logging in with new password...")
    st, data = request("POST", "/auth/login", {"email": test_email, "password": new_password})
    print("    Login with new password status:", st)
    assert st == 200

    # 12. Login with old password fails
    print("12. Verifying old password fails...")
    st, data = request("POST", "/auth/login", {"email": test_email, "password": password})
    print("    Old password login status:", st, "| Code:", data.get("error", {}).get("code"))
    assert st == 401

    # 13. Test dev seed accounts
    print("13. Verifying dev seeded accounts login...")
    roles = ["startup", "mentor", "investor", "jobseeker", "employer"]
    for role in roles:
        email = f"{role}@forma.dev"
        st, data = request("POST", "/auth/login", {"email": email, "password": "DevPassword123!"})
        assert st == 200, f"Failed dev login for {email}"
        print(f"    - Dev {role} login: OK")

    print("\n>>> ALL 13 VERIFICATION CHECKS PASSED! <<<")

if __name__ == "__main__":
    run_tests()

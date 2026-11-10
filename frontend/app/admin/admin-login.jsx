"use client";
import { useState } from "react";
import Link from "next/link";
import {
  LockKeyhole,
  ShieldCheck,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Building as BuildingIcon,
} from "lucide-react";
import {
  INK, INK_SOFT, IVORY, WHITE, GOLD, GOLD_DARK, GOLD_TINT,
  STONE_700, STONE_400, STONE_200,
  ERROR, ERROR_TINT,
  RADIUS_CARD, RADIUS_CONTROL,
  environment,
  toast,
  Card, Btn, BtnIcon,
  EnvironmentStrip,
} from "./admin-ui-shared";

export function AdminLoginPage() {
  const [busy, setBusy] = useState(false);
  const [method, setMethod] = useState("sso"); // sso | key | email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      toast("Sign-in complete — opening Admin Console");
    }, 800);
  };

  const isProd = environment === "production";

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <EnvironmentStrip />

      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
        <div className="w-full max-w-[440px]">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-8">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-solid border-[#E5E1D8] bg-white font-serif text-lg font-bold">ADM</span>
            <div>
              <h1 className="text-[20px] font-serif font-semibold">Admin Console</h1>
              <p className="text-[11px] text-[#4A5568]">
                Internal team console · {isProd ? "All actions logged" : "Synthetic data only"}
              </p>
            </div>
          </div>

          <Card title="Sign in" padded className="border-[#E5E1D8]">
            <div className="px-5 pt-3 pb-4 space-y-4">
              {/* Method selector */}
              <div className="flex gap-2 border-b border-solid border-[#E5E1D8] pb-3 mb-2">
                <Btn
                  size="small"
                  secondary={method !== "sso"}
                  onClick={() => { setMethod("sso"); setErr(""); }}
                  icon={BuildingIcon}
                  title="Sign in with company SSO"
                >
                  Company SSO
                </Btn>
                <Btn
                  size="small"
                  secondary={method !== "key"}
                  onClick={() => { setMethod("key"); setErr(""); }}
                  icon={ShieldCheck}
                  title="Use hardware key"
                >
                  Hardware key
                </Btn>
                <Btn
                  size="small"
                  secondary={method !== "email"}
                  onClick={() => { setMethod("email"); setErr(""); }}
                  icon={Mail}
                  title="Sign in with work email"
                >
                  Work email
                </Btn>
              </div>

              {method === "sso" && (
                <>
                  <p className="text-[11px] text-[#4A5568] mb-3">
                    Sign in through your company identity provider. Mandatory two-factor with a registered hardware key applies after SSO.
                  </p>
                  <Btn
                    disabled={busy}
                    onClick={handleSignIn}
                    icon={ArrowRight}
                    className="w-full"
                    title="Continue to SSO"
                  >
                    {busy ? "Signing in…" : "Continue to company sign-in"}
                  </Btn>
                  <p className="text-[11px] text-[#B8955A] mt-3">
                    Recommended — single sign-on with hardware key
                  </p>
                </>
              )}

              {method === "key" && (
                <>
                  <p className="text-[11px] text-[#4A5568] mb-3">
                    Insert your registered hardware key and touch it to authenticate. This is required for all admin console access.
                  </p>
                  <Btn
                    disabled={busy}
                    onClick={handleSignIn}
                    icon={ShieldCheck}
                    className="w-full"
                    title="Authenticate with key"
                  >
                    {busy ? "Authenticating…" : "Authenticate with security key"}
                  </Btn>
                </>
              )}

              {method === "email" && (
                <>
                  <label className="block text-[10px] font-medium text-[#4A5568] mb-1">Work email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.in"
                    className="w-full h-10 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-3 pr-10 text-[12px] focus:outline-none focus:border-[#B8955A] transition"
                  />
                  <label className="block text-[10px] font-medium text-[#4A5568] mt-3 mb-1">Password</label>
                  <div className="relative mt-2 block">
                    <input
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      className="w-full h-10 pr-12 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-3 text-[12px] focus:outline-none focus:border-[#B8955A] transition"
                    />
                    <BtnIcon
                      size="small"
                      secondary
                      icon={show ? EyeOff : Eye}
                      title={show ? "Hide password" : "Show password"}
                      onClick={() => setShow(!show)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    />
                  </div>
                  <Btn
                    disabled={busy}
                    onClick={handleSignIn}
                    className="w-full mt-4"
                    title="Sign in"
                  >
                    {busy ? "Signing in…" : "Sign in"}
                  </Btn>
                </>
              )}

              {err && (
                <p className="text-[11px] text-[#B42318] font-medium">{err}</p>
              )}
            </div>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-[#4A5568]">
              Admin console access requires mandatory two-factor.{" "}
              <Link href="/help" className="text-[#B8955A] font-medium hover:underline">
                Need help?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

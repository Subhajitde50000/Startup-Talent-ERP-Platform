'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LockKeyhole,
  ShieldCheck,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Building as BuildingIcon,
  CheckCircle,
} from 'lucide-react';
import {
  Card,
  Btn,
  BtnIcon,
  EnvironmentStrip,
  environment,
} from '@/components/admin-ui';

export default function AdminLoginPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [method, setMethod] = useState('sso'); // 'sso' | 'key' | 'email'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    if (method === 'email' && (!email || !password)) {
      setError('Please provide both work email and password.');
      return;
    }

    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSuccessMsg('Authentication successful — redirecting to Admin Console...');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 700);
    }, 900);
  };

  const isProd = environment === 'production';

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D] flex flex-col justify-between">
      <div>
        <EnvironmentStrip />

        <main className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-8">
          <div className="w-full max-w-[440px]">
            {/* Brand Header */}
            <div className="flex items-center gap-3 mb-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#E5E1D8] bg-white font-serif text-lg font-bold shadow-xs">
                ADM
              </span>
              <div>
                <h1 className="text-xl font-serif font-semibold tracking-tight text-[#0F1B2D]">
                  Admin Console
                </h1>
                <p className="text-xs text-[#4A5568]">
                  Internal operations console · {isProd ? 'Audit logged' : 'Synthetic environment'}
                </p>
              </div>
            </div>

            {/* Login Card */}
            <Card title="Operator Authentication" titleIcon={LockKeyhole} padded className="shadow-sm">
              <div className="space-y-5">
                {/* Auth Method Selector */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                  <button
                    type="button"
                    onClick={() => { setMethod('sso'); setError(''); }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-medium rounded-md transition-all ${
                      method === 'sso'
                        ? 'bg-white text-[#0F1B2D] shadow-xs border border-[#E5E1D8]'
                        : 'text-[#4A5568] hover:text-[#0F1B2D]'
                    }`}
                  >
                    <BuildingIcon size={13} />
                    <span>SSO</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMethod('key'); setError(''); }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-medium rounded-md transition-all ${
                      method === 'key'
                        ? 'bg-white text-[#0F1B2D] shadow-xs border border-[#E5E1D8]'
                        : 'text-[#4A5568] hover:text-[#0F1B2D]'
                    }`}
                  >
                    <ShieldCheck size={13} />
                    <span>Security Key</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMethod('email'); setError(''); }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-medium rounded-md transition-all ${
                      method === 'email'
                        ? 'bg-white text-[#0F1B2D] shadow-xs border border-[#E5E1D8]'
                        : 'text-[#4A5568] hover:text-[#0F1B2D]'
                    }`}
                  >
                    <Mail size={13} />
                    <span>Work Email</span>
                  </button>
                </div>

                {successMsg && (
                  <div className="flex items-center gap-2 rounded-lg bg-[#E7F3EC] border border-[#2E7D5B]/30 p-3 text-xs text-[#286749]">
                    <CheckCircle size={15} />
                    <span>{successMsg}</span>
                  </div>
                )}

                {error && (
                  <div className="rounded-lg bg-[#FBE9E7] border border-[#B42318]/30 p-3 text-xs text-[#B42318]">
                    {error}
                  </div>
                )}

                {/* Form Panels */}
                <form onSubmit={handleSignIn} className="space-y-4">
                  {method === 'sso' && (
                    <div className="space-y-4">
                      <p className="text-xs text-[#4A5568] leading-relaxed">
                        Sign in through your verified company identity provider (Okta / Google Workspace / Azure AD). Mandatory hardware key FIDO2 challenge applies.
                      </p>
                      <Btn
                        disabled={busy}
                        type="submit"
                        icon={ArrowRight}
                        className="w-full justify-center py-2.5"
                      >
                        {busy ? 'Connecting to Identity Provider...' : 'Authenticate with Enterprise SSO'}
                      </Btn>
                      <div className="rounded-lg border border-[#F3EBDD] bg-[#FAF8F4] p-3 text-xs text-[#9A7A45]">
                        <span className="font-semibold">Recommended:</span> Enterprise SSO enforces zero-trust posture and hardware attestation.
                      </div>
                    </div>
                  )}

                  {method === 'key' && (
                    <div className="space-y-4">
                      <p className="text-xs text-[#4A5568] leading-relaxed">
                        Insert your hardware security key (YubiKey or platform passkey) and touch it when prompted. Hardware attestation is required for all administrative sessions.
                      </p>
                      <Btn
                        disabled={busy}
                        type="submit"
                        icon={ShieldCheck}
                        className="w-full justify-center py-2.5"
                      >
                        {busy ? 'Waiting for Security Key touch...' : 'Authenticate via Security Key'}
                      </Btn>
                    </div>
                  )}

                  {method === 'email' && (
                    <div className="space-y-3.5">
                      <div>
                        <label htmlFor="admin-email" className="block text-xs font-medium text-[#0F1B2D] mb-1.5">
                          Work Email
                        </label>
                        <input
                          id="admin-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="operator@company.in"
                          required
                          className="w-full h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs text-[#0F1B2D] placeholder-[#A0A7B4] focus:outline-none focus:border-[#B8955A] focus:ring-1 focus:ring-[#B8955A] transition"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label htmlFor="admin-password" className="text-xs font-medium text-[#0F1B2D]">
                            Password
                          </label>
                          <Link href="/admin/help" className="text-xs text-[#B8955A] hover:underline">
                            Reset password
                          </Link>
                        </div>
                        <div className="relative">
                          <input
                            id="admin-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Enter operator password"
                            required
                            className="w-full h-10 pr-10 rounded-lg border border-[#E5E1D8] bg-white pl-3 text-xs text-[#0F1B2D] placeholder-[#A0A7B4] focus:outline-none focus:border-[#B8955A] focus:ring-1 focus:ring-[#B8955A] transition"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568] hover:text-[#0F1B2D]"
                          >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>

                      <Btn
                        disabled={busy}
                        type="submit"
                        className="w-full justify-center py-2.5 mt-2"
                      >
                        {busy ? 'Authenticating Operator...' : 'Sign In'}
                      </Btn>
                    </div>
                  )}
                </form>
              </div>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-xs text-[#4A5568]">
                Protected console. Unauthorized access attempts are monitored and recorded.{' '}
                <Link href="/admin/help" className="text-[#B8955A] font-medium hover:underline">
                  Operator Support
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>

      <footer className="py-4 text-center text-xs text-[#4A5568] border-t border-[#E5E1D8]">
        Startup Talent ERP Platform · Internal Administration Console
      </footer>
    </div>
  );
}

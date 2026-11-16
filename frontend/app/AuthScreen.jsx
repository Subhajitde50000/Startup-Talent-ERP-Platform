'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  LockKeyhole,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Mail,
  Building2,
  Users,
  Briefcase,
  Lightbulb,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError } from '@/lib/api';

const ROLES = [
  { label: 'Startup', value: 'startup', desc: 'Build and grow a company', icon: Building2 },
  { label: 'Mentor', value: 'mentor', desc: 'Share experience and guide founders', icon: Lightbulb },
  { label: 'Investor', value: 'investor', desc: 'Discover and support ambitious teams', icon: Briefcase },
  { label: 'Job seeker', value: 'jobseeker', desc: 'Find your next meaningful role', icon: Users },
  { label: 'Employer', value: 'employer', desc: 'Build a team that moves you forward', icon: Building2 },
];

const TITLES = {
  login: ['Welcome back', 'Sign in to continue to your workspace.'],
  register: ['Create your account', 'One account for the people building what’s next.'],
  role: ['How will you use Forma?', 'Choose a starting point. You can add other roles later.'],
  verify: ['Verify your email', 'We sent a verification link to your inbox.'],
  forgot: ['Forgot your password?', 'Enter your email and we’ll send you a reset link.'],
  reset: ['Set a new password', 'Choose a strong password you haven’t used before.'],
  onboarding: ['Let’s make this yours', 'A few details to set up your workspace.'],
};

export default function AuthScreen({ page }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, pendingRegistration, setPendingRegistration, clearPendingRegistration, getDashboardPath } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('startup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & error states
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [successNotice, setSuccessNotice] = useState('');

  // Special states: unverified account prompt, resend cooldown timer
  const [showUnverifiedResend, setShowUnverifiedResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendBusy, setResendBusy] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  // Token from URL (for verify-email and reset-password)
  const tokenFromUrl = searchParams ? searchParams.get('token') : null;
  const registeredEmail = searchParams ? searchParams.get('email') : null;

  // Initialize email from URL or pending registration
  useEffect(() => {
    if (registeredEmail) {
      setEmail(registeredEmail);
    } else if (pendingRegistration?.email) {
      setEmail(pendingRegistration.email);
    }
  }, [registeredEmail, pendingRegistration]);

  // Resend cooldown timer decrement
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Automatic token verification when landing on /verify-email?token=XYZ
  useEffect(() => {
    if (page === 'verify' && tokenFromUrl) {
      let isSubscribed = true;
      setBusy(true);
      setErrorMsg('');

      api.verifyEmail(tokenFromUrl)
        .then(() => {
          if (isSubscribed) {
            setSuccessNotice('Your email has been verified successfully. Your account is now active.');
          }
        })
        .catch((err) => {
          if (isSubscribed) {
            setErrorMsg(err.message || 'This verification link is invalid or has expired.');
            setShowUnverifiedResend(true);
          }
        })
        .finally(() => {
          if (isSubscribed) {
            setBusy(false);
          }
        });

      return () => {
        isSubscribed = false;
      };
    }
  }, [page, tokenFromUrl]);

  // Handle Resend Verification Email
  const handleResendVerification = useCallback(async (targetEmail) => {
    const emailToSend = targetEmail || email || (pendingRegistration?.email);
    if (!emailToSend) {
      setErrorMsg('Please enter your email address to receive a verification link.');
      return;
    }
    setResendBusy(true);
    setResendMessage('');
    try {
      const resp = await api.resendVerification(emailToSend);
      setResendMessage(resp?.message || 'If an account exists, a fresh verification link was sent.');
      setResendCooldown(60);
    } catch (err) {
      if (err.status === 429) {
        setResendMessage('Please wait before requesting another verification link.');
        setResendCooldown(60);
      } else {
        setResendMessage(err.message || 'Unable to resend verification. Please try again later.');
      }
    } finally {
      setResendBusy(false);
    }
  }, [email, pendingRegistration]);

  // Main form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setFieldErrors({});
    setSuccessNotice('');
    setShowUnverifiedResend(false);

    // Flow 1: Login
    if (page === 'login') {
      if (!email.trim() || !password) {
        setErrorMsg('Please enter your email and password.');
        return;
      }
      setBusy(true);
      try {
        await login({ email: email.trim(), password });
        router.push(getDashboardPath());
      } catch (err) {
        if (err.status === 429) {
          setErrorMsg('Too many failed sign-in attempts. Please try again later.');
        } else if (err.status === 403) {
          if (err.message && err.message.toLowerCase().includes('suspended')) {
            setErrorMsg('Your account has been suspended. Please contact support.');
          } else {
            setErrorMsg(err.message || 'Access denied.');
          }
        } else if (err.status === 401) {
          setErrorMsg('Invalid email or password.');
        } else {
          setErrorMsg(err.message || 'Sign in failed. Please check your credentials.');
        }
      } finally {
        setBusy(false);
      }
      return;
    }

    // Flow 2: Register (Step 1: credentials)
    if (page === 'register') {
      if (!email.trim()) {
        setFieldErrors({ email: 'Email is required.' });
        return;
      }
      if (!password || password.length < 8) {
        setFieldErrors({ password: 'Password must be at least 8 characters long.' });
        return;
      }

      // Store credentials strictly in memory
      setPendingRegistration({
        email: email.trim(),
        password,
      });
      router.push('/register/role');
      return;
    }

    // Flow 3: Role selection (Step 2: submit registration to API)
    if (page === 'role') {
      if (!pendingRegistration || !pendingRegistration.email || !pendingRegistration.password) {
        router.push('/register');
        return;
      }
      if (!selectedRole) {
        setErrorMsg('Please select how you will use Forma.');
        return;
      }

      setBusy(true);
      try {
        await api.register({
          email: pendingRegistration.email,
          password: pendingRegistration.password,
          role: selectedRole,
        });

        // Clear in-memory draft after successful submission
        clearPendingRegistration();
        router.push(`/verify-email?email=${encodeURIComponent(pendingRegistration.email)}`);
      } catch (err) {
        if (err.status === 429) {
          setErrorMsg('Too many registration attempts. Please try again later.');
        } else if (err.status === 409) {
          setErrorMsg('An account with this email already exists.');
        } else if (err.details && Array.isArray(err.details)) {
          // Field-level validation errors from Pydantic schema
          const fieldMap = {};
          for (const d of err.details) {
            const loc = d.loc ? d.loc[d.loc.length - 1] : 'form';
            fieldMap[loc] = d.msg;
          }
          setFieldErrors(fieldMap);
          setErrorMsg(err.message || 'Please correct the errors indicated below.');
        } else {
          setErrorMsg(err.message || 'Registration failed. Please try again.');
        }
      } finally {
        setBusy(false);
      }
      return;
    }

    // Flow 4: Forgot Password
    if (page === 'forgot') {
      if (!email.trim()) {
        setFieldErrors({ email: 'Please enter your email address.' });
        return;
      }
      setBusy(true);
      try {
        await api.forgotPassword(email.trim());
        setSuccessNotice('If an account exists for that email, a password reset link has been sent to your inbox.');
      } catch (err) {
        if (err.status === 429) {
          setErrorMsg('Too many requests. Please try again later.');
        } else {
          setSuccessNotice('If an account exists for that email, a password reset link has been sent to your inbox.');
        }
      } finally {
        setBusy(false);
      }
      return;
    }

    // Flow 5: Reset Password
    if (page === 'reset') {
      if (!tokenFromUrl) {
        setErrorMsg('Missing password reset token. Please request a new link from the forgot password page.');
        return;
      }
      if (!password || password.length < 8) {
        setFieldErrors({ password: 'Password must be at least 8 characters long.' });
        return;
      }
      if (password !== confirmPassword) {
        setFieldErrors({ confirmPassword: 'Passwords do not match.' });
        return;
      }

      setBusy(true);
      try {
        await api.resetPassword({
          token: tokenFromUrl,
          new_password: password,
        });
        setSuccessNotice('Your password has been updated. You can now sign in with your new password.');
      } catch (err) {
        if (err.status === 400 || err.status === 404 || err.status === 410) {
          setErrorMsg('This password reset link is invalid or has expired. Please request a new one.');
        } else {
          setErrorMsg(err.message || 'Unable to update password. Please try again.');
        }
      } finally {
        setBusy(false);
      }
      return;
    }
  };

  const [title, subtitle] = TITLES[page] || ['Welcome', ''];

  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[45%_55%]">
      {/* Left Brand Panel */}
      <aside className="hidden min-h-screen flex-col justify-between bg-ink px-12 py-10 text-white lg:flex xl:px-16">
        <Link href="/login" className="flex items-center gap-3 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 font-serif text-lg">
            F
          </span>
          <span className="text-lg font-semibold tracking-wide">forma</span>
        </Link>
        <div className="max-w-lg">
          <div className="mb-7 h-[2px] w-12 bg-[#B8955A]" />
          <h1 className="serif text-[42px] leading-[1.18]">
            From first idea to funded company, and the team that builds it.
          </h1>
          <p className="mt-6 max-w-sm leading-7 text-white/65">
            One considered space for founders, mentors, investors and the talent shaping tomorrow.
          </p>
        </div>
        <p className="text-sm tracking-wide text-stone-400">
          Mentors <span className="px-2 text-[#B8955A]">·</span> Investors <span className="px-2 text-[#B8955A]">·</span>{' '}
          Talent <span className="px-2 text-[#B8955A]">·</span> Startups
        </p>
      </aside>

      {/* Right Form Panel */}
      <section className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
        <div className="animate-enter w-full max-w-[420px]">
          <Link href="/login" className="mb-12 flex items-center gap-2 font-semibold lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-ink/30 font-serif">F</span> forma
          </Link>

          <div className="mb-8">
            <h2 className="serif text-[32px] font-semibold leading-tight">{title}</h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-700">{subtitle}</p>
          </div>

          {/* Success Notice Box */}
          {successNotice ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl border border-[#b5d9c7] bg-white p-5 text-sm leading-6 text-[#286749]"
            >
              <CheckCircle2 className="mb-2" size={20} />
              <p>{successNotice}</p>
              <p className="mt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#0F1B2D] hover:underline"
                >
                  Go to sign in <ArrowRight size={15} />
                </Link>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* OAuth Providers (Presentational on login) */}
              {page === 'login' && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled
                      title="OAuth available in future release"
                      className="h-12 rounded-[10px] border border-stone-200 bg-white text-xs text-stone-500 opacity-60"
                    >
                      G Google
                    </button>
                    <button
                      type="button"
                      disabled
                      title="OAuth available in future release"
                      className="h-12 rounded-[10px] border border-stone-200 bg-white text-xs text-stone-500 opacity-60"
                    >
                      ▦ Microsoft
                    </button>
                    <button
                      type="button"
                      disabled
                      title="OAuth available in future release"
                      className="h-12 rounded-[10px] border border-stone-200 bg-white text-xs text-stone-500 opacity-60"
                    >
                      in LinkedIn
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-stone-700">
                    <span className="h-px flex-1 bg-stone-200" />
                    or sign in with email
                    <span className="h-px flex-1 bg-stone-200" />
                  </div>
                </>
              )}

              {/* Step 2 of Registration: Choose Platform Role */}
              {page === 'role' && (
                <div className="space-y-3">
                  {ROLES.map(({ label, value, desc, icon: Icon }) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setSelectedRole(value)}
                      aria-pressed={selectedRole === value}
                      className={`flex w-full items-center gap-4 rounded-xl border bg-white p-4 text-left transition hover:border-[#B8955A] ${
                        selectedRole === value ? 'border-[#9A7A45] ring-2 ring-[#B8955A]/20' : 'border-stone-200'
                      }`}
                    >
                      <Icon size={20} className="text-[#B8955A]" />
                      <span className="flex-1">
                        <strong className="block text-sm">{label}</strong>
                        <small className="text-stone-700">{desc}</small>
                      </span>
                      <span
                        className={`h-4 w-4 rounded-full border ${
                          selectedRole === value ? 'border-[5px] border-ink' : 'border-stone-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Verify Email page info card */}
              {page === 'verify' && !tokenFromUrl && (
                <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700">
                  <Mail className="mb-2 text-[#B8955A]" size={20} />
                  <p>
                    We sent a verification link to <b>{email || registeredEmail || 'your email'}</b>.
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    Click the link in the message to activate your account. Links expire in 24 hours. Check spam too.
                  </p>
                </div>
              )}

              {/* Email Input Field */}
              {(page === 'login' || page === 'register' || page === 'forgot' || (page === 'verify' && !tokenFromUrl)) && (
                <label className="block text-sm font-medium">
                  Email address
                  <input
                    className="field mt-2"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                  />
                  {fieldErrors.email && <p className="mt-1 text-xs text-[#B42318]">{fieldErrors.email}</p>}
                </label>
              )}

              {/* Password Input for Login */}
              {page === 'login' && (
                <label className="block text-sm font-medium">
                  <span className="flex items-center justify-between">
                    Password
                    <Link className="text-sm font-normal text-[#B8955A] hover:underline" href="/forgot-password">
                      Forgot password?
                    </Link>
                  </span>
                  <span className="relative mt-2 block">
                    <input
                      className="field pr-12"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-3 text-stone-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </span>
                  {fieldErrors.password && <p className="mt-1 text-xs text-[#B42318]">{fieldErrors.password}</p>}
                </label>
              )}

              {/* Password Input for Register & Reset */}
              {(page === 'register' || page === 'reset') && (
                <label className="block text-sm font-medium">
                  {page === 'register' ? 'Password' : 'New password'}
                  <span className="relative mt-2 block">
                    <input
                      className="field pr-12"
                      type={showPassword ? 'text' : 'password'}
                      minLength={8}
                      autoComplete={page === 'register' ? 'new-password' : 'new-password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-3 text-stone-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </span>
                  <small className="mt-1 block font-normal text-stone-700">Use at least 8 characters.</small>
                  {fieldErrors.password && <p className="mt-1 text-xs text-[#B42318]">{fieldErrors.password}</p>}
                </label>
              )}

              {/* Confirm Password for Reset */}
              {page === 'reset' && (
                <label className="block text-sm font-medium">
                  Confirm new password
                  <span className="relative mt-2 block">
                    <input
                      className="field pr-12"
                      type={showConfirmPassword ? 'text' : 'password'}
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-3 text-stone-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </span>
                  {fieldErrors.confirmPassword && (
                    <p className="mt-1 text-xs text-[#B42318]">{fieldErrors.confirmPassword}</p>
                  )}
                </label>
              )}

              {/* General Error Banner */}
              {errorMsg && (
                <div role="alert" className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-xs text-[#B42318]">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p>{errorMsg}</p>
                    {showUnverifiedResend && (
                      <button
                        type="button"
                        onClick={() => handleResendVerification(email)}
                        disabled={resendBusy || resendCooldown > 0}
                        className="mt-2 block font-semibold underline disabled:opacity-50"
                      >
                        {resendCooldown > 0
                          ? `Resend available in ${resendCooldown}s`
                          : resendBusy
                          ? 'Sending...'
                          : 'Resend verification link'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Resend status notice */}
              {resendMessage && (
                <div role="status" className="rounded-lg border border-[#b5d9c7] bg-emerald-50 p-3 text-xs text-[#286749]">
                  {resendMessage}
                </div>
              )}

              {/* Action Button */}
              {page !== 'verify' ? (
                <button
                  type="submit"
                  disabled={busy}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-ink text-base font-semibold text-white transition hover:bg-[#1C2B42] disabled:bg-stone-200 disabled:text-stone-400"
                >
                  {busy ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : page === 'login' ? (
                    'Sign in'
                  ) : page === 'register' ? (
                    'Continue'
                  ) : page === 'role' ? (
                    'Create account'
                  ) : page === 'forgot' ? (
                    'Send reset link'
                  ) : (
                    'Update password'
                  )}
                </button>
              ) : (
                /* Verify page action buttons */
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handleResendVerification(email)}
                    disabled={resendBusy || resendCooldown > 0}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-ink text-sm font-semibold text-white transition hover:bg-[#1C2B42] disabled:bg-stone-200 disabled:text-stone-400"
                  >
                    {resendBusy ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    ) : resendCooldown > 0 ? (
                      `Resend link in ${resendCooldown}s`
                    ) : (
                      'Resend verification email'
                    )}
                  </button>
                  <p className="text-center text-xs text-stone-600">
                    Already verified?{' '}
                    <Link href="/login" className="font-semibold text-ink underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              )}

              {/* Bottom Navigation Links */}
              {page === 'login' && (
                <p className="text-center text-sm text-stone-700">
                  New here?{' '}
                  <Link href="/register" className="font-semibold text-ink hover:underline">
                    Create an account
                  </Link>
                </p>
              )}
              {page === 'register' && (
                <p className="text-center text-sm text-stone-700">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-ink hover:underline">
                    Sign in
                  </Link>
                </p>
              )}
              {page === 'role' && (
                <p className="text-center text-sm text-stone-700">
                  <Link href="/register" className="text-stone-500 hover:text-ink">
                    ← Back to credentials
                  </Link>
                </p>
              )}
              {page === 'forgot' && (
                <p className="text-center text-sm">
                  <Link href="/login" className="font-semibold text-ink hover:underline">
                    Back to sign in
                  </Link>
                </p>
              )}
              {page === 'reset' && (
                <p className="text-center text-sm">
                  <Link href="/login" className="text-stone-500 hover:text-ink">
                    Cancel and go to sign in
                  </Link>
                </p>
              )}

              {page === 'login' && (
                <>
                  <div className="flex items-center justify-center gap-2 text-xs text-stone-700">
                    <LockKeyhole size={14} />
                    Secure sign-in
                  </div>
                  <p className="text-center text-xs leading-5 text-stone-500">
                    By continuing you agree to our{' '}
                    <a href="#terms" className="underline">
                      Terms
                    </a>{' '}
                    and{' '}
                    <a href="#privacy" className="underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </>
              )}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

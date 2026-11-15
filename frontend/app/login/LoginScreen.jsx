'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Eye, EyeOff } from 'lucide-react';
import { FormaSteps, FormaWordmark } from '../forma-brand';
import '../forma.css';

export default function LoginScreen() {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [ssoHint, setSsoHint] = useState('');

  const submit = (event) => {
    event.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setNotice('Your demo workspace is ready.');
    }, 650);
  };

  return (
    <main className="forma forma-login">
      <section className="forma-login-hero">
        <div className="hero-top">
          <Link href="/login" className="hero-brand" aria-label="Forma home">
            <FormaWordmark />
          </Link>
          <p className="hero-kicker">Startup operating workspace</p>
        </div>

        <div className="hero-copy">
          <h1 className="forma-display">
            Form
            <br />
            follows
            <br />
            founder.
          </h1>
          <p className="hero-lede">
            The shared workspace where founders, mentors, investors and talent take a company from first
            sketch to funded team.
          </p>
          <ul className="hero-roles">
            <li>Startups</li>
            <li>Mentors</li>
            <li>Investors</li>
            <li>Talent</li>
          </ul>
        </div>

        <div className="hero-foot">
          <FormaSteps active={3} tone="deep" animated />
        </div>
      </section>

      <section className="forma-login-panel">
        <div className="forma-login-box">
          <header className="login-head">
            <h2 className="forma-display">Welcome back.</h2>
            <p>Sign in to your Forma workspace.</p>
          </header>

          {notice ? (
            <div className="login-success" role="status" aria-live="polite">
              <span className="success-badge">
                <Check size={18} />
              </span>
              <h3>You&rsquo;re in.</h3>
              <p>{notice} Continue to the dashboard to explore the new interface.</p>
              <Link href="/startup/dashboard" className="submit-btn">
                Open dashboard <ArrowRight size={17} />
              </Link>
              <button type="button" className="back-link" onClick={() => setNotice('')}>
                Back to sign in
              </button>
            </div>
          ) : (
            <form className="forma-form" onSubmit={submit}>
              <div className="social-row">
                <button
                  type="button"
                  className="social-btn"
                  onClick={() => setSsoHint('Single sign-on is not connected in this demo. Use your email below.')}
                >
                  Google
                </button>
                <button
                  type="button"
                  className="social-btn"
                  onClick={() => setSsoHint('Single sign-on is not connected in this demo. Use your email below.')}
                >
                  Microsoft
                </button>
                <button
                  type="button"
                  className="social-btn"
                  onClick={() => setSsoHint('Single sign-on is not connected in this demo. Use your email below.')}
                >
                  LinkedIn
                </button>
              </div>
              {ssoHint && (
                <p className="sso-hint" role="status">
                  {ssoHint}
                </p>
              )}

              <div className="or-row">or sign in with email</div>

              <label className="f-label">
                Email address
                <input
                  className="f-input"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                />
              </label>

              <label className="f-label">
                <span className="f-label-head">
                  Password
                  <Link href="/forgot-password" className="forgot">
                    Forgot password?
                  </Link>
                </span>
                <span className="input-wrap">
                  <input
                    className="f-input"
                    type={show ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    aria-label={show ? 'Hide password' : 'Show password'}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </label>

              <label className="check-row">
                <input type="checkbox" defaultChecked /> Keep me signed in
              </label>

              <button className="submit-btn" disabled={busy} type="submit">
                {busy ? (
                  <span className="spinner" aria-label="Signing in" />
                ) : (
                  <>
                    Sign in <ArrowRight size={17} />
                  </>
                )}
              </button>

              <p className="demo-note">Demo build — any email and password opens the workspace.</p>

              <p className="switch-note">
                New to Forma? <Link href="/register">Create an account</Link>
              </p>
            </form>
          )}

          <p className="login-legal">
            By continuing you agree to the <a href="#terms">Terms of service</a> and{' '}
            <a href="#privacy">Privacy policy</a>.
          </p>
        </div>

        <footer className="login-meta">
          <span>&copy; 2026 Forma</span>
          <a href="#privacy">Privacy</a>
          <a href="#help">Help</a>
        </footer>
      </section>
    </main>
  );
}

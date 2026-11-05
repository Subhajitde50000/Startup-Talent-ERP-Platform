'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink, HelpCircle, LifeBuoy, ShieldCheck, Ticket } from 'lucide-react';
import MentorSharedPreviewFrame from '@/components/mentor/MentorSharedPreviewFrame';
import { MentorHelpPage, MentorNotificationsPage, MentorTicketsPage } from '@/components/mentor/MentorSharedPages';
import InvestorSharedPreviewFrame from '@/components/investor/InvestorSharedPreviewFrame';
import { InvestorHelpPage, InvestorNotificationsPage, InvestorTicketsPage } from '@/components/investor/InvestorSharedPages';

type SharedPage = 'notifications' | 'help' | 'tickets';

export default function RoleAwareSharedPreview({ page }: { page: SharedPage }) {
  const [role, setRole] = useState<'checking' | 'investor' | 'mentor' | 'startup'>('checking');

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('role');
    const stored = typeof window !== 'undefined' ? localStorage.getItem('meridian_active_role')?.toLowerCase() : null;
    if (param === 'investor' || stored === 'investor') {
      setRole('investor');
    } else if (param === 'mentor' || stored === 'mentor') {
      setRole('mentor');
    } else if (param === 'startup' || stored === 'startup') {
      setRole('startup');
    } else {
      // Default fallback: if param isn't specified, determine by query or default to startup
      setRole('startup');
    }
  }, []);

  useEffect(() => {
    if (role === 'startup' && page === 'notifications') {
      window.location.replace('/startup/notifications');
    }
  }, [role, page]);

  if (role === 'checking') {
    return <div role="status" style={{ padding: 24, color: '#4a5568' }}>Loading the active role&apos;s shared page…</div>;
  }

  if (role === 'investor') {
    return (
      <InvestorSharedPreviewFrame>
        {page === 'notifications' ? <InvestorNotificationsPage /> : page === 'help' ? <InvestorHelpPage /> : <InvestorTicketsPage />}
      </InvestorSharedPreviewFrame>
    );
  }

  if (role === 'mentor') {
    return (
      <MentorSharedPreviewFrame>
        {page === 'notifications' ? <MentorNotificationsPage /> : page === 'help' ? <MentorHelpPage /> : <MentorTicketsPage />}
      </MentorSharedPreviewFrame>
    );
  }

  // Startup role
  if (page === 'notifications') {
    return (
      <div style={{ padding: 32, maxWidth: 600, margin: '40px auto', textAlign: 'center', fontFamily: 'var(--font-sans, system-ui)' }}>
        <h2>Redirecting to Startup Notifications…</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>
          <Link href="/startup/notifications" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Click here if you are not redirected automatically
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px 20px', fontFamily: 'var(--font-sans, system-ui)' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        <header style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#e0e7ff', color: '#3730a3', borderRadius: 9999, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
              <ShieldCheck size={14} /> Startup Workspace · Help Center
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              {page === 'help' ? 'Founder Help & Knowledge Base' : 'Support Tickets'}
            </h1>
            <p style={{ color: '#475569', margin: '6px 0 0', fontSize: 15 }}>
              Guides, stage exit checklist assistance, and platform resources for founders.
            </p>
          </div>
          <Link
            href="/startup/dashboard"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#0f172a', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </header>

        {page === 'tickets' ? (
          <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 32, textAlign: 'center' }}>
            <Ticket size={36} color="#64748b" style={{ margin: '0 auto 12px' }} />
            <h2 style={{ fontSize: 18, color: '#1e293b', margin: '0 0 8px' }}>No Open Support Tickets</h2>
            <p style={{ color: '#64748b', fontSize: 14, maxWidth: 460, margin: '0 auto 20px' }}>
              Your startup workspace is running normally. If you need assistance with exit criteria or mentor pairing, please browse the guides below.
            </p>
            <Link
              href="/help"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#f1f5f9', color: '#1e293b', borderRadius: 6, fontSize: 14, textDecoration: 'none', fontWeight: 500 }}
            >
              <HelpCircle size={15} /> Browse Help Articles
            </Link>
          </section>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              {
                title: 'Stage Progression & Exit Criteria',
                desc: 'How to mark exit criteria complete and unlock the next stage of your startup journey.',
                href: '/startup/roadmap',
              },
              {
                title: 'Task Management & Milestones',
                desc: 'Organizing sprint work, assigning responsibilities, and tracking deliverable dates.',
                href: '/startup/tasks',
              },
              {
                title: 'Team Permissions & Roles',
                desc: 'Inviting co-founders, granting admin/editor rights, and protecting owner access.',
                href: '/startup/team',
              },
              {
                title: 'Investor Data Room',
                desc: 'Managing pitch decks, cap tables, and controlling visibility for prospective investors.',
                href: '/startup/data-room',
              },
              {
                title: 'Mentorship Collaboration',
                desc: 'Scheduling sessions, requesting deliverable reviews, and getting expert feedback.',
                href: '/startup/mentors',
              },
              {
                title: 'Hiring & Talent Marketplace',
                desc: 'Creating job posts, reviewing candidate applications, and managing interview stages.',
                href: '/startup/hiring',
              },
            ].map((article) => (
              <Link
                key={article.title}
                href={article.href}
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: 20,
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#2563eb', marginBottom: 10 }}>
                    <BookOpen size={18} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Guide</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', margin: '0 0 6px' }}>{article.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{article.desc}</p>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#2563eb', fontSize: 13, fontWeight: 500, marginTop: 16 }}>
                  Open toolkit <ExternalLink size={12} />
                </span>
              </Link>
            ))}
          </div>
        )}

        <footer style={{ marginTop: 32, padding: 20, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LifeBuoy size={20} color="#2563eb" />
            <span style={{ fontSize: 14, color: '#334155' }}>Need personal support or having technical issues?</span>
          </div>
          <Link
            href="/startup/settings"
            style={{ fontSize: 13, color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}
          >
            Review Workspace Settings →
          </Link>
        </footer>
      </div>
    </div>
  );
}

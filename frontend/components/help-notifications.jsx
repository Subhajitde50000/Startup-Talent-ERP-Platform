'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  MoreHorizontal,
  AlertCircle,
  Briefcase,
  Calendar,
  FileText,
  DollarSign,
  Shield,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { JobSeekerShell } from './index';
import { JobBtn } from './jobseeker-ui';

const mockNotifications = [
  {
    id: 'n-1',
    category: 'Interviews',
    title: 'Interview confirmed with Northstar Labs',
    detail: 'Technical design discussion scheduled for Thursday, Nov 6 at 11:00 AM IST.',
    time: '10:00 AM',
    unread: true,
    urgent: true,
    action: 'View link',
  },
  {
    id: 'n-2',
    category: 'Offers',
    title: 'Offer received from Acme Corporation',
    detail: 'Annual CTC ₹24,00,000 + 0.15% ESOP pool grant.',
    time: 'Yesterday',
    unread: true,
    urgent: false,
    action: 'Review',
  },
  {
    id: 'n-3',
    category: 'Applications',
    title: 'Application viewed: Senior Product Designer',
    detail: 'The founder viewed your resume and case studies.',
    time: 'Mon',
    unread: false,
    urgent: false,
    action: 'Track',
  },
];

const mockHelpArticles = [
  { title: 'How does the AI match score work?', excerpt: 'Match score combines skills, work model, and experience from your resume.' },
  { title: 'What is Investment Ready status?', excerpt: 'Startups verified by platform mentors as commercially and financially viable.' },
  { title: 'How to practice voice interviews?', excerpt: 'Using your microphone, answer prompts and get instant rubric feedback.' },
];

export function NotificationsPage({ page = 'notifications' }) {
  const tabs = ['All', 'Unread', 'Jobs', 'Applications', 'Interviews', 'Offers'];
  const [tab, setTab] = useState('All');

  const filtered = mockNotifications.filter((n) => {
    if (tab === 'Unread') return n.unread;
    if (tab !== 'All') return n.category === tab;
    return true;
  });

  return (
    <JobSeekerShell active="Dashboard" page={page}>
      <div className="space-y-6 max-w-4xl pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Platform Notifications
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Real-time updates regarding your applications, interview invites, and offers.
            </p>
          </div>
          <JobBtn secondary small onClick={() => {}}>
            Mark All as Read
          </JobBtn>
        </div>

        <div className="flex gap-2 border-b border-[#E5E1D8] pb-2 overflow-x-auto min-w-0 text-xs">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
                tab === t
                  ? 'bg-[#0F1B2D] text-white'
                  : 'text-[#4A5568] hover:bg-[#FAF8F4]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
                n.urgent
                  ? 'bg-[#FFF8E8] border-[#D4C3A3]'
                  : 'bg-white border-[#E5E1D8]'
              }`}
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-[#0F1B2D]">{n.title}</h3>
                  {n.unread && <span className="h-2 w-2 rounded-full bg-[#B8955A]" />}
                  {n.urgent && (
                    <span className="text-[10px] font-semibold text-[#806236] bg-[#F3EBDD] px-2 py-0.5 rounded-full">
                      Action Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#4A5568]">{n.detail}</p>
                <span className="text-[11px] text-[#A0A7B4] block">{n.time}</span>
              </div>

              <JobBtn secondary small>
                {n.action}
              </JobBtn>
            </div>
          ))}
        </div>
      </div>
    </JobSeekerShell>
  );
}

export function HelpPage({ page = 'help', ticketId }) {
  const [query, setQuery] = useState('');
  const [ticketOpen, setTicketOpen] = useState(false);

  return (
    <JobSeekerShell active="Help" page={page}>
      <div className="space-y-6 max-w-4xl pb-10">
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Help & Support Center
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Frequently asked questions, application guides, and priority scam reporting.
            </p>
          </div>

          <JobBtn primary small onClick={() => setTicketOpen(true)}>
            Open Support Ticket
          </JobBtn>
        </header>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0A7B4]" size={16} />
          <input
            type="text"
            placeholder="Search help articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {mockHelpArticles.map((art, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#E5E1D8] bg-white space-y-1.5 shadow-sm">
              <h3 className="text-xs font-bold text-[#0F1B2D]">{art.title}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">{art.excerpt}</p>
            </div>
          ))}
        </div>

        {ticketOpen && (
          <div className="rounded-xl border border-[#D4C3A3] bg-[#FFF8E8] p-5 space-y-3">
            <h3 className="text-sm font-bold text-[#0F1B2D]">Create Support Ticket</h3>
            <textarea
              rows={3}
              placeholder="Describe your question or issue in detail..."
              className="w-full p-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <JobBtn secondary small onClick={() => setTicketOpen(false)}>
                Cancel
              </JobBtn>
              <JobBtn primary small onClick={() => { alert('Ticket submitted!'); setTicketOpen(false); }}>
                Submit Ticket
              </JobBtn>
            </div>
          </div>
        )}
      </div>
    </JobSeekerShell>
  );
}

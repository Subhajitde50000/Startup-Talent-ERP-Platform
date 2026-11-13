'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
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

const mockHelpArticles = [
  { title: 'How does the AI match score work?', excerpt: 'Match score combines skills, work model, and experience from your resume.' },
  { title: 'What is Investment Ready status?', excerpt: 'Startups verified by platform mentors as commercially and financially viable.' },
  { title: 'How to practice voice interviews?', excerpt: 'Using your microphone, answer prompts and get instant rubric feedback.' },
];

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

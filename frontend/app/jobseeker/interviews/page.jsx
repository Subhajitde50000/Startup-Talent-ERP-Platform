'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  Video,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { interviews } from '../jobseeker-data';

export default function InterviewsPage() {
  const [tab, setTab] = useState('Upcoming');
  const [search, setSearch] = useState('');
  const [confirmedSlots, setConfirmedSlots] = useState({});

  const upcoming = interviews.filter(
    (i) => i.status !== 'Completed' && i.status !== 'Cancelled'
  );
  const needsAction = interviews.filter((i) => i.status === 'Proposed times');
  const past = interviews.filter((i) => i.status === 'Completed');

  const filtered = (tab === 'Upcoming' ? upcoming : tab === 'Needs action' ? needsAction : past).filter(
    (i) => {
      if (search.trim()) {
        const hay = `${i.title} ${i.company}`.toLowerCase();
        if (!hay.includes(search.toLowerCase())) return false;
      }
      return true;
    }
  );

  return (
    <JobSeekerShell active="Interviews">
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Interview Schedule & Preparation
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Confirmed video calls, slot confirmations, and tailored AI interview prep sessions.
            </p>
          </div>

          <Link href="/jobseeker/practice/new">
            <JobBtn primary small className="flex items-center gap-1.5">
              <Sparkles size={14} /> Start AI Practice
            </JobBtn>
          </Link>
        </div>

        {/* Tab Strip */}
        <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto min-w-0 pb-1">
            {['Upcoming', 'Needs action', 'Past'].map((t) => {
              const count =
                t === 'Upcoming' ? upcoming.length : t === 'Needs action' ? needsAction.length : past.length;
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    active
                      ? 'border-[#B8955A] bg-[#F3EBDD] text-[#806236]'
                      : 'border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
                  }`}
                >
                  {t} <span className="opacity-60 font-normal">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A7B4]" size={15} />
            <input
              type="text"
              aria-label="Search interviews"
              placeholder="Search by role or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]/50 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            />
          </div>
        </div>

        {/* List of interviews */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-12 text-center space-y-3">
            <span className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-[#FAF8F4] text-[#A0A7B4]">
              <CalendarDays size={22} />
            </span>
            <h3 className="text-base font-semibold text-[#0F1B2D]">
              No {tab.toLowerCase()} interviews
            </h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              {tab === 'Upcoming'
                ? 'When employers shortlist your profile and propose interview slots, they will appear here.'
                : 'All clear! No pending interview actions required.'}
            </p>
            <Link href="/jobseeker/practice" className="inline-block pt-2">
              <JobBtn secondary small>
                Prepare with AI Practice
              </JobBtn>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-[#0F1B2D]">{item.title}</h2>
                      <span className="rounded-full bg-[#E7F3EC] px-2 py-0.5 text-xs text-[#286749] font-medium">
                        {item.type || 'Video Call'}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280]">
                      with <strong className="text-[#0F1B2D]">{item.company}</strong> · {item.interviewer || 'Founders'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {item.meetingLink && (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 min-h-[34px] px-3.5 rounded-lg bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1C2B42]"
                      >
                        <Video size={13} /> Join Call
                      </a>
                    )}
                    <Link href={`/jobseeker/practice/new?role=${encodeURIComponent(item.title)}`}>
                      <JobBtn secondary small className="flex items-center gap-1.5">
                        <Sparkles size={13} className="text-[#806236]" /> AI Prep Drill
                      </JobBtn>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-[#4A5568] pt-3 border-t border-[#F0EBE0]">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-[#A0A7B4]" /> {item.date || 'Thursday, Nov 6, 2026'}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-[#A0A7B4]" /> {item.time || '11:00 AM IST'} ({item.duration || '45 mins'})
                  </span>
                  <span>·</span>
                  <span className="text-[#9A7A45] font-medium">Google Meet / Platform Video</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </JobSeekerShell>
  );
}

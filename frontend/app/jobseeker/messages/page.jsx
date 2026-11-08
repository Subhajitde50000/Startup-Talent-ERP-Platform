'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Send,
  ChevronLeft,
  Info,
  CheckCircle2,
  Calendar,
  Briefcase,
  Paperclip,
  Shield,
  MoreHorizontal,
  X,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { threads } from '../jobseeker-data';

export default function MessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState(threads[0]?.id || 't1');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [threadList, setThreadList] = useState(threads);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);

  const activeThread = threadList.find((t) => t.id === activeThreadId) || threadList[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: `m-${Date.now()}`,
      sender: defaultUser.name,
      isMe: true,
      text: newMessage.trim(),
      time: 'Just now',
    };

    setThreadList((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              messages: [...(t.messages || []), msg],
              lastMessage: msg.text,
              time: 'Just now',
            }
          : t
      )
    );
    setNewMessage('');
  };

  const handleSelectThread = (id) => {
    setActiveThreadId(id);
    setShowMobileList(false);
  };

  return (
    <JobSeekerShell active="Messages">
      <div className="space-y-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Direct Founder & Recruiter Messages
            </h1>
            <p className="text-xs text-[#6B7280]">
              Real-time messaging with founders, interview coordinators, and talent teams.
            </p>
          </div>
        </div>

        {/* Messaging Container - fixed responsive layout without 1024px blowout */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white shadow-sm overflow-hidden flex flex-col md:flex-row h-[620px] min-w-0">
          {/* Column 1: Conversations List (collapses on mobile when chat open) */}
          <aside
            className={`w-full md:w-[300px] lg:w-[320px] border-r border-[#E5E1D8] flex flex-col bg-[#FAF8F4]/40 shrink-0 min-w-0 ${
              !showMobileList ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Search & Filter header */}
            <div className="p-3.5 border-b border-[#E5E1D8] space-y-2.5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A7B4]" size={14} />
                <input
                  type="text"
                  aria-label="Search conversations"
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-8 pl-8 pr-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto min-w-0 pb-1">
                {['All', 'Interviews', 'Offers'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      filter === f
                        ? 'bg-[#0F1B2D] text-white'
                        : 'bg-white border border-[#E5E1D8] text-[#4A5568]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#F0EBE0]">
              {threadList.map((t) => {
                const isSelected = t.id === activeThread.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => handleSelectThread(t.id)}
                    className={`p-3.5 cursor-pointer transition-colors space-y-1 ${
                      isSelected ? 'bg-white border-l-4 border-l-[#B8955A]' : 'hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs text-[#0F1B2D] truncate block font-semibold">
                        {t.recipient || t.company}
                      </strong>
                      <span className="text-[11px] text-[#A0A7B4] shrink-0">{t.time || '10:45 AM'}</span>
                    </div>
                    <span className="text-[11px] text-[#806236] font-medium block truncate">
                      {t.role || 'Senior Product Designer'}
                    </span>
                    <p className="text-xs text-[#6B7280] truncate leading-normal">
                      {t.lastMessage || 'Looking forward to meeting you on Thursday!'}
                    </p>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Column 2: Chat Thread (Takes remaining width with min-w-0 to prevent overflow) */}
          <main
            className={`flex-1 flex flex-col min-w-0 bg-white ${
              showMobileList ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Thread Header */}
            <div className="p-3.5 border-b border-[#E5E1D8] flex items-center justify-between gap-3 bg-[#FAF8F4]/30 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setShowMobileList(true)}
                  className="md:hidden p-1.5 rounded-lg border border-[#E5E1D8] text-[#0F1B2D]"
                  aria-label="Back to conversations list"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="min-w-0">
                  <h2 className="text-xs md:text-sm font-bold text-[#0F1B2D] truncate">
                    {activeThread.recipient || activeThread.company}
                  </h2>
                  <p className="text-[11px] text-[#6B7280] truncate">
                    {activeThread.role} · Active Now
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDetailsPanel(!showDetailsPanel)}
                  className="text-xs text-[#9A7A45] hover:underline font-semibold"
                >
                  {showDetailsPanel ? 'Hide Details' : 'Details'}
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-w-0">
              {(activeThread.messages || [
                {
                  id: 'm1',
                  sender: activeThread.recipient || activeThread.company,
                  isMe: false,
                  text: 'Hi Aanya, our founders reviewed your design systems portfolio. We would love to chat this Thursday at 11:00 AM IST.',
                  time: '10:30 AM',
                },
                {
                  id: 'm2',
                  sender: defaultUser.name,
                  isMe: true,
                  text: 'Hi! Thank you for reaching out. Thursday at 11:00 AM IST works perfectly for me.',
                  time: '10:42 AM',
                },
                {
                  id: 'm3',
                  sender: activeThread.recipient || activeThread.company,
                  isMe: false,
                  text: 'Fantastic! We sent the calendar invite with Google Meet link.',
                  time: '10:45 AM',
                },
              ]).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.isMe
                        ? 'bg-[#0F1B2D] text-white rounded-br-xs'
                        : 'bg-[#FAF8F4] text-[#0F1B2D] border border-[#E5E1D8] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#A0A7B4] mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Composer Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[#E5E1D8] flex items-center gap-2 bg-[#FAF8F4]/30 min-w-0"
            >
              <input
                type="text"
                aria-label="Type your message"
                placeholder="Type a message to the team..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 h-9 px-3 rounded-xl border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
              />
              <JobBtn primary small type="submit" className="min-h-[36px] px-3.5">
                <Send size={13} />
              </JobBtn>
            </form>
          </main>

          {/* Column 3: Collapsible Details Drawer (hidden by default on tablet / mobile to prevent blowout) */}
          {showDetailsPanel && (
            <aside className="w-full md:w-[260px] border-l border-[#E5E1D8] p-4 bg-[#FAF8F4]/50 text-xs space-y-4 shrink-0 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#0F1B2D]">Conversation Details</span>
                <button
                  type="button"
                  onClick={() => setShowDetailsPanel(false)}
                  className="text-[#A0A7B4] hover:text-[#0F1B2D]"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-2 pt-1 border-t border-[#E5E1D8]">
                <span className="text-[#6B7280] block text-[11px] uppercase tracking-wider font-semibold">
                  Associated Role
                </span>
                <strong className="text-[#0F1B2D] block">{activeThread.role}</strong>
                <Link
                  href="/jobseeker/jobs"
                  className="text-[#9A7A45] hover:underline block"
                >
                  View Job Details →
                </Link>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E5E1D8]">
                <span className="text-[#6B7280] block text-[11px] uppercase tracking-wider font-semibold">
                  Hiring Safety
                </span>
                <p className="text-[#6B7280] leading-relaxed text-[11px]">
                  Official platform discussions are monitored for fraud prevention. Never disclose sensitive financial data.
                </p>
              </div>
            </aside>
          )}
        </div>
      </div>
    </JobSeekerShell>
  );
}

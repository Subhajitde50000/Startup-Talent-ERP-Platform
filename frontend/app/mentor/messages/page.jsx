'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Check,
  Paperclip,
  Plus,
  Send,
  FileText,
  Eye,
  ArrowRight,
  Info,
  X,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialThreads, Btn, Card } from '../mentor-data';

export default function MentorMessagesPage() {
  const [toast, setToast] = useState('');
  const [threads, setThreads] = useState(initialThreads);
  const [active, setActive] = useState('acme');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const [modal, setModal] = useState('');

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2600);
  };

  const thread = threads.find((t) => t.id === active) || threads[0];
  const tabs = ['All', 'Startups', 'Sessions', 'Sign-offs', 'Admin and support', 'Unread', 'Archived'];

  const filtered = threads.filter((t) => {
    const match =
      filter === 'All' ||
      (filter === 'Unread' && t.unread > 0) ||
      (filter === 'Archived' && t.archived) ||
      filter === t.type ||
      (filter === 'Startups' && t.type === 'Startup');
    return (
      match &&
      (!query || `${t.name} ${t.preview}`.toLowerCase().includes(query.toLowerCase()))
    );
  });

  const banner = (
    <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#E7D4B0] bg-[#FFF8E8] p-3 text-xs text-[#806236]">
      <Info size={16} className="mt-0.5 shrink-0" />
      <span>
        <b>Your mentor profile is under review.</b> Messages are limited to admin and support until
        your profile is approved. Other mentor tools remain available.{' '}
        <Link href="/mentor/settings" className="underline font-semibold">
          View application status
        </Link>
      </span>
    </div>
  );

  return (
    <MentorPageShell active="Messages" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Messages
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Messages
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Secure conversations with your startups and the Forma team.
          </p>
        </div>
        <Btn onClick={() => setModal('new')}>
          <Plus size={14} /> New message
        </Btn>
      </div>

      {banner}

      <div className="grid min-h-[640px] overflow-hidden rounded-xl border border-[#E5E1D8] bg-white lg:grid-cols-[290px_minmax(360px,1fr)_270px]">
        {/* Left thread list */}
        <section className="border-b border-[#E5E1D8] lg:border-b-0 lg:border-r">
          <div className="border-b border-[#E5E1D8] p-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-[#A0A7B4]" />
              <input
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations"
                className="h-9 w-full rounded-lg border border-[#E5E1D8] pl-9 text-xs focus:border-[#0F1B2D] focus:outline-none"
              />
            </div>
            <div className="mt-3 flex gap-1 overflow-x-auto pb-1">
              {tabs.map((x) => (
                <button
                  type="button"
                  key={x}
                  onClick={() => setFilter(x)}
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    filter === x
                      ? 'bg-[#0F1B2D] text-white'
                      : 'bg-[#F4F1EA] text-[#4A5568] hover:bg-[#EAE6DE]'
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="max-h-[570px] overflow-y-auto">
            {filtered.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => {
                  setActive(t.id);
                  setThreads(
                    threads.map((a) => (a.id === t.id ? { ...a, unread: 0 } : a))
                  );
                }}
                className={`flex w-full gap-3 border-b border-[#F0EDE7] p-3 text-left transition hover:bg-[#FAF8F4] ${
                  active === t.id ? 'bg-[#F7F4ED]' : ''
                }`}
              >
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F3EBDD] font-serif text-sm font-semibold text-[#806236]">
                  {t.logo}
                  {t.unread > 0 && (
                    <i className="absolute -right-0.5 top-0 h-2.5 w-2.5 rounded-full bg-[#B8955A]" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between gap-1">
                    <b
                      className={`truncate text-xs ${
                        t.unread ? 'font-bold text-[#0F1B2D]' : 'text-[#0F1B2D]'
                      }`}
                    >
                      {t.name}
                    </b>
                    <small className="shrink-0 text-xs text-[#4A5568]">{t.time}</small>
                  </span>
                  <small className="block truncate text-xs text-[#4A5568]">{t.preview}</small>
                  <span className="mt-1 inline-block rounded-full bg-[#F3F4F6] px-1.5 py-0.5 text-[10px] font-medium text-[#4A5568]">
                    {t.type === 'Startup'
                      ? 'Startup'
                      : t.type === 'Admin and support'
                      ? 'Support'
                      : t.type === 'Sign-offs'
                      ? 'Sign-off'
                      : t.type === 'Sessions'
                      ? 'Session'
                      : t.type}
                  </span>
                  <small className="ml-1 text-[11px] text-[#4A5568]">{t.sub}</small>
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-6 text-center text-xs text-[#4A5568]">No conversations found.</div>
            )}
          </div>
        </section>

        {/* Center conversation area */}
        <section className="flex min-h-[570px] flex-col">
          <header className="flex items-center justify-between border-b border-[#E5E1D8] p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F3EBDD] font-serif font-semibold text-[#806236]">
                {thread.logo}
              </span>
              <div>
                <b className="block text-sm text-[#0F1B2D]">{thread.name}</b>
                <small className="text-xs text-[#4A5568]">{thread.sub}</small>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={thread.id === 'acme' ? '/mentor/startups/mentorship-01' : '/mentor/startups'}
                className="rounded-lg border border-[#E5E1D8] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
              >
                Open workspace
              </Link>
              <button
                type="button"
                onClick={() => notify('Session booking opened.')}
                className="hidden rounded-lg bg-[#0F1B2D] px-2.5 py-1.5 text-xs font-semibold text-white sm:block hover:bg-[#1C2B42]"
              >
                Book session
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[#FCFBF9] p-4">
            {thread.messages.map(([who, msg], i) =>
              who === 'system' ? (
                <div
                  key={i}
                  className="mx-auto max-w-sm rounded-full bg-[#F3EBDD] px-3 py-1.5 text-center text-xs text-[#806236]"
                >
                  {msg}
                </div>
              ) : (
                <div key={i} className={`max-w-[82%] ${who === 'me' ? 'ml-auto' : ''}`}>
                  <div
                    className={`rounded-xl p-3 text-xs leading-5 ${
                      who === 'me'
                        ? 'bg-[#0F1B2D] text-white'
                        : 'border border-[#E5E1D8] bg-white text-[#0F1B2D]'
                    }`}
                  >
                    {msg}
                  </div>
                  <div
                    className={`mt-1 flex items-center gap-2 text-[11px] text-[#4A5568] ${
                      who === 'me' ? 'justify-end' : ''
                    }`}
                  >
                    {who === 'me' ? 'You · 9:42 AM' : 'Aarav · 10:42 AM'}
                    {who === 'me' && <Check size={11} />}
                    <button
                      type="button"
                      onClick={() => notify('Saved as a private mentor note.')}
                      className="underline hover:text-[#0F1B2D]"
                    >
                      Save as private note
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="border-t border-[#E5E1D8] p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {[
                'Prep for our next session',
                'Following up on the deliverable',
                'Request a document',
                'Session summary shared',
                'Sign-off request needs changes',
              ].map((x) => (
                <button
                  type="button"
                  key={x}
                  onClick={() => setText(x)}
                  className="rounded-full border border-[#E5E1D8] bg-white px-2 py-1 text-xs text-[#4A5568] hover:bg-[#FAF8F4]"
                >
                  {x}
                </button>
              ))}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={5000}
              rows={2}
              placeholder="Write a secure message… (Press Enter to send)"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!text.trim()) return;
                  const next = [...threads];
                  const i = next.findIndex((t) => t.id === active);
                  next[i] = {
                    ...next[i],
                    preview: text,
                    time: 'Now',
                    messages: [...next[i].messages, ['me', text]],
                  };
                  setThreads(next);
                  setText('');
                  notify('Message sent.');
                }
              }}
              className="w-full resize-none rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-[#0F1B2D] focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-[#4A5568]">
                <button
                  type="button"
                  onClick={() => notify('Attachment picker opened.')}
                  className="hover:text-[#0F1B2D]"
                >
                  <Paperclip className="mr-1 inline" size={13} />
                  Attach
                </button>
                <button
                  type="button"
                  onClick={() => notify('Insert menu: task, deliverable, session or readiness item.')}
                  className="hover:text-[#0F1B2D]"
                >
                  <Plus className="mr-1 inline" size={13} />
                  Insert
                </button>
                <span className="hidden sm:inline">Keep mentorship conversations on the platform.</span>
              </div>
              <Btn
                onClick={() => {
                  if (!text.trim()) return;
                  const next = [...threads];
                  const i = next.findIndex((t) => t.id === active);
                  next[i] = {
                    ...next[i],
                    preview: text,
                    time: 'Now',
                    messages: [...next[i].messages, ['me', text]],
                  };
                  setThreads(next);
                  setText('');
                  notify('Message sent.');
                }}
              >
                <Send size={13} /> Send
              </Btn>
            </div>
            <p className="mt-2 text-xs text-[#4A5568]">
              Startups usually expect a reply within 2 days. Avoid off-platform payment, equity
              promises or investment solicitation.
            </p>
          </div>
        </section>

        {/* Right context pane */}
        <aside className="hidden border-l border-[#E5E1D8] p-4 lg:block space-y-4">
          <Card title="Startup snapshot">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#F3EBDD] font-serif font-semibold text-[#806236]">
                {thread.logo}
              </span>
              <div>
                <b className="text-xs text-[#0F1B2D]">{thread.name}</b>
                <small className="block text-xs text-[#4A5568]">{thread.stage} · Active</small>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs">
                <span className="text-[#4A5568]">Readiness score</span>
                <b className="text-[#0F1B2D]">72 / 100</b>
              </div>
              <div className="mt-1 h-1.5 rounded bg-[#E5E1D8]">
                <div className="h-full w-[72%] rounded bg-[#B8955A]" />
              </div>
            </div>
            <p className="mt-3 text-xs text-[#4A5568]">Sign-offs · 4 of 6</p>
          </Card>

          <Card title="Mentorship">
            <p className="text-xs text-[#0F1B2D]">Active · Fortnightly</p>
            <p className="mt-2 text-xs text-[#4A5568]">Next session · Thu, Nov 12 · 4:00 PM</p>
            <p className="mt-2 text-xs text-[#4A5568]">2 open deliverables · 1 pending sign-off</p>
            <Link
              href="/mentor/startups/mentorship-01"
              className="mt-3 inline-block text-xs font-semibold text-[#9A7A45]"
            >
              Open workspace <ArrowRight className="inline" size={12} />
            </Link>
          </Card>

          <Card title="Shared files">
            <div className="space-y-3">
              {['Customer interviews.pdf', 'Pitch deck v3.pdf', 'Session summary.docx'].map((x) => (
                <button
                  type="button"
                  key={x}
                  onClick={() => notify('Shared file preview opened.')}
                  className="flex w-full items-center gap-2 text-left text-xs text-[#0F1B2D] hover:underline"
                >
                  <FileText size={14} className="text-[#9A7A45]" />
                  <span className="truncate">{x}</span>
                  <Eye size={12} className="ml-auto text-[#4A5568]" />
                </button>
              ))}
            </div>
          </Card>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => notify('Document request sent.')}
              className="rounded-lg border border-[#E5E1D8] bg-white px-2 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
            >
              Request document
            </button>
            <button
              type="button"
              onClick={() => notify('Concern report started.')}
              className="rounded-lg border border-[#E5E1D8] bg-white px-2 py-2 text-xs font-semibold text-[#B42318] hover:bg-[#FEE4E2]"
            >
              Report
            </button>
          </div>
        </aside>
      </div>

      <p className="mt-3 text-xs text-[#4A5568]">
        Prototype inbox · Messages and attachments are not connected to a secure chat service.
      </p>

      {/* New message modal */}
      {modal === 'new' && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">New message</h2>
              <button
                type="button"
                onClick={() => setModal('')}
                aria-label="Close"
                className="text-[#4A5568] hover:text-[#0F1B2D]"
              >
                <X size={18} />
              </button>
            </div>
            <label className="block text-sm font-medium text-[#0F1B2D]">
              Recipient
              <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                <option>Acme Studio (Aarav Kapoor)</option>
                <option>GreenLedger</option>
                <option>Forma Support</option>
              </select>
            </label>
            <label className="mt-3 block text-sm font-medium text-[#0F1B2D]">
              Message
              <textarea
                rows={4}
                placeholder="Write your message…"
                className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
              />
            </label>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModal('')}
                className="min-h-10 px-4 text-sm font-medium text-[#4A5568] hover:text-[#0F1B2D]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  notify('Message sent.');
                  setModal('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                Send message
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}

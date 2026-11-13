'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Plus,
  Send,
  X,
  Search,
  Building2,
  Paperclip,
} from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { threads, InvestorDisclaimer } from '../investor-data';

export default function InvestorMessagesPage() {
  const [activeId, setActiveId] = useState('acme');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState('');

  const activeThread = threads.find((x) => x.id === activeId) || threads[0];
  const filteredThreads = threads.filter(
    (x) =>
      (filter === 'All' ||
        (filter === 'Unread' && x.unread > 0) ||
        x.type === filter) &&
      (!query || `${x.name} ${x.preview}`.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <InvestorShell
      active="Messages"
      module="Deal flow"
      title="Deal conversations"
      description="Secure, audited messaging with founders, co-investors and syndicates."
      actions={
        <Button onClick={() => setModal('new-message')}>
          <Plus size={14} /> New message
        </Button>
      }
    >
      {({ notify }) => (
        <>
          <div className="mb-6 rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#4A5568] border border-[#E5E1D8]">
            Deal communications are encrypted and audited for NDA and regulatory recordkeeping. Never transmit bank wire details over chat.
          </div>

          {/* 3-Column Messaging Layout */}
          <div className="grid min-h-[640px] overflow-hidden rounded-2xl border border-[#E5E1D8] bg-white lg:grid-cols-[280px_minmax(0,1fr)_260px]">
            {/* Left Column: Thread List */}
            <section className="border-r border-[#E5E1D8] flex flex-col">
              <div className="border-b border-[#E5E1D8] p-3 space-y-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="h-9 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                />
                <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                  {['All', 'Startups', 'Offers', 'Team', 'Unread'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setFilter(tab)}
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                        filter === tab
                          ? 'bg-ink text-white'
                          : 'bg-[#F3F4F6] text-[#4A5568] hover:text-ink'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-[#E5E1D8]">
                {filteredThreads.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    className={`flex w-full items-start gap-3 p-3.5 text-left transition ${
                      activeId === t.id
                        ? 'bg-[#F3EBDD]/60'
                        : 'hover:bg-[#FAF8F4]'
                    }`}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F3EBDD] font-bold text-ink text-xs">
                      {t.logo}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <b className="truncate text-xs font-semibold text-ink">{t.name}</b>
                        <span className="text-[10px] text-[#4A5568]">{t.time}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-[#4A5568]">{t.preview}</p>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="rounded bg-[#F3F4F6] px-1.5 py-0.5 text-[10px] text-[#4A5568]">
                          {t.type}
                        </span>
                        {t.unread > 0 && (
                          <span className="h-2 w-2 rounded-full bg-[#B8955A]" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Center Column: Chat Stream */}
            <section className="flex flex-col border-r border-[#E5E1D8]">
              {/* Active Header */}
              <div className="flex items-center justify-between border-b border-[#E5E1D8] px-4 py-3 bg-[#FAF8F4]">
                <div>
                  <b className="text-sm font-semibold text-ink">{activeThread.name}</b>
                  <span className="block text-xs text-[#4A5568]">{activeThread.sub}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/investor/startups/acme"
                    className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                  >
                    Startup profile
                  </Link>
                  <Link
                    href="/investor/startups/acme/diligence"
                    className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                  >
                    Diligence
                  </Link>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4 bg-[#FCFBF9]">
                {activeThread.messages.map(([role, txt], idx) => {
                  if (role === 'system') {
                    return (
                      <div key={idx} className="my-2 flex justify-center">
                        <span className="rounded-full bg-[#F3EBDD] px-3.5 py-1 text-center text-xs font-medium text-[#806236]">
                          {txt}
                        </span>
                      </div>
                    );
                  }

                  const isMe = role === 'me';
                  return (
                    <div
                      key={idx}
                      className={`max-w-[80%] ${isMe ? 'ml-auto' : ''}`}
                    >
                      <div
                        className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
                          isMe
                            ? 'bg-ink text-white rounded-br-sm'
                            : 'border border-[#E5E1D8] bg-white text-ink rounded-bl-sm shadow-sm'
                        }`}
                      >
                        {txt}
                      </div>
                      <span className={`mt-1 block text-[10px] text-[#4A5568] ${isMe ? 'text-right' : ''}`}>
                        {isMe ? 'You · Read' : `${activeThread.name} founder`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Quick Replies & Input */}
              <div className="border-t border-[#E5E1D8] p-3 bg-white space-y-2">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {[
                    'Requesting a data room folder update',
                    'Scheduling a 30-min follow-up call',
                    'Following up on diligence scorecard questions',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMessage(preset)}
                      className="shrink-0 rounded-full border border-[#E5E1D8] bg-[#FAF8F4] px-2.5 py-1 text-[11px] text-[#4A5568] hover:text-ink hover:border-ink transition"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    placeholder="Write a message..."
                    className="w-full rounded-xl border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => notify('Attachment selector opened.')}
                      className="inline-flex items-center gap-1 text-xs text-[#4A5568] hover:text-ink"
                    >
                      <Paperclip size={14} /> Attach document
                    </button>
                    <Button
                      onClick={() => {
                        if (!message.trim()) return;
                        notify('Message sent and recorded.');
                        setMessage('');
                      }}
                    >
                      <Send size={13} /> Send
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column: Deal Details Context */}
            <aside className="hidden p-4 lg:block space-y-4 bg-[#FAF8F4]">
              <Card title="Deal summary">
                <span className="text-xs text-[#4A5568]">Startup</span>
                <b className="mt-0.5 block text-sm font-bold text-ink">{activeThread.name}</b>
                <span className="mt-2 block text-xs text-[#4A5568]">Diligence status</span>
                <b className="mt-0.5 block text-xs font-semibold text-[#806236]">5/8 areas cleared</b>
              </Card>

              <Card title="Quick actions">
                <div className="space-y-2 text-xs">
                  <Link
                    href="/investor/meetings"
                    className="block rounded-lg border border-[#E5E1D8] bg-white p-2.5 font-semibold text-ink hover:bg-[#FAF8F4]"
                  >
                    Schedule call →
                  </Link>
                  <Link
                    href="/investor/data-rooms/acme"
                    className="block rounded-lg border border-[#E5E1D8] bg-white p-2.5 font-semibold text-ink hover:bg-[#FAF8F4]"
                  >
                    Open data room →
                  </Link>
                  <Link
                    href="/investor/offers/offer-104"
                    className="block rounded-lg border border-[#E5E1D8] bg-white p-2.5 font-semibold text-ink hover:bg-[#FAF8F4]"
                  >
                    View term sheet →
                  </Link>
                </div>
              </Card>
            </aside>
          </div>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* New Message Modal */}
          {modal === 'new-message' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Start conversation</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="new-conv-to" className="block text-xs font-medium text-ink">
                      Recipient
                    </label>
                    <select
                      id="new-conv-to"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>Acme Studio (Accepted intro)</option>
                      <option>GreenLedger (Accepted intro)</option>
                      <option>Forma Support</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModal('')}
                    className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={() => {
                      notify('Conversation initialized.');
                      setModal('');
                    }}
                  >
                    Open chat
                  </Button>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </InvestorShell>
  );
}

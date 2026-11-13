'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  FolderLock,
  FileText,
  LockKeyhole,
  X,
  Send,
  Eye,
  Download,
} from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { deals, InvestorDisclaimer } from '../../investor-data';

export default function InvestorDataRoomViewerPage({ params }) {
  const startupId = params?.startupId || 'acme';
  const deal = deals.find((d) => d.id === startupId) || deals[0];

  const [folder, setFolder] = useState('Financials');
  const [doc, setDoc] = useState('Financial model Q3.xlsx');
  const [notes, setNotes] = useState('');
  const [modal, setModal] = useState('');
  const [question, setQuestion] = useState('');

  return (
    <InvestorShell
      active="Data rooms"
      module="Deal flow"
      title={`${deal.name} · Data room`}
      description="View shared documents securely under your signed confidentiality agreement."
      backHref="/investor/data-rooms"
      backLabel="← Back to Data rooms"
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/investor/data-rooms"
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
          >
            ← Data rooms
          </Link>
          <Button secondary onClick={() => {}}>
            Your access log
          </Button>
        </div>
      }
    >
      {({ notify }) => (
        <>
          {/* Security Banner */}
          <div className="mb-6 rounded-lg border border-[#E7D4B0] bg-[#FFF8E8] p-3 text-xs text-[#806236]">
            <LockKeyhole className="mr-2 inline" size={15} />
            Confidential. Subject to your signed NDA. Your name (Arjun Mehta) and IP address are watermarked on every page.
          </div>

          {/* 3-Column Viewer Workspace */}
          <div className="grid min-h-[640px] gap-4 lg:grid-cols-[200px_240px_1fr]">
            {/* Folder Tree */}
            <Card title="Folders">
              <div className="space-y-1">
                {[
                  ['Corporate', 3],
                  ['Financials', 4],
                  ['Legal', 2],
                  ['Product', 5],
                  ['Team', 4],
                  ['Customers', 6],
                  ['Pitch', 2],
                ].map(([f, count]) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFolder(f)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                      folder === f
                        ? 'bg-[#F3EBDD] font-semibold text-ink'
                        : 'text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                    }`}
                  >
                    <span>{f}</span>
                    <span className="text-[11px] text-[#4A5568]">{count}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Document List in Folder */}
            <Card title={folder}>
              <div className="space-y-2">
                {[
                  'Financial model Q3.xlsx',
                  'Runway & burn.pdf',
                  'Revenue summary.pdf',
                ].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDoc(d)}
                    className={`block w-full rounded-lg p-2.5 text-left text-xs transition ${
                      doc === d
                        ? 'bg-[#F3EBDD] font-semibold text-ink'
                        : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={15} className="shrink-0 text-[#806236]" />
                      <span className="truncate">{d}</span>
                    </div>
                    <span className="mt-1 block text-[10px] text-[#4A5568]">
                      Updated Oct 28 · Verified
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => notify('Requested access for additional restricted files.')}
                className="mt-6 text-xs font-semibold text-[#9A7A45] hover:underline"
              >
                🔒 Request additional folders
              </button>
            </Card>

            {/* Document Viewer Frame */}
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-5 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1D8] pb-3">
                  <b className="text-sm font-semibold text-ink">{doc}</b>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => notify('Zoom adjusted.')}
                      className="rounded border border-[#E5E1D8] px-2 py-1 text-xs hover:bg-[#FAF8F4]"
                    >
                      ＋ Zoom
                    </button>
                    <button
                      type="button"
                      onClick={() => notify('Switched to text inspection.')}
                      className="rounded border border-[#E5E1D8] px-2 py-1 text-xs hover:bg-[#FAF8F4]"
                    >
                      Text view
                    </button>
                    <button
                      type="button"
                      onClick={() => notify('Downloads disabled by company security policy.')}
                      title="Direct download disabled"
                      className="rounded border border-[#E5E1D8] px-2 py-1 text-xs text-[#4A5568] hover:bg-[#FAF8F4]"
                    >
                      Download (Locked)
                    </button>
                  </div>
                </div>

                {/* Watermarked Document Preview Canvas */}
                <div className="relative mt-4 grid min-h-[340px] place-items-center rounded-xl bg-[#F4F1EA] p-6 overflow-hidden">
                  <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A5568]">
                      {deal.name} · STRICTLY CONFIDENTIAL
                    </span>
                    <h3 className="serif mt-4 text-2xl font-bold text-ink">
                      Operating Model & 18-Month Runway
                    </h3>
                    <p className="mt-2 text-xs text-[#4A5568]">View-only preview · Page 1 of 12</p>
                    <p className="mt-6 text-xs text-[#4A5568] leading-relaxed">
                      Revenue build-up, customer acquisition costs, and hiring expansion targets for Q4 2026 – Q1 2028.
                    </p>
                  </div>
                  {/* Dynamic security watermark overlay */}
                  <span className="pointer-events-none absolute rotate-[-20deg] text-base font-bold text-ink/10 select-none">
                    Arjun Mehta · 05 Nov 2026 · CONFIDENTIAL
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#4A5568]">
                  <span>Page 1 of 12 · Zoom 100%</span>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-ink">
                    <input type="checkbox" className="accent-ink" />
                    Mark page reviewed
                  </label>
                </div>
              </div>

              {/* Notes and Questions Toolbar */}
              <div className="mt-6 border-t border-[#E5E1D8] pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="doc-notes" className="block text-xs font-medium text-ink">
                      Private document notes
                    </label>
                    <textarea
                      id="doc-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Private notes for your investment team..."
                      className="mt-1 w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col justify-end gap-2">
                    <Button
                      secondary
                      onClick={() => notify('Note linked to diligence checklist.')}
                    >
                      Add note to Diligence checklist
                    </Button>
                    <Button onClick={() => setModal('question')}>
                      Ask founder a question about this page
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Question Modal */}
          {modal === 'question' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Ask diligence question</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-[#4A5568]">
                  Referencing: <b>{doc}</b> (Page 1)
                </p>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  placeholder="Pose a focused question for the founder..."
                  className="mt-3 w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
                />
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModal('')}
                    className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={() => {
                      notify('Question submitted to startup diligence workspace.');
                      setModal('');
                      setQuestion('');
                    }}
                  >
                    Send question
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

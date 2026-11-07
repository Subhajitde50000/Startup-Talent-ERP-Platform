'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  FileText,
  Eye,
  Send,
  X,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialDeliverables, initialReadiness, Btn, Card } from '../mentor-data';

export default function MentorDeliverablesPage() {
  const [toast, setToast] = useState('');
  const [deliveryTab, setDeliveryTab] = useState('Awaiting review');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [reviewNote, setReviewNote] = useState('');
  const [deliverables] = useState(initialDeliverables);

  const notify = (s) => {
    setToast(s);
    setTimeout(() => setToast(''), 2700);
  };

  return (
    <MentorPageShell active="Deliverables" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Sessions & sign-off
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Deliverables review
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Review submitted work across your mentorships.
          </p>
        </div>
        <Btn onClick={() => setSchedule(true)}>
          <Plus size={15} /> Add deliverable
        </Btn>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['Awaiting review', '5'],
          ['Overdue by startup', '2'],
          ['Accepted this month', '11'],
          ['Average review time', '1.8 days'],
        ].map(([a, b]) => (
          <div key={a} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <p className="text-xs text-[#4A5568]">{a}</p>
            <b className="serif mt-1 block text-2xl text-[#0F1B2D]">{b}</b>
          </div>
        ))}
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {['Awaiting review', 'Requested by me', 'Accepted', 'Changes requested', 'All'].map(
          (x) => (
            <button
              type="button"
              key={x}
              onClick={() => setDeliveryTab(x)}
              className={`min-h-10 shrink-0 rounded-lg px-3 text-xs font-medium transition-colors ${
                deliveryTab === x
                  ? 'bg-[#0F1B2D] text-white'
                  : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
              }`}
            >
              {x}
            </button>
          )
        )}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative min-w-[180px] flex-1">
          <Search size={15} className="absolute left-3 top-3 text-[#A0A7B4]" />
          <input
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deliverables or startups"
            className="h-10 w-full rounded-lg border border-[#E5E1D8] bg-white pl-9 text-xs focus:border-[#0F1B2D] focus:outline-none"
          />
        </div>
        <select className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:outline-none">
          <option>All startups</option>
          <option>Acme Studio</option>
          <option>GreenLedger</option>
        </select>
        <select className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:outline-none">
          <option>Oldest waiting</option>
          <option>Due soon</option>
          <option>Startup name</option>
        </select>
      </div>

      {deliveryTab === 'Awaiting review' || deliveryTab === 'All' ? (
        <Card title="Submitted deliverables">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-xs">
              <thead className="border-b border-[#E5E1D8] text-[#4A5568]">
                <tr>
                  {[
                    'Deliverable',
                    'Startup',
                    'Linked goal / item',
                    'Due',
                    'Submitted',
                    'Waiting',
                    'Status',
                    'Owner',
                    '',
                  ].map((x) => (
                    <th key={x} className="py-3 font-medium">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deliverables
                  .filter(
                    (d) =>
                      (deliveryTab === 'All' ||
                        d.status === 'Submitted' ||
                        d.status === 'Resubmitted') &&
                      (!search ||
                        `${d.title} ${d.startup}`.toLowerCase().includes(search.toLowerCase()))
                  )
                  .map((d) => (
                    <tr key={d.id} className="border-b border-[#E5E1D8]">
                      <td className="py-3 font-semibold text-[#0F1B2D]">{d.title}</td>
                      <td className="text-[#0F1B2D]">{d.startup}</td>
                      <td className="text-[#4A5568]">{d.linked}</td>
                      <td className="text-[#4A5568]">{d.due}</td>
                      <td className="text-[#4A5568]">{d.submitted}</td>
                      <td>
                        <span className={d.waiting.includes('4') ? 'text-[#8A5700] font-semibold' : 'text-[#4A5568]'}>
                          {d.waiting}
                        </span>
                      </td>
                      <td>
                        <span className="rounded-full bg-[#FFF3D6] px-2 py-1 text-xs font-medium text-[#8A5700]">
                          {d.status}
                        </span>
                      </td>
                      <td className="text-[#4A5568]">{d.owner}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(d);
                            setDrawer(true);
                          }}
                          className="font-semibold text-[#9A7A45]"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-2">
            <Btn secondary onClick={() => notify('Selected items marked as seen.')}>
              Mark as seen
            </Btn>
            <Btn secondary onClick={() => notify('Reminder sent to startup owner.')}>
              Send reminder
            </Btn>
          </div>
        </Card>
      ) : (
        <Card title={deliveryTab}>
          <p className="py-6 text-center text-sm text-[#4A5568]">
            No deliverables in this view right now.
          </p>
        </Card>
      )}

      {/* Slide-over Review Drawer */}
      {drawer && selected && (
        <div
          className="fixed inset-0 z-40 bg-[#0F1B2D]/35 backdrop-blur-[2px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDrawer(false);
          }}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Review submission"
            className="absolute inset-y-0 right-0 w-full max-w-[640px] overflow-y-auto bg-[#FAF8F4] p-5 shadow-xl sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                  {selected.item || selected.title}
                </h2>
                <p className="mt-1 text-xs text-[#4A5568]">
                  {selected.startup || 'Acme Studio'} · Shared submission
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Close review"
                className="grid h-10 w-10 place-items-center rounded-lg bg-white border border-[#E5E1D8] text-[#4A5568] hover:text-[#0F1B2D]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              <Card title="Submission">
                <p className="text-sm font-semibold text-[#0F1B2D]">
                  {selected.description || selected.title}
                </p>
                <p className="mt-2 text-xs text-[#4A5568]">
                  Expected format: document · Due {selected.due} · Submitted {selected.submitted}
                </p>
                <button
                  type="button"
                  onClick={() => notify(`${selected.evidence || 'Evidence document'} preview opened.`)}
                  className="mt-3 flex w-full items-center gap-2 rounded-lg border border-[#E5E1D8] bg-white p-3 text-xs text-[#0F1B2D]"
                >
                  <FileText size={15} className="text-[#9A7A45]" />
                  {selected.evidence || 'Document-v2.pdf'}
                  <Eye size={14} className="ml-auto text-[#4A5568]" />
                </button>
                <p className="mt-3 text-xs text-[#4A5568]">
                  Startup comment: “Please review this against our current milestone.”
                </p>
              </Card>

              <Card title="Your review">
                <textarea
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  rows={4}
                  placeholder="Optional note for acceptance; required when requesting changes"
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white p-3 text-sm focus:border-[#0F1B2D] focus:outline-none"
                />
                <label className="mt-3 block text-xs font-medium text-[#0F1B2D]">
                  Review rating (optional)
                  <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                    <option>Not rated</option>
                    <option>Does not meet</option>
                    <option>Meets</option>
                    <option>Exceeds</option>
                  </select>
                </label>
                <label className="mt-3 flex items-center gap-2 text-xs text-[#4A5568]">
                  <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                  Also use as evidence for readiness item
                </label>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (reviewNote.length < 20) {
                        notify('Add a note of at least 20 characters when requesting changes.');
                        return;
                      }
                      setDrawer(false);
                      notify('Changes requested; startup notified.');
                    }}
                    className="rounded-lg border border-[#F1C6C1] px-3 py-2 text-xs font-semibold text-[#B42318] hover:bg-[#FEE4E2]"
                  >
                    Request changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawer(false);
                      notify('Deliverable accepted; linked task marked complete.');
                    }}
                    className="rounded-lg bg-[#0F1B2D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                  >
                    Accept deliverable
                  </button>
                </div>
              </Card>

              <Card title="Thread">
                <p className="text-xs text-[#4A5568]">
                  Review comments and questions are shared with the startup.
                </p>
                <div className="mt-3 flex gap-2">
                  <input
                    aria-label="Add a comment…"
                    placeholder="Add a comment…"
                    className="h-10 flex-1 rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-[#0F1B2D] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => notify('Comment sent.')}
                    className="grid h-10 w-10 place-items-center rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42]"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      )}

      {/* Add Deliverable Modal */}
      {schedule && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">Add deliverable</h2>
              <button
                type="button"
                onClick={() => setSchedule(false)}
                aria-label="Close"
                className="text-[#4A5568] hover:text-[#0F1B2D]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Startup
                <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                  <option>Acme Studio</option>
                  <option>GreenLedger</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Title
                <input
                  aria-label="Deliverable title"
                  placeholder="Deliverable title"
                  className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                />
              </label>
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Description
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
                />
              </label>
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Due date
                <input
                  aria-label="Select date"
                  type="date"
                  className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                />
              </label>
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Link readiness item
                <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                  {initialReadiness.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSchedule(false)}
                className="min-h-10 px-4 text-sm font-medium text-[#4A5568] hover:text-[#0F1B2D]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSchedule(false);
                  notify('Deliverable created as a startup task.');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                Create deliverable
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}

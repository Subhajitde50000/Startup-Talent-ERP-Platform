'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import {
  hires,
  timelineEvents,
  nextSteps,
  onboardingItems as initialChecklist,
} from '@/app/employer/employer-data';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  Laptop,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  Upload,
  User,
  X,
} from 'lucide-react';

export default function EmployerHireDetailPage() {
  const params = useParams();
  const hireId = params?.hireId || 'h-1';
  const hire = hires.find((h) => h.id === hireId) || hires[0];

  const [activeTab, setActiveTab] = useState('Overview');
  const [toastMessage, setToastMessage] = useState(null);
  const [checklist, setChecklist] = useState(initialChecklist);

  // Messaging state
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'recruiter',
      text: 'Hi Aanya! Welcome aboard. We are getting your M3 MacBook configured today.',
      time: 'Yesterday at 11:30 AM',
    },
    {
      id: 2,
      from: 'hire',
      text: 'Thank you Priya! Looking forward to starting on Dec 2.',
      time: 'Yesterday at 12:15 PM',
    },
  ]);
  const [newMsg, setNewMsg] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleChecklistItem = (secIdx, itemIdx) => {
    setChecklist((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const current = next[secIdx].items[itemIdx].status;
      next[secIdx].items[itemIdx].status = current === 'Done' ? 'Pending' : 'Done';
      return next;
    });
    showToast('Checklist item updated');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        from: 'recruiter',
        text: newMsg.trim(),
        time: 'Just now',
      },
    ]);
    setNewMsg('');
    showToast('Message dispatched to hire');
  };

  const totalTasks = checklist.reduce((acc, sec) => acc + sec.items.length, 0);
  const doneTasks = checklist.reduce(
    (acc, sec) => acc + sec.items.filter((i) => i.status === 'Done').length,
    0
  );
  const pct = Math.round((doneTasks / totalTasks) * 100);

  const tabs = ['Overview', 'Checklist', 'Documents', 'Checks', 'Messages'];

  return (
    <EmployerShell active="/employer/hires">
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#0F1B2D] px-4 py-3 text-sm text-white shadow-xl flex items-center gap-2 border border-[#B8955A]/30"
        >
          <CheckCircle2 size={16} className="text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#4A5568]">
          <Link
            href="/employer/hires"
            className="inline-flex items-center gap-1 font-medium text-[#806236] hover:underline"
          >
            <ArrowLeft size={14} /> Back to all hires
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">{hire.blind ? 'Candidate' : hire.name}</span>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F3EBDD] font-serif text-xl font-bold text-[#806236] border border-[#B8955A]/30">
                {hire.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D]">
                    {hire.blind ? 'Candidate' : hire.name}
                  </h1>
                  <StageChip stage={hire.status || 'Pre-boarding'} />
                </div>
                <p className="text-xs sm:text-sm text-[#4A5568]">
                  {hire.role} · <span className="text-[#0F1B2D] font-medium">{hire.team}</span>
                </p>
                <p className="text-xs text-[#4A5568]">
                  Hiring Manager: <span className="text-[#0F1B2D] font-medium">{hire.manager}</span> · Starting <span className="text-emerald-700 font-semibold">{hire.startDate}</span> ({hire.startsIn})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <EmployerBtn
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('Messages')}
              >
                <MessageSquare size={14} className="mr-1.5" /> Message Hire
              </EmployerBtn>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex gap-1.5 overflow-x-auto border-t border-[#E5E1D8] pt-4 pb-1">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                    active
                      ? 'bg-[#0F1B2D] text-white shadow-sm'
                      : 'border border-[#E5E1D8] text-[#4A5568] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid gap-6 lg:grid-cols-12 min-w-0">
          <div className="lg:col-span-8 space-y-6 min-w-0">
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                {/* Risk Alert */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3 text-xs text-amber-900">
                  <AlertTriangle size={18} className="shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Action Needed: Documents Pending</p>
                    <p className="mt-0.5">
                      Target joining is in {hire.startsIn}. 2 of 4 pre-boarding verification certificates require candidate signature.
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <EmployerCard title="Pre-boarding Milestone Timeline">
                  <div className="space-y-4">
                    {timelineEvents.map((e, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <CheckCircle2 size={12} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-[#0F1B2D]">{e.step}</p>
                          <p className="text-[#4A5568]">{e.date} · Completed</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </EmployerCard>

                {/* Next Steps */}
                <EmployerCard title="Immediate Pre-start Tasks">
                  <div className="divide-y divide-[#E5E1D8] text-xs">
                    {nextSteps.map((s, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-[#0F1B2D]">{s.title}</p>
                          <p className="text-[#4A5568]">Owner: {s.owner} · Due {s.due}</p>
                        </div>
                        <span className="rounded-full bg-[#FAF8F4] px-2.5 py-0.5 font-medium text-[#806236] border border-[#E5E1D8]">
                          Pending
                        </span>
                      </div>
                    ))}
                  </div>
                </EmployerCard>
              </div>
            )}

            {activeTab === 'Checklist' && (
              <EmployerCard title="Onboarding Checklist">
                <div className="space-y-6">
                  {checklist.map((section, sIdx) => (
                    <div key={section.section} className="space-y-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F1B2D]">
                        {section.section}
                      </h4>
                      <div className="space-y-2">
                        {section.items.map((item, iIdx) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-3 rounded-xl border border-[#E5E1D8] bg-white p-3 text-xs transition hover:border-[#B8955A]"
                          >
                            <input
                              type="checkbox"
                              checked={item.status === 'Done'}
                              onChange={() => handleToggleChecklistItem(sIdx, iIdx)}
                              className="mt-0.5 rounded border-[#E5E1D8] text-[#806236] focus:ring-[#B8955A]"
                            />
                            <div className="flex-1">
                              <p className={`font-semibold ${item.status === 'Done' ? 'line-through text-[#4A5568]' : 'text-[#0F1B2D]'}`}>
                                {item.title}
                              </p>
                              <p className="text-[#4A5568] mt-0.5">
                                Responsible: {item.owner} · Due: {item.due} {item.note && `· ${item.note}`}
                              </p>
                            </div>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                item.status === 'Done'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Documents' && (
              <EmployerCard title="Pre-boarding Documentation">
                <div className="divide-y divide-[#E5E1D8] text-xs">
                  {[
                    { name: 'Signed Employment Agreement.pdf', status: 'Verified', date: 'Oct 30' },
                    { name: 'Government ID & Proof of Address', status: 'Verified', date: 'Oct 31' },
                    { name: 'PF & Tax Declaration Form 11', status: 'Pending Upload', date: 'Due in 3 days' },
                    { name: 'Signed Platform Code of Conduct', status: 'Verified', date: 'Nov 01' },
                  ].map((doc, idx) => (
                    <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <FileText size={18} className="text-[#806236]" />
                        <div>
                          <p className="font-semibold text-[#0F1B2D]">{doc.name}</p>
                          <p className="text-[#4A5568]">{doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-medium ${
                            doc.status === 'Verified'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {doc.status}
                        </span>
                        {doc.status === 'Verified' && (
                          <button
                            type="button"
                            onClick={() => showToast('Document downloaded')}
                            className="text-[#806236] hover:underline p-1"
                            aria-label={`Download ${doc.name}`}
                          >
                            <Download size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Checks' && (
              <EmployerCard title="Background & Identity Clearance">
                <div className="space-y-3 text-xs">
                  {[
                    { title: 'Identity & National ID Match', status: 'Cleared', date: 'Oct 30' },
                    { title: 'Past Employment Verification (PixelForge)', status: 'Cleared', date: 'Nov 01' },
                    { title: 'Education Degree Authentication', status: 'Cleared', date: 'Nov 02' },
                    { title: 'Criminal Background Check', status: 'In Review', date: 'Expected Nov 05' },
                  ].map((chk, idx) => (
                    <div key={idx} className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck size={16} className={chk.status === 'Cleared' ? 'text-emerald-600' : 'text-amber-600'} />
                        <div>
                          <p className="font-semibold text-[#0F1B2D]">{chk.title}</p>
                          <p className="text-[#4A5568]">{chk.date}</p>
                        </div>
                      </div>
                      <span className="font-medium text-[#0F1B2D]">{chk.status}</span>
                    </div>
                  ))}
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Messages' && (
              <EmployerCard title="Pre-start Conversation Thread">
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 min-h-[220px] max-h-[320px] overflow-y-auto space-y-3">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.from === 'recruiter' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3 text-xs ${
                            m.from === 'recruiter'
                              ? 'bg-[#0F1B2D] text-white'
                              : 'bg-white border border-[#E5E1D8] text-[#0F1B2D]'
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="text-[10px] text-[#4A5568] mt-1 px-1">{m.time}</span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value)}
                      placeholder="Type a greeting or instructions..."
                      className="flex-1 rounded-xl border border-[#E5E1D8] px-3.5 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                    <EmployerBtn type="submit" variant="primary" size="sm">
                      <Send size={14} className="mr-1" /> Send
                    </EmployerBtn>
                  </form>
                </div>
              </EmployerCard>
            )}
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            <EmployerCard title="Pre-boarding Summary">
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#4A5568]">Overall Progress:</span>
                    <span className="font-bold text-[#806236]">{pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#E5E1D8] overflow-hidden">
                    <div className="h-full rounded-full bg-[#B8955A]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Target Start:</span>
                  <span className="font-semibold text-emerald-700">{hire.startDate}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">IT Laptop Status:</span>
                  <span className="font-semibold text-[#0F1B2D]">Dispatched via Courier</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Associated Offer:</span>
                  <Link href="/employer/offers" className="text-[#806236] underline font-medium">
                    View v2 Offer
                  </Link>
                </div>
              </div>
            </EmployerCard>

            <SafetyStrip />
          </div>
        </div>
      </div>
    </EmployerShell>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MessageCircle,
  Clock,
  User,
  Send,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Tag,
  Paperclip,
  ExternalLink,
  Shield,
  LifeBuoy,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  toast,
} from '@/components/admin-ui';
import { tickets } from '../support-data';

export default function TicketDetailPage({ params }) {
  const router = useRouter();
  const ticketId = params?.ticketId || 'TCK-2026-048210';

  // Dynamic ticket lookup from support data
  const ticket = useMemo(() => {
    const found = tickets.find((t) => t.id === ticketId);
    if (found) return found;
    return {
      id: ticketId,
      subject: 'Inbound Customer Operations Ticket',
      requester: { displayName: 'Varun Anand', role: 'job-seeker', verified: true },
      categoryLabel: 'Payments & Billing',
      priority: 'high',
      status: 'open',
      sla: { state: 'on_track' },
      firstMessage: 'I made a payment via UPI for the AI Interview Pro Practice pack, but the credits are not reflecting in my candidate dashboard. Please help!',
      assignedTo: 'Alex Kumar',
    };
  }, [ticketId]);

  const [replyText, setReplyText] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [ticketStatus, setTicketStatus] = useState(
    ticket.status === 'resolved' ? 'Resolved' : 'In Progress'
  );

  const [thread, setThread] = useState([
    {
      sender: `${ticket.requester.displayName} (${ticket.requester.role})`,
      role: ticket.requester.role,
      timestamp: 'Today at 10:14 IST',
      text: ticket.firstMessage,
      isStaff: false,
    },
    {
      sender: 'Alex Kumar (Support Operations)',
      role: 'Platform Staff',
      timestamp: 'Today at 10:28 IST',
      text: `Hello ${ticket.requester.displayName}, thank you for reaching out. We have opened ticket ${ticketId} and investigated the transaction status with our payment provider. Re-syncing credits now.`,
      isStaff: true,
    },
  ]);

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setThread((prev) => [
      ...prev,
      {
        sender: 'Alex Kumar (Support Operations)',
        role: 'Platform Staff',
        timestamp: 'Just now',
        text: replyText,
        isStaff: true,
      },
    ]);
    setReplyText('');
    toast(`Reply dispatched to ${ticket.requester.displayName}`);
  };

  const handleResolveTicket = () => {
    setTicketStatus('Resolved');
    toast(`Ticket ${ticketId} marked as Resolved`);
  };

  return (
    <AdminShell active="Support">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#718096] mb-4">
        <Link href="/admin/support" className="hover:text-[#0F1B2D] transition flex items-center gap-1">
          <ArrowLeft size={13} />
          <span>Support Desk Queue</span>
        </Link>
        <span>/</span>
        <span className="font-mono text-[#0F1B2D] font-medium">{ticketId}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-start gap-3">
          <Link
            href="/admin/support"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition shrink-0 mt-1"
            title="Back to Support Desk"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#B8955A]">{ticketId}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                ticketStatus === 'Resolved'
                  ? 'bg-[#E7F3EC] text-[#286749]'
                  : 'bg-[#FDF3E0] text-[#9A6210]'
              }`}>
                {ticketStatus}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 capitalize">
                {ticket.categoryLabel}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              {ticket.subject}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {ticketStatus !== 'Resolved' && (
            <Btn icon={CheckCircle2} onClick={handleResolveTicket}>
              Resolve Ticket
            </Btn>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Conversation Thread (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card title="Customer Conversation Thread" titleIcon={MessageCircle}>
            <div className="space-y-4">
              {thread.map((msg, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    msg.isStaff
                      ? 'border-[#B8955A]/30 bg-[#FAF8F4] ml-4 sm:ml-8'
                      : 'border-[#E5E1D8] bg-white mr-4 sm:mr-8'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F1B2D]">{msg.sender}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white border border-[#E5E1D8] text-[#4A5568] capitalize">
                        {msg.role}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A0A7B4]">{msg.timestamp}</span>
                  </div>
                  <p className="text-[#0F1B2D]">{msg.text}</p>
                </div>
              ))}

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="pt-4 border-t border-[#E5E1D8] space-y-3">
                <label htmlFor="ticket-reply" className="block text-xs font-semibold text-[#0F1B2D]">
                  Send Public Staff Response
                </label>
                <textarea
                  id="ticket-reply"
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Type official response to ${ticket.requester.displayName}...`}
                  className="w-full p-3 rounded-xl border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setReplyText('We have credited your AI Mock Interview Pack. Please refresh your dashboard.')}
                      className="text-[11px] text-[#4A5568] hover:text-[#0F1B2D] bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-1 rounded"
                    >
                      + Macro: Credits Added
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyText('Thank you for your patience. Your verification documents have been forwarded to the review team.')}
                      className="text-[11px] text-[#4A5568] hover:text-[#0F1B2D] bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-1 rounded"
                    >
                      + Macro: Under Review
                    </button>
                  </div>
                  <Btn type="submit" icon={Send}>
                    Send Reply
                  </Btn>
                </div>
              </form>
            </div>
          </Card>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-4 text-xs">
          <Card title="Requester & Ticket Context" titleIcon={User}>
            <div className="space-y-2.5">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Requester</span>
                <span className="font-semibold text-[#0F1B2D]">{ticket.requester.displayName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Role / Type</span>
                <span className="font-medium text-[#0F1B2D] capitalize">{ticket.requester.role}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Category</span>
                <span className="font-medium text-[#0F1B2D]">{ticket.categoryLabel}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Priority</span>
                <StatChip status={ticket.priority === 'urgent' ? 'critical' : 'medium'} />
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Assigned Specialist</span>
                <span className="font-medium text-[#0F1B2D]">{ticket.assignedTo || 'Unassigned'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#4A5568]">SLA Target</span>
                <span className="font-bold text-[#286749]">
                  {ticket.sla?.state ? ticket.sla.state.replace(/_/g, ' ') : 'On Track'}
                </span>
              </div>
            </div>
          </Card>

          <Card title="Internal Staff Note" titleIcon={Tag}>
            <div className="space-y-2">
              <textarea
                rows={3}
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Internal notes visible only to operations staff..."
                className="w-full p-2.5 rounded-xl border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
              />
              <Btn small secondary onClick={() => toast('Internal staff note saved')}>
                Save Note
              </Btn>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}

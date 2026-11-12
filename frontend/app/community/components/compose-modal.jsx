'use client';

import React, { useState, useMemo } from 'react';
import { X, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { analyzePostCompliance } from '../community-data';

export default function ComposeModal({
  activePersona,
  spaces,
  initialPostType = 'Question',
  onClose,
  onSubmit,
}) {
  const [selectedSpaceId, setSelectedSpaceId] = useState(spaces[0]?.id || 'ask-community');
  const [postType, setPostType] = useState(initialPostType);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  // Contextual placeholders based on post type
  const placeholders = {
    Question: {
      title: 'e.g. How should a B2B SaaS startup in India structure GST export invoices for Stripe payments?',
      content: 'Provide specific background context, what you have already attempted (e.g. LUT RFD-11 filing), and exact questions...',
      tagHint: 'GST, SaaS, ExportOfServices, Taxes',
    },
    Milestone: {
      title: 'e.g. Milestone: Crossed 20 B2B enterprise manufacturing pilots across Gujarat & Pune!',
      content: 'Share key traction numbers, timeline, telemetry volume, and 2-3 practical lessons for other founders...',
      tagHint: 'Milestone, B2B, Manufacturing, Traction, Seed',
    },
    'Looking for': {
      title: 'e.g. Looking for: Founding Backend / Distributed Systems Engineer (Equity + Competitive INR)',
      content: 'Describe your company stage, tech stack (Next.js, Node, Redis), expected problem spaces, and compensation structure...',
      tagHint: 'Hiring, CoFounder, Engineering, Backend, Equity',
    },
    Resource: {
      title: 'e.g. Playbook: DPIIT Angel Tax Exemption & Form 2 Filing Guide for Seed Startups',
      content: 'Detail the step-by-step statutory steps, required CA certification checklist, and common scrutiny pitfalls...',
      tagHint: 'Playbook, DPIIT, Compliance, AngelTax, Legal',
    },
    Poll: {
      title: 'e.g. Poll: Which payment gateway provides the most reliable webhook uptime & recurring UPI autopay in India?',
      content: 'Outline the tradeoffs your team is evaluating and ask the community for operational uptime feedback below...',
      tagHint: 'Fintech, PaymentGateways, Razorpay, Cashfree',
    },
    Discussion: {
      title: 'e.g. Server Components vs Client WebSockets for Real-Time B2B Workspaces: 60-Day Benchmarks',
      content: 'Present your architecture trade-offs, before/after latency measurements, and open questions for discussion...',
      tagHint: 'Architecture, NextJS, Performance, Distributed',
    },
  };

  const currentPlaceholder = placeholders[postType] || placeholders.Question;

  // Real-time compliance issues
  const complianceIssues = useMemo(() => {
    return analyzePostCompliance(title, content);
  }, [title, content]);

  const hasCriticalIssue = complianceIssues.some((i) => i.type === 'critical');

  const handleAddPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handleRemovePollOption = (idx) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== idx));
    }
  };

  const handlePollOptionChange = (idx, value) => {
    const updated = [...pollOptions];
    updated[idx] = value;
    setPollOptions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    if (hasCriticalIssue) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    let pollData = null;
    if (postType === 'Poll') {
      const validOptions = pollOptions.filter((o) => o.trim().length > 0);
      if (validOptions.length >= 2) {
        pollData = {
          question: title,
          totalVotes: 0,
          userVotedOptionId: null,
          options: validOptions.map((opt, idx) => ({
            id: `opt_${idx + 1}`,
            text: opt,
            votes: 0,
          })),
        };
      }
    }

    onSubmit({
      spaceId: selectedSpaceId,
      type: postType,
      title,
      content,
      tags,
      pollData,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F1B2D] text-xs font-bold text-white">
              {activePersona.avatar}
            </span>
            <div>
              <p className="text-xs font-bold text-[#0F1B2D]">Posting as {activePersona.name}</p>
              <p className="text-[10px] text-[#5A6E85]">{activePersona.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#7B8CA3] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Space & Type Selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                Select Space
              </label>
              <select
                value={selectedSpaceId}
                onChange={(e) => setSelectedSpaceId(e.target.value)}
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs font-medium text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
              >
                {spaces.map((s) => (
                  <option key={s.id} value={s.id}>
                    #{s.name} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                Post Type
              </label>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs font-medium text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
              >
                <option value="Question">Question (Q&A format)</option>
                <option value="Discussion">Discussion</option>
                <option value="Resource">Resource / Playbook</option>
                <option value="Milestone">Milestone / Win</option>
                <option value="Looking for">Looking for (Talent/Co-founder)</option>
                <option value="Poll">Interactive Poll</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
              Title / Core Question
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={currentPlaceholder.title}
              className="w-full rounded-lg border border-[#E5E1D8] px-3.5 py-2 text-xs font-medium text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:outline-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
              Details & Context
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={currentPlaceholder.content}
              className="w-full rounded-lg border border-[#E5E1D8] px-3.5 py-2.5 text-xs text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:outline-none"
            />
          </div>

          {/* Interactive Poll Builder (If Poll selected) */}
          {postType === 'Poll' && (
            <div className="space-y-2 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-3.5 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#0F1B2D]">Poll Voting Options (2 to 6 options)</span>
                {pollOptions.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddPollOption}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#B8955A] hover:underline"
                  >
                    <Plus size={12} /> Add option
                  </button>
                )}
              </div>
              {pollOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => handlePollOptionChange(i, e.target.value)}
                    className="flex-1 rounded border border-[#E5E1D8] bg-white px-2.5 py-1.5 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                  />
                  {pollOptions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePollOption(i)}
                      className="text-[#7B8CA3] hover:text-red-600 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder={currentPlaceholder.tagHint}
              className="w-full rounded-lg border border-[#E5E1D8] px-3 py-1.5 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
            />
          </div>

          {/* Real-Time Compliance Alerts */}
          {complianceIssues.length > 0 && (
            <div className="space-y-2 rounded-xl border border-amber-300 bg-amber-50/70 p-3.5 text-xs text-amber-900">
              {complianceIssues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <AlertTriangle
                    size={16}
                    className={`shrink-0 mt-0.5 ${
                      issue.type === 'critical' ? 'text-red-600' : 'text-amber-600'
                    }`}
                  />
                  <div>
                    <p className="font-bold">{issue.title}</p>
                    <p className="text-[11px] leading-snug">{issue.message}</p>
                    <p className="mt-0.5 text-[10px] italic text-[#5A6E85]">
                      Guidance: {issue.guidance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-[#F2EFE9] pt-4">
            <span className="text-[11px] text-[#7B8CA3]">
              All posts are subject to community trust standards.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[#E5E1D8] px-4 py-2 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={hasCriticalIssue || !title.trim() || !content.trim()}
                className="rounded-lg bg-[#0F1B2D] px-5 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] disabled:opacity-40 transition"
              >
                Publish Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

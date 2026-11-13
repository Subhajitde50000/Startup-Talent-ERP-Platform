'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  AlertTriangle,
  Plus,
  Trash2,
  HelpCircle,
  MessageSquare,
  Vote,
  Sparkles,
  UserPlus,
  BookOpen,
} from 'lucide-react';
import { analyzePostCompliance } from '../community-data';

const POST_TYPES = [
  { id: 'Question', label: 'Question', icon: HelpCircle, color: 'text-amber-600' },
  { id: 'Discussion', label: 'Discussion', icon: MessageSquare, color: 'text-indigo-600' },
  { id: 'Poll', label: 'Poll', icon: Vote, color: 'text-rose-600' },
  { id: 'Milestone', label: 'Milestone', icon: Sparkles, color: 'text-purple-600' },
  { id: 'Looking for', label: 'Looking For', icon: UserPlus, color: 'text-blue-600' },
  { id: 'Resource', label: 'Resource', icon: BookOpen, color: 'text-emerald-600' },
];

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
      title: 'What is your core question or roadblock?',
      content: 'Provide context, what you have already tried, and exact details...',
      tagHint: 'e.g. GST, SaaS, Export, Stripe',
    },
    Discussion: {
      title: 'Topic or idea for discussion...',
      content: 'Share your perspective, trade-offs, benchmarks, or thesis...',
      tagHint: 'e.g. NextJS, Architecture, Scaling',
    },
    Poll: {
      title: 'What question do you want to ask the community?',
      content: 'Briefly explain the options and the decision context...',
      tagHint: 'e.g. Fintech, Tools, Benchmarks',
    },
    Milestone: {
      title: 'What milestone or traction did your team achieve?',
      content: 'Share key metrics, timeline, and 2-3 lessons for other founders...',
      tagHint: 'e.g. Milestone, Traction, Growth, Pilots',
    },
    'Looking for': {
      title: 'Who or what are you looking for?',
      content: 'Describe the role, tech stack, equity/compensation, and problem space...',
      tagHint: 'e.g. Hiring, CoFounder, FullStack',
    },
    Resource: {
      title: 'Title of playbook, guide, or framework...',
      content: 'Provide the step-by-step summary, checklist, or guide...',
      tagHint: 'e.g. Playbook, Compliance, DPIIT, Legal',
    },
  };

  const currentPlaceholder = placeholders[postType] || placeholders.Question;

  // Real-time compliance check
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-xl rounded-2xl border border-[#E5E1D8] bg-white p-5 sm:p-6 shadow-2xl">
        {/* Header: Persona info + Close button */}
        <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F1B2D] text-xs font-bold text-white">
              {activePersona.avatar}
            </div>
            <div>
              <p className="text-xs font-bold text-[#0F1B2D]">{activePersona.name}</p>
              <p className="text-[10px] text-[#5A6E85]">{activePersona.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#7B8CA3] hover:bg-[#FAF8F4] hover:text-[#0F1B2D] transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Post Type Selector (Clean Pill Toggles) */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1.5">
              Select Format
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POST_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = postType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPostType(type.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                      isSelected
                        ? 'bg-[#0F1B2D] text-white shadow-xs'
                        : 'border border-[#E5E1D8] bg-[#FAF8F4] text-[#5A6E85] hover:bg-white hover:text-[#0F1B2D]'
                    }`}
                  >
                    <Icon size={13} className={isSelected ? 'text-[#B8955A]' : type.color} />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Space */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1.5">
              Post In Space
            </label>
            <select
              value={selectedSpaceId}
              onChange={(e) => setSelectedSpaceId(e.target.value)}
              className="w-full rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] px-3 py-2 text-xs font-medium text-[#0F1B2D] focus:border-[#0F1B2D] focus:bg-white focus:outline-none transition"
            >
              {spaces.map((s) => (
                <option key={s.id} value={s.id}>
                  #{s.name} ({s.category})
                </option>
              ))}
            </select>
          </div>

          {/* Title Input */}
          <div>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={currentPlaceholder.title}
              className="w-full rounded-lg border border-[#E5E1D8] px-3.5 py-2.5 text-xs font-semibold text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:outline-none transition"
            />
          </div>

          {/* Content Textarea */}
          <div>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={currentPlaceholder.content}
              className="w-full rounded-lg border border-[#E5E1D8] px-3.5 py-2.5 text-xs text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:outline-none transition leading-relaxed"
            />
          </div>

          {/* Interactive Poll Builder (If Poll selected) */}
          {postType === 'Poll' && (
            <div className="space-y-2 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[#0F1B2D]">Poll Options (2 to 6)</span>
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
                    className="flex-1 rounded-md border border-[#E5E1D8] bg-white px-2.5 py-1.5 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                  />
                  {pollOptions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePollOption(i)}
                      className="text-[#7B8CA3] hover:text-red-600 p-1 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tags Input */}
          <div>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder={`Tags (comma separated): ${currentPlaceholder.tagHint}`}
              className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3.5 py-2 text-xs text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:outline-none transition"
            />
          </div>

          {/* Subtle Compliance Warning if issue detected */}
          {complianceIssues.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-900">
              {complianceIssues.map((issue, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <AlertTriangle
                    size={14}
                    className={`shrink-0 ${
                      issue.type === 'critical' ? 'text-red-600' : 'text-amber-600'
                    }`}
                  />
                  <p className="text-[11px] leading-tight">
                    <strong className="font-semibold">{issue.title}:</strong> {issue.guidance}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-[#F2EFE9] pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#E5E1D8] px-3.5 py-2 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={hasCriticalIssue || !title.trim() || !content.trim()}
              className="rounded-lg bg-[#0F1B2D] px-5 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] disabled:opacity-40 transition shadow-sm"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  ThumbsUp,
  Bookmark,
  Share2,
  Flag,
  UserPlus,
  Send,
  MessageCircle,
  HelpCircle,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import CommunityHeader from '../../community-header';
import {
  COMMUNITY_PERSONAS,
  INITIAL_POSTS,
} from '../../community-data';

export default function SinglePostThreadPage() {
  const params = useParams();
  const postId = params?.postId || 'post_gst_billing';

  const [activePersona, setActivePersona] = useState(COMMUNITY_PERSONAS[0]);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Modals
  const [connectModalData, setConnectModalData] = useState(null);
  const [connectMessage, setConnectMessage] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const post = posts.find((p) => p.id === postId) || posts[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2700);
  };

  // Upvote post
  const handleToggleHelpfulPost = () => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === post.id) {
          const isHelpful = !p.isHelpfulByMe;
          return {
            ...p,
            isHelpfulByMe: isHelpful,
            helpfulCount: isHelpful ? p.helpfulCount + 1 : p.helpfulCount - 1,
          };
        }
        return p;
      })
    );
  };

  // Upvote answer
  const handleToggleHelpfulAnswer = (ansId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === post.id) {
          const updatedAnswers = (p.answers || []).map((ans) => {
            if (ans.id === ansId) {
              const isUpvoted = ans.isUpvotedByMe;
              return {
                ...ans,
                isUpvotedByMe: !isUpvoted,
                helpfulCount: isUpvoted ? ans.helpfulCount - 1 : ans.helpfulCount + 1,
              };
            }
            return ans;
          });
          return { ...p, answers: updatedAnswers };
        }
        return p;
      })
    );
  };

  // Mark/unmark accepted answer
  const handleToggleAcceptAnswer = (ansId) => {
    if (post.author.id !== activePersona.id) {
      showToast('Only the question author can accept an answer.');
      return;
    }

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === post.id) {
          const updatedAnswers = (p.answers || []).map((ans) => ({
            ...ans,
            isAccepted: ans.id === ansId ? !ans.isAccepted : false,
          }));
          const isNowAccepted = updatedAnswers.some((ans) => ans.isAccepted);
          showToast(isNowAccepted ? 'Marked as Accepted Answer' : 'Removed accepted answer mark');
          return {
            ...p,
            hasAcceptedAnswer: isNowAccepted,
            acceptedAnswerId: isNowAccepted ? ansId : null,
            answers: updatedAnswers,
          };
        }
        return p;
      })
    );
  };

  // Submit Answer
  const handleAddAnswer = (e) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;

    const newAns = {
      id: `ans_${Date.now()}`,
      author: {
        id: activePersona.id,
        name: activePersona.name,
        handle: activePersona.handle,
        role: activePersona.role,
        roleKey: activePersona.roleKey,
        organization: activePersona.organization,
        verified: activePersona.verified,
        expertLabel: activePersona.roleKey === 'mentor' ? 'Expert Answer • Verified Mentor' : null,
      },
      body: newAnswerText.trim(),
      createdAt: 'Just now',
      helpfulCount: 0,
      isAccepted: false,
      replies: [],
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === post.id) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            answers: [...(p.answers || []), newAns],
          };
        }
        return p;
      })
    );

    setNewAnswerText('');
    showToast('Your answer has been published!');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#0F1B2D] text-[#FAF8F4] px-4 py-3 text-xs font-semibold shadow-2xl border border-[#B8955A] flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[#B8955A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <CommunityHeader
        activePersona={activePersona}
        onSelectPersona={setActivePersona}
      />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-5">
          <div className="flex items-center gap-2">
            <Link href="/community" className="hover:text-[#0F1B2D]">Community</Link>
            <span>/</span>
            <Link href={`/community/spaces/${post.spaceSlug}`} className="hover:text-[#0F1B2D]">
              #{post.spaceName}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#0F1B2D] truncate max-w-[200px]">Thread</span>
          </div>

          <Link
            href="/community"
            className="inline-flex items-center gap-1 font-semibold text-[#0F1B2D] hover:text-[#B8955A]"
          >
            <ArrowLeft size={13} />
            <span>Back to Feed</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Thread Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Question / Main Post Card */}
            <article className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs space-y-4">
              {/* Post Meta */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E5E1D8]">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0F1B2D] text-xs font-bold text-white">
                    {post.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#0F1B2D]">{post.author.name}</span>
                      {post.author.verified && (
                        <CheckCircle2 size={13} className="text-[#B8955A]" title="Verified" />
                      )}
                    </div>
                    <span className="text-xs text-[#64748B] block">
                      {post.author.role} • {post.author.organization}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2.5 py-0.5 text-[11px] font-semibold text-[#0F1B2D]">
                    {post.type}
                  </span>
                  {post.stage && (
                    <span className="rounded bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                      {post.stage}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Body */}
              <div>
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] leading-snug">
                  {post.title}
                </h1>
                <div className="mt-4 text-xs text-[#1E293B] leading-relaxed whitespace-pre-line">
                  {post.body}
                </div>
              </div>

              {/* Tags & Disclosure */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[10px] font-mono text-[#475569]"
                  >
                    #{tag}
                  </span>
                ))}
                {post.disclosure && (
                  <span className="rounded bg-slate-100 text-[#475569] px-2 py-0.5 text-[10px] italic">
                    Affiliation Disclosure: {post.disclosure}
                  </span>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-between text-xs text-[#64748B]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleHelpfulPost}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition ${
                      post.isHelpfulByMe
                        ? 'bg-[#0F1B2D] text-white'
                        : 'bg-[#FAF8F4] text-[#475569] hover:bg-[#E5E1D8]'
                    }`}
                  >
                    <ThumbsUp size={13} className={post.isHelpfulByMe ? 'text-[#B8955A]' : ''} />
                    <span>Helpful ({post.helpfulCount})</span>
                  </button>

                  {post.author.id !== activePersona.id && (
                    <button
                      type="button"
                      onClick={() => setConnectModalData(post.author)}
                      className="rounded-lg border border-[#E5E1D8] px-2.5 py-1.5 text-[11px] font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
                    >
                      Connect with Author
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        navigator.clipboard?.writeText(window.location.href);
                        showToast('Thread link copied!');
                      }
                    }}
                    className="p-1.5 text-[#94A3B8] hover:text-[#0F1B2D]"
                    title="Share"
                  >
                    <Share2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(true)}
                    className="p-1.5 text-[#94A3B8] hover:text-rose-600"
                    title="Report"
                  >
                    <Flag size={14} />
                  </button>
                </div>
              </div>
            </article>

            {/* Accepted Answer Highlight (if exists) */}
            {post.hasAcceptedAnswer && post.answers?.find((a) => a.isAccepted) && (
              <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/60 p-5 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Official Accepted Answer</span>
                  </div>
                  {post.answers.find((a) => a.isAccepted)?.author.expertLabel && (
                    <span className="rounded-full bg-white border border-emerald-300 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-900">
                      {post.answers.find((a) => a.isAccepted)?.author.expertLabel}
                    </span>
                  )}
                </div>

                <div className="text-xs text-[#0F1B2D] leading-relaxed whitespace-pre-line">
                  {post.answers.find((a) => a.isAccepted)?.body}
                </div>

                <div className="pt-2 border-t border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-between">
                  <span>Answered by {post.answers.find((a) => a.isAccepted)?.author.name}</span>
                  <span>{post.answers.find((a) => a.isAccepted)?.helpfulCount} helpful votes</span>
                </div>
              </div>
            )}

            {/* All Answers Feed */}
            <div className="space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#0F1B2D] flex items-center justify-between">
                <span>All Answers & Discussion ({post.answers?.length || 0})</span>
                <span className="text-xs font-normal text-[#64748B]">Sorted by most helpful</span>
              </h2>

              {(post.answers || []).map((ans) => (
                <div
                  key={ans.id}
                  className={`rounded-xl border p-4 space-y-3 bg-white ${
                    ans.isAccepted ? 'border-emerald-300 bg-emerald-50/20' : 'border-[#E5E1D8]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0F1B2D] text-xs font-bold text-white">
                        {ans.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-[#0F1B2D]">{ans.author.name}</span>
                          {ans.author.verified && (
                            <CheckCircle2 size={12} className="text-[#B8955A]" />
                          )}
                        </div>
                        <span className="text-[10px] text-[#64748B]">
                          {ans.author.role} • {ans.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {ans.isAccepted && (
                        <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 size={11} /> Accepted
                        </span>
                      )}
                      {post.author.id === activePersona.id && (
                        <button
                          type="button"
                          onClick={() => handleToggleAcceptAnswer(ans.id)}
                          className="text-[11px] font-semibold text-[#B8955A] hover:underline"
                        >
                          {ans.isAccepted ? 'Unmark' : 'Mark as Accepted'}
                        </button>
                      )}
                    </div>
                  </div>

                  {ans.author.expertLabel && (
                    <div className="rounded bg-white border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 w-fit">
                      {ans.author.expertLabel}
                    </div>
                  )}

                  <div className="text-xs text-[#1E293B] leading-relaxed whitespace-pre-line">
                    {ans.body}
                  </div>

                  {/* Answer Upvote & Reply Bar */}
                  <div className="pt-2 border-t border-[#E5E1D8] flex items-center justify-between text-xs text-[#64748B]">
                    <button
                      type="button"
                      onClick={() => handleToggleHelpfulAnswer(ans.id)}
                      className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
                        ans.isUpvotedByMe
                          ? 'bg-[#0F1B2D] text-white'
                          : 'bg-[#FAF8F4] text-[#475569] hover:bg-[#E5E1D8]'
                      }`}
                    >
                      <ThumbsUp size={12} />
                      <span>Helpful ({ans.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Answer Composer */}
            <form onSubmit={handleAddAnswer} className="rounded-2xl border border-[#E5E1D8] bg-white p-5 space-y-3 shadow-xs">
              <label className="block text-xs font-bold text-[#0F1B2D] uppercase tracking-wider">
                Your Answer as {activePersona.name} ({activePersona.role})
              </label>
              <textarea
                rows={4}
                value={newAnswerText}
                onChange={(e) => setNewAnswerText(e.target.value)}
                placeholder="Share your technical experience, reference legal circulars, or provide step-by-step guidance..."
                className="w-full rounded-lg border border-[#E5E1D8] p-3 text-xs text-[#0F1B2D] outline-none focus:border-[#B8955A] leading-relaxed"
                required
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#64748B]">
                  Remember: Keep answers professional and constructive.
                </span>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0F1B2D] px-5 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] shadow-xs flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Post Answer</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Context & Mentor Recommendation Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Ask a Verified Mentor Card */}
            <div className="rounded-xl border border-[#B8955A]/40 bg-gradient-to-br from-[#FAF8F4] to-[#F3EBDD]/50 p-4 shadow-2xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#B8955A]" />
                <span>Need Personalized Guidance?</span>
              </span>
              <p className="text-xs text-[#475569] leading-relaxed">
                Connect 1-on-1 with accredited mentors specializing in Indian startup taxation, venture scaling, and system architecture.
              </p>
              <Link
                href="/mentor/discover"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] shadow-xs w-full justify-center"
              >
                <span>Find Verified Mentors</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            {/* Legal / Advice Disclaimer Card */}
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 text-xs text-[#64748B] space-y-2">
              <span className="font-bold text-[#0F1B2D] flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#B8955A]" />
                <span>Statutory Advice Disclaimer</span>
              </span>
              <p className="text-[11px] leading-relaxed">
                Discussions and answers in the Community represent peer opinions and operational experiences, not professional legal, tax, or financial advisory.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Connect Modal */}
      {connectModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-3">
              Connect with {connectModalData.name}
            </h3>
            <textarea
              rows={3}
              maxLength={300}
              value={connectMessage}
              onChange={(e) => setConnectMessage(e.target.value)}
              placeholder="Introduce yourself and your startup..."
              className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] outline-none focus:border-[#B8955A]"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                onClick={() => setConnectModalData(null)}
                className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast('Connect request sent!');
                  setConnectModalData(null);
                }}
                className="rounded-lg bg-[#0F1B2D] text-white px-4 py-1.5 text-xs font-bold"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

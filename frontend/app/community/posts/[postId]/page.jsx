'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  ThumbsUp,
  Share2,
  Flag,
  Send,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import CommunityHeader from '../../components/community-header';
import ConnectModal from '../../components/connect-modal';
import ReportModal from '../../components/report-modal';
import {
  COMMUNITY_PERSONAS,
  loadCommunityPosts,
  saveCommunityPosts,
  normalizeComment,
} from '../../community-data';

export default function SinglePostThreadPage() {
  const params = useParams();
  const postId = params?.postId || 'post_gst_billing';

  const [activePersona, setActivePersona] = useState(COMMUNITY_PERSONAS[0]);
  const [posts, setPosts] = useState(() => loadCommunityPosts());
  const [newAnswerText, setNewAnswerText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Modals
  const [connectModalData, setConnectModalData] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    setPosts(loadCommunityPosts());
  }, [postId]);

  const post = posts.find((p) => p.id === postId) || posts[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2700);
  };

  // Upvote post
  const handleToggleHelpfulPost = () => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === post.id) {
          const isHelpful = !p.isHelpfulByMe && !p.userUpvoted;
          const currentCount = p.helpfulVotes ?? p.helpfulCount ?? 0;
          const newCount = isHelpful ? currentCount + 1 : Math.max(0, currentCount - 1);
          return {
            ...p,
            isHelpfulByMe: isHelpful,
            userUpvoted: isHelpful,
            helpfulCount: newCount,
            helpfulVotes: newCount,
          };
        }
        return p;
      });
      saveCommunityPosts(updated);
      return updated;
    });
    showToast('Vote recorded');
  };

  // Upvote answer
  const handleToggleHelpfulAnswer = (ansId) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === post.id) {
          const rawAnswers = p.answers || p.comments || [];
          const updatedAnswers = rawAnswers.map((ans) => {
            if (ans.id === ansId) {
              const isUpvoted = !ans.isUpvotedByMe && !ans.userUpvoted;
              const currentCount = ans.helpfulVotes ?? ans.helpfulCount ?? 0;
              const newCount = isUpvoted ? currentCount + 1 : Math.max(0, currentCount - 1);
              return {
                ...ans,
                isUpvotedByMe: isUpvoted,
                userUpvoted: isUpvoted,
                helpfulCount: newCount,
                helpfulVotes: newCount,
              };
            }
            return ans;
          });
          return {
            ...p,
            answers: updatedAnswers,
            comments: updatedAnswers,
          };
        }
        return p;
      });
      saveCommunityPosts(updated);
      return updated;
    });
    showToast('Answer vote updated');
  };

  // Mark/unmark accepted answer
  const handleToggleAcceptAnswer = (ansId) => {
    const isAuthor = post.author?.handle === activePersona.handle;
    const isAdmin = activePersona.roleKey === 'admin';
    if (!isAuthor && !isAdmin) {
      showToast('Only the question author or Admin can accept an answer.');
      return;
    }

    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === post.id) {
          const rawAnswers = p.answers || p.comments || [];
          const isCurrentlyAccepted = p.acceptedAnswerId === ansId;
          const updatedAcceptedId = isCurrentlyAccepted ? null : ansId;

          const updatedAnswers = rawAnswers.map((ans) => ({
            ...ans,
            isAccepted: ans.id === updatedAcceptedId,
          }));

          const targetComment = updatedAnswers.find((a) => a.id === updatedAcceptedId);
          const acceptedAnswerObj = targetComment
            ? {
                authorName: targetComment.author?.name,
                authorRole: targetComment.author?.role,
                preview: targetComment.content || targetComment.body,
                isExpert: targetComment.isExpertAnswer,
                expertBadge: targetComment.expertBadge || 'Verified Solution',
                upvotes: targetComment.helpfulVotes ?? targetComment.helpfulCount ?? 12,
              }
            : null;

          showToast(updatedAcceptedId ? 'Marked as Accepted Solution' : 'Removed accepted solution mark');
          return {
            ...p,
            hasAcceptedAnswer: Boolean(updatedAcceptedId),
            acceptedAnswerId: updatedAcceptedId,
            acceptedAnswer: acceptedAnswerObj,
            answers: updatedAnswers,
            comments: updatedAnswers,
          };
        }
        return p;
      });
      saveCommunityPosts(updated);
      return updated;
    });
  };

  // Submit Answer
  const handleAddAnswer = (e) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;

    const newAns = normalizeComment({
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
      content: newAnswerText.trim(),
      body: newAnswerText.trim(),
      timestamp: 'Just now',
      createdAt: 'Just now',
      helpfulCount: 0,
      helpfulVotes: 0,
      isAccepted: false,
      replies: [],
    });

    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === post.id) {
          const currentAnswers = p.answers || p.comments || [];
          const updatedAnswers = [...currentAnswers, newAns];
          return {
            ...p,
            commentsCount: updatedAnswers.length,
            answers: updatedAnswers,
            comments: updatedAnswers,
            isUnanswered: false,
          };
        }
        return p;
      });
      saveCommunityPosts(updated);
      return updated;
    });

    setNewAnswerText('');
    showToast('Your answer has been published!');
  };

  // Submit Report
  const handleSubmitReport = (reason, notes) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === post.id) {
          return {
            ...p,
            isFlagged: true,
            reportReason: reason,
            reportNotes: notes,
            reportedBy: activePersona.name,
            reportedAt: 'Just now',
          };
        }
        return p;
      });
      saveCommunityPosts(updated);
      return updated;
    });
    setReportModalOpen(false);
    showToast('Report submitted. Flagged for Trust & Safety review.');
  };

  const rawAnswersList = post.answers || post.comments || [];

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
        onOpenCompose={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
      />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-5">
          <div className="flex items-center gap-2">
            <Link href="/community" className="hover:text-[#0F1B2D]">Community</Link>
            <span>/</span>
            <Link href="/community" className="hover:text-[#0F1B2D]">
              #{post.spaceName || 'Ask the Community'}
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

        {/* Flagged Status Banner */}
        {post.isFlagged && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Trust & Safety Notice</p>
              <p className="text-[11px] leading-snug">
                This discussion has been reported by a member for review regarding "{post.reportReason || 'Policy Compliance'}".
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Thread Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Question / Main Post Card */}
            <article className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs space-y-4">
              {/* Post Meta */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E5E1D8]">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0F1B2D] text-xs font-bold text-white">
                    {post.author?.avatar || post.author?.name?.slice(0, 2).toUpperCase() || 'CM'}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#0F1B2D]">{post.author?.name}</span>
                      {post.author?.verified && (
                        <CheckCircle2 size={13} className="text-[#B8955A]" title="Verified" />
                      )}
                    </div>
                    <span className="text-xs text-[#64748B] block">
                      {post.author?.role} • {post.author?.organization}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2.5 py-0.5 text-[11px] font-semibold text-[#0F1B2D]">
                    {post.type}
                  </span>
                  {(post.stageBadge || post.stage) && (
                    <span className="rounded bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                      {post.stageBadge || post.stage}
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
                  {post.content || post.body}
                </div>
              </div>

              {/* Tags */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                {(post.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[10px] font-mono text-[#475569]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-between text-xs text-[#64748B]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleHelpfulPost}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition ${
                      post.isHelpfulByMe || post.userUpvoted
                        ? 'bg-[#0F1B2D] text-white'
                        : 'bg-[#FAF8F4] text-[#475569] hover:bg-[#E5E1D8]'
                    }`}
                  >
                    <ThumbsUp size={13} className={post.isHelpfulByMe || post.userUpvoted ? 'text-[#B8955A]' : ''} />
                    <span>Helpful ({post.helpfulVotes ?? post.helpfulCount ?? 0})</span>
                  </button>

                  {post.author?.handle !== activePersona.handle && (
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

            {/* Accepted Answer Highlight */}
            {post.acceptedAnswerId && rawAnswersList.find((a) => a.id === post.acceptedAnswerId) && (
              <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/60 p-5 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Official Accepted Solution</span>
                  </div>
                  {rawAnswersList.find((a) => a.id === post.acceptedAnswerId)?.author?.expertLabel && (
                    <span className="rounded-full bg-white border border-emerald-300 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-900">
                      {rawAnswersList.find((a) => a.id === post.acceptedAnswerId)?.author?.expertLabel}
                    </span>
                  )}
                </div>

                <div className="text-xs text-[#0F1B2D] leading-relaxed whitespace-pre-line">
                  {rawAnswersList.find((a) => a.id === post.acceptedAnswerId)?.content ||
                    rawAnswersList.find((a) => a.id === post.acceptedAnswerId)?.body}
                </div>

                <div className="pt-2 border-t border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-between">
                  <span>Answered by {rawAnswersList.find((a) => a.id === post.acceptedAnswerId)?.author?.name}</span>
                  <span>{rawAnswersList.find((a) => a.id === post.acceptedAnswerId)?.helpfulVotes ?? 12} helpful votes</span>
                </div>
              </div>
            )}

            {/* All Answers Feed */}
            <div className="space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#0F1B2D] flex items-center justify-between">
                <span>All Answers & Discussion ({rawAnswersList.length})</span>
                <span className="text-xs font-normal text-[#64748B]">Sorted by verified insights</span>
              </h2>

              {rawAnswersList.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#E5E1D8] bg-white p-6 text-center text-xs text-[#7B8CA3]">
                  No answers yet. Share your experience below to help this founder!
                </div>
              ) : (
                rawAnswersList.map((ans) => {
                  const isAccepted = post.acceptedAnswerId === ans.id || ans.isAccepted;

                  return (
                    <div
                      key={ans.id}
                      className={`rounded-xl border p-4 space-y-3 bg-white ${
                        isAccepted ? 'border-emerald-300 bg-emerald-50/20' : 'border-[#E5E1D8]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0F1B2D] text-xs font-bold text-white">
                            {ans.author?.avatar || ans.author?.name?.slice(0, 2).toUpperCase() || 'CM'}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-[#0F1B2D]">{ans.author?.name}</span>
                              {ans.author?.verified && (
                                <CheckCircle2 size={12} className="text-[#B8955A]" />
                              )}
                            </div>
                            <span className="text-[10px] text-[#64748B]">
                              {ans.author?.role} • {ans.timestamp || ans.createdAt || 'Recent'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isAccepted && (
                            <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                              <CheckCircle2 size={11} /> Accepted
                            </span>
                          )}
                          {(post.author?.handle === activePersona.handle || activePersona.roleKey === 'admin') && (
                            <button
                              type="button"
                              onClick={() => handleToggleAcceptAnswer(ans.id)}
                              className="text-[11px] font-semibold text-[#B8955A] hover:underline"
                            >
                              {isAccepted ? 'Unmark' : 'Mark as Accepted'}
                            </button>
                          )}
                        </div>
                      </div>

                      {ans.author?.expertLabel && (
                        <div className="rounded bg-white border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 w-fit">
                          {ans.author.expertLabel}
                        </div>
                      )}

                      <div className="text-xs text-[#1E293B] leading-relaxed whitespace-pre-line">
                        {ans.content || ans.body}
                      </div>

                      <div className="pt-2 border-t border-[#E5E1D8] flex items-center justify-between text-xs text-[#64748B]">
                        <button
                          type="button"
                          onClick={() => handleToggleHelpfulAnswer(ans.id)}
                          className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
                            ans.isUpvotedByMe || ans.userUpvoted
                              ? 'bg-[#0F1B2D] text-white'
                              : 'bg-[#FAF8F4] text-[#475569] hover:bg-[#E5E1D8]'
                          }`}
                        >
                          <ThumbsUp size={12} />
                          <span>Helpful ({ans.helpfulVotes ?? ans.helpfulCount ?? 0})</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
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

          {/* Right Context Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="rounded-xl border border-[#B8955A]/40 bg-gradient-to-br from-[#FAF8F4] to-[#F3EBDD]/50 p-4 shadow-2xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#B8955A]" />
                <span>Need Personalized Guidance?</span>
              </span>
              <p className="text-xs text-[#475569] leading-relaxed">
                Connect 1-on-1 with accredited mentors specializing in Indian startup taxation, venture scaling, and system architecture.
              </p>
              <Link
                href="/mentor/community"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] shadow-xs w-full justify-center"
              >
                <span>Browse Mentor Insights</span>
                <ChevronRight size={13} />
              </Link>
            </div>

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
        <ConnectModal
          targetUser={connectModalData}
          activePersona={activePersona}
          onClose={() => setConnectModalData(null)}
          onSuccess={(note) => {
            showToast('Connect request sent with personal note!');
            setConnectModalData(null);
          }}
        />
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <ReportModal
          post={post}
          onClose={() => setReportModalOpen(false)}
          onSubmitReport={handleSubmitReport}
        />
      )}
    </div>
  );
}

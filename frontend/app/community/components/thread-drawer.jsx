'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ThumbsUp,
  Flag,
  UserPlus,
  Send,
  Award,
  Check,
} from 'lucide-react';

export default function ThreadDrawer({
  post,
  activePersona,
  onClose,
  onUpvotePost,
  onAcceptAnswer,
  onAddComment,
  onOpenConnect,
  onOpenReport,
}) {
  const [replyText, setReplyText] = useState('');

  const isAuthor = post.author?.handle === activePersona.handle;
  const isAdmin = activePersona.roleKey === 'admin';

  const handlePostReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddComment(post.id, replyText.trim());
    setReplyText('');
  };

  const comments = post.comments || post.answers || [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0F1B2D]/40 backdrop-blur-xs animate-in fade-in">
      <div className="flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#E5E1D8] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#FAF8F4] px-2 py-0.5 text-xs font-bold text-[#0F1B2D] border border-[#E5E1D8]">
              #{post.spaceName}
            </span>
            <span className="text-xs text-[#7B8CA3]">• {post.type}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#7B8CA3] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Post Author & Content */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1B2D] font-serif font-bold text-white text-xs">
                  {post.author?.avatar || 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0F1B2D]">
                      {post.author?.name}
                    </span>
                    {post.author?.verified && (
                      <CheckCircle2 size={13} className="text-[#B8955A]" />
                    )}
                    <span className="rounded bg-[#FAF8F4] px-1.5 text-[10px] text-[#5A6E85]">
                      {post.author?.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7B8CA3]">{post.author?.organization}</p>
                </div>
              </div>

              {!isAuthor && (
                <button
                  onClick={() => onOpenConnect(post.author)}
                  className="flex items-center gap-1 rounded-lg border border-[#0F1B2D] px-2.5 py-1 text-xs font-semibold text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-white transition"
                >
                  <UserPlus size={13} />
                  Connect
                </button>
              )}
            </div>

            <h1 className="mt-4 font-serif text-lg font-bold text-[#0F1B2D] leading-snug">
              {post.title}
            </h1>
            <p className="mt-2.5 text-xs leading-relaxed text-[#334155] whitespace-pre-line">
              {post.content || post.body}
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between border-y border-[#F2EFE9] py-2.5 text-xs text-[#5A6E85]">
            <button
              onClick={() => onUpvotePost(post.id)}
              className="flex items-center gap-1.5 font-semibold text-[#0F1B2D] hover:text-[#B8955A]"
            >
              <ThumbsUp
                size={14}
                className={post.userUpvoted ? 'fill-current text-[#B8955A]' : ''}
              />
              Helpful ({post.helpfulVotes ?? post.helpfulCount ?? 0})
            </button>
            <button
              onClick={() => onOpenReport(post)}
              className="text-[#7B8CA3] hover:text-red-600 flex items-center gap-1"
            >
              <Flag size={13} /> Report
            </button>
          </div>

          {/* Verified Accepted Solution Card */}
          {post.acceptedAnswer && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/50 p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  Accepted Solution
                </span>
                {post.acceptedAnswer.isExpert && (
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    {post.acceptedAnswer.expertBadge}
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed text-[#1E293B] whitespace-pre-line">
                {post.acceptedAnswer.preview}
              </p>
            </div>
          )}

          {/* Answers & Discussion Feed */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B8CA3]">
              Answers & Insights ({comments.length})
            </h3>

            {comments.length === 0 ? (
              <p className="text-xs text-[#7B8CA3] italic">
                No answers yet. Share your experience or playbook below!
              </p>
            ) : (
              comments.map((comm) => {
                const isAccepted = post.acceptedAnswerId === comm.id;

                return (
                  <div
                    key={comm.id}
                    className={`rounded-xl border p-4 text-xs transition ${
                      isAccepted
                        ? 'border-emerald-400 bg-emerald-50/20'
                        : 'border-[#E5E1D8] bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F1B2D] text-[11px] font-bold text-white">
                          {comm.author?.avatar || 'U'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#0F1B2D]">
                              {comm.author?.name}
                            </span>
                            {comm.isExpertAnswer && (
                              <span className="flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-[#8C6D37] border border-amber-200">
                                <Award size={10} /> Expert
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#7B8CA3]">
                            {comm.timestamp || comm.createdAt}
                          </span>
                        </div>
                      </div>

                      {/* Accept Answer CTA (Author or Admin) */}
                      {(isAuthor || isAdmin) && !isAccepted && (
                        <button
                          onClick={() => onAcceptAnswer(post.id, comm.id)}
                          className="flex items-center gap-1 rounded border border-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 hover:bg-emerald-50"
                        >
                          <Check size={11} /> Mark as Accepted
                        </button>
                      )}
                      {(isAuthor || isAdmin) && isAccepted && (
                        <button
                          onClick={() => onAcceptAnswer(post.id, comm.id)}
                          className="flex items-center gap-1 rounded-full bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-800 transition"
                          title="Click to unmark"
                        >
                          <CheckCircle2 size={12} /> Accepted Solution (Click to Unmark)
                        </button>
                      )}
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#334155] whitespace-pre-line">
                      {comm.content || comm.body}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Drawer Footer: Reply Composer */}
        <form onSubmit={handlePostReply} className="border-t border-[#E5E1D8] bg-[#FAF8F4] p-4">
          <div className="flex items-start gap-2.5">
            <textarea
              rows={2}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Answer as ${activePersona.name} (${activePersona.role})...`}
              className="flex-1 rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded-lg bg-[#0F1B2D] px-4 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] transition"
            >
              <Send size={13} />
              <span>Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import {
  CheckCircle2,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Share2,
  Flag,
  Vote,
  Award,
  ChevronRight,
  AlertTriangle,
  Check,
  Trash2,
} from 'lucide-react';

export default function CommunityPostCard({
  post,
  activePersona,
  onOpenThread,
  onUpvote,
  onToggleBookmark,
  onPollVote,
  onOpenReport,
  onDismissFlag,
  onRemovePost,
  onShowToast,
}) {
  const isPostAuthor = post.author?.handle === activePersona.handle;
  const isAdmin = activePersona.roleKey === 'admin';

  return (
    <article
      className={`rounded-xl border bg-white p-4 sm:p-5 shadow-xs transition hover:border-[#CBD5E1] ${
        post.isFlagged ? 'border-amber-300 ring-1 ring-amber-200' : 'border-[#E5E1D8]'
      }`}
    >
      {/* Moderation Alert Banner if Flagged */}
      {post.isFlagged && (
        <div className="mb-3.5">
          {isAdmin ? (
            <div className="rounded-lg border border-red-200 bg-red-50/90 p-3 text-xs text-red-900">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle size={14} className="text-red-600" />
                  Flagged: {post.reportReason || 'Policy Violation'}
                </span>
                <span className="text-[10px] text-red-700">
                  By {post.reportedBy || 'Member'}
                </span>
              </div>
              {post.reportNotes && (
                <p className="mt-1 text-[11px] text-red-800 italic">
                  "{post.reportNotes}"
                </p>
              )}
              <div className="mt-2 flex items-center justify-end gap-2 border-t border-red-200/60 pt-2">
                <button
                  onClick={() => onDismissFlag(post.id)}
                  className="flex items-center gap-1 rounded border border-red-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0F1B2D] hover:bg-red-50 transition"
                >
                  <Check size={12} className="text-emerald-600" />
                  Dismiss
                </button>
                <button
                  onClick={() => onRemovePost(post.id)}
                  className="flex items-center gap-1 rounded bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-700 transition"
                >
                  <Trash2 size={12} />
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
              <AlertTriangle size={12} className="text-amber-600" />
              <span>Under Trust & Safety review.</span>
            </div>
          )}
        </div>
      )}

      {/* Top Header: Author + Meta */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F1B2D] font-serif font-bold text-white text-xs shadow-xs">
            {post.author?.avatar || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#0F1B2D]">
                {post.author?.name}
              </span>
              {post.author?.verified && (
                <CheckCircle2 size={12} className="text-[#B8955A]" />
              )}
              <span className="rounded bg-[#FAF8F4] px-1.5 py-0.2 text-[9px] font-semibold text-[#5A6E85] border border-[#E5E1D8]">
                {post.author?.role}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#7B8CA3]">
              <span>{post.timestamp || post.createdAt}</span>
              <span>•</span>
              <span className="text-[#B8955A] font-medium">#{post.spaceName}</span>
            </div>
          </div>
        </div>

        {/* Post Type Pill */}
        <span className="rounded-full bg-[#FAF8F4] px-2 py-0.5 text-[10px] font-semibold text-[#0F1B2D] border border-[#E5E1D8] shrink-0">
          {post.type}
        </span>
      </div>

      {/* Post Title & Content */}
      <div className="mt-2.5">
        <h2
          onClick={() => onOpenThread(post)}
          className="cursor-pointer font-serif text-sm sm:text-base font-bold text-[#0F1B2D] hover:text-[#B8955A] transition leading-snug"
        >
          {post.title}
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-[#4A5568] line-clamp-3 whitespace-pre-line">
          {post.content || post.body}
        </p>
      </div>

      {/* Interactive Poll Widget */}
      {post.pollData && (
        <div className="mt-3 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs">
          <div className="mb-2 flex items-center justify-between text-[11px] text-[#7B8CA3]">
            <span className="font-semibold text-[#0F1B2D] flex items-center gap-1.5">
              <Vote size={13} className="text-[#B8955A]" />
              Poll
            </span>
            <span>{post.pollData.totalVotes} votes</span>
          </div>
          <div className="space-y-1.5">
            {post.pollData.options.map((option) => {
              const pct =
                post.pollData.totalVotes > 0
                  ? Math.round((option.votes / post.pollData.totalVotes) * 100)
                  : 0;
              const hasVoted = post.pollData.userVotedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  disabled={Boolean(post.pollData.userVotedOptionId)}
                  onClick={() => onPollVote(post.id, option.id)}
                  className={`relative block w-full overflow-hidden rounded-lg border p-2 text-left text-xs transition ${
                    hasVoted
                      ? 'border-[#B8955A] bg-amber-50/60 font-semibold'
                      : 'border-[#E5E1D8] bg-white hover:border-[#0F1B2D]'
                  }`}
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-[#B8955A]/15 transition-all pointer-events-none"
                    style={{ width: `${pct}%` }}
                  />
                  <span className="relative flex items-center justify-between">
                    <span className="font-medium text-[#0F1B2D]">
                      {option.text} {hasVoted && '✓'}
                    </span>
                    <span className="text-[11px] font-bold text-[#0F1B2D]">
                      {pct}% ({option.votes})
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Accepted Solution Highlight Card */}
      {post.acceptedAnswer && (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/50 p-2.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px]">
              <CheckCircle2 size={13} className="text-emerald-700" />
              <span>Accepted Solution</span>
            </div>
            {post.acceptedAnswer.isExpert && (
              <span className="text-[10px] font-semibold text-emerald-800">
                Verified Expert
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-[#2D3748] line-clamp-2">
            {post.acceptedAnswer.preview}
          </p>
          <button
            onClick={() => onOpenThread(post)}
            className="mt-1.5 text-[10px] font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
          >
            View full solution <ChevronRight size={11} />
          </button>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-[#FAF8F4] px-1.5 py-0.5 text-[10px] font-medium text-[#5A6E85] border border-[#E5E1D8]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Bar */}
      <div className="mt-3 flex items-center justify-between border-t border-[#F2EFE9] pt-2.5 text-xs text-[#5A6E85]">
        <div className="flex items-center gap-2">
          {/* Helpful Upvote Button */}
          <button
            onClick={() => onUpvote(post.id)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              post.userUpvoted
                ? 'bg-[#B8955A]/20 text-[#8C6D37]'
                : 'hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
            }`}
          >
            <ThumbsUp size={13} className={post.userUpvoted ? 'fill-current' : ''} />
            <span>Helpful ({post.helpfulVotes ?? post.helpfulCount ?? 0})</span>
          </button>

          {/* Comments Button */}
          <button
            onClick={() => onOpenThread(post)}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium hover:bg-[#FAF8F4] hover:text-[#0F1B2D] transition"
          >
            <MessageCircle size={13} />
            <span>{post.commentsCount || (post.comments?.length || 0)} Answers</span>
          </button>
        </div>

        {/* Right Action Icons: Bookmark, Share, Flag */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleBookmark(post.id)}
            title="Bookmark"
            className={`rounded p-1.5 transition ${
              post.userBookmarked
                ? 'text-[#B8955A]'
                : 'text-[#7B8CA3] hover:text-[#0F1B2D]'
            }`}
          >
            <Bookmark size={14} className={post.userBookmarked ? 'fill-current' : ''} />
          </button>

          <button
            onClick={() => {
              if (typeof window !== 'undefined' && navigator.clipboard) {
                navigator.clipboard.writeText(
                  window.location.origin + `/community/posts/${post.id}`
                );
                onShowToast('Link copied to clipboard');
              }
            }}
            title="Share Link"
            className="rounded p-1.5 text-[#7B8CA3] hover:text-[#0F1B2D] transition"
          >
            <Share2 size={14} />
          </button>

          <button
            onClick={() => onOpenReport(post)}
            title="Report"
            className="rounded p-1.5 text-[#7B8CA3] hover:text-red-600 transition"
          >
            <Flag size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

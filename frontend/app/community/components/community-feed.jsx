'use client';

import React from 'react';
import {
  HelpCircle,
  Sparkles,
  UserPlus,
  BookOpen,
  Vote,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import CommunityPostCard from './community-post-card';

export default function CommunityFeed({
  posts,
  spaces,
  activePersona,
  selectedSpaceSlug,
  onClearSpaceFilter,
  activeTab,
  onTabChange,
  postTypeFilter,
  onPostTypeFilterChange,
  onOpenComposeWithType,
  onOpenThread,
  onUpvote,
  onToggleBookmark,
  onPollVote,
  onOpenReport,
  onDismissFlag,
  onRemovePost,
  onShowToast,
  flaggedCount,
}) {
  const isAdmin = activePersona.roleKey === 'admin';

  return (
    <section className="space-y-4">
      {/* Quick Compose Prompt Bar with 4 Intent Triggers */}
      <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F1B2D] font-serif font-bold text-white text-xs">
            {activePersona.avatar}
          </div>
          <button
            onClick={() => onOpenComposeWithType('Question')}
            className="flex-1 rounded-full border border-[#E5E1D8] bg-[#FAF8F4] px-4 py-2 text-left text-xs text-[#7B8CA3] hover:border-[#0F1B2D] hover:bg-white transition"
          >
            Ask a question, share a milestone, or start a discussion...
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[#F2EFE9] pt-2.5 text-xs text-[#5A6E85]">
          <button
            onClick={() => onOpenComposeWithType('Question')}
            className="flex items-center gap-1.5 hover:text-[#0F1B2D] transition py-1 font-medium"
          >
            <HelpCircle size={14} className="text-amber-600" />
            <span>Ask Question</span>
          </button>
          <button
            onClick={() => onOpenComposeWithType('Milestone')}
            className="flex items-center gap-1.5 hover:text-[#0F1B2D] transition py-1 font-medium"
          >
            <Sparkles size={14} className="text-purple-600" />
            <span>Share Milestone</span>
          </button>
          <button
            onClick={() => onOpenComposeWithType('Looking for')}
            className="flex items-center gap-1.5 hover:text-[#0F1B2D] transition py-1 font-medium"
          >
            <UserPlus size={14} className="text-blue-600" />
            <span>Looking For</span>
          </button>
          <button
            onClick={() => onOpenComposeWithType('Poll')}
            className="flex items-center gap-1.5 hover:text-[#0F1B2D] transition py-1 font-medium"
          >
            <Vote size={14} className="text-rose-600" />
            <span>Create Poll</span>
          </button>
          <button
            onClick={() => onOpenComposeWithType('Resource')}
            className="flex items-center gap-1.5 hover:text-[#0F1B2D] transition py-1 font-medium"
          >
            <BookOpen size={14} className="text-emerald-600" />
            <span>Post Resource</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Post Type Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E1D8] pb-1 text-xs">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {[
            { id: 'for-you', label: 'For You' },
            { id: 'following', label: 'Following Spaces' },
            { id: 'unanswered', label: 'Unanswered Q&A' },
            { id: 'top', label: 'Top This Week' },
            ...(isAdmin
              ? [
                  {
                    id: 'reported',
                    label: `Flagged Queue (${flaggedCount})`,
                    isAdminTab: true,
                  },
                ]
              : []),
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-2 font-semibold transition border-b-2 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? tab.isAdminTab
                    ? 'border-red-600 text-red-600'
                    : 'border-[#B8955A] text-[#0F1B2D]'
                  : tab.isAdminTab
                  ? 'border-transparent text-red-600 hover:text-red-700'
                  : 'border-transparent text-[#7B8CA3] hover:text-[#0F1B2D]'
              }`}
            >
              {tab.isAdminTab && <AlertTriangle size={12} className="text-red-600" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Post Type Dropdown Filter */}
        <div className="flex items-center gap-1">
          <select
            value={postTypeFilter}
            onChange={(e) => onPostTypeFilterChange(e.target.value)}
            className="rounded-lg border border-[#E5E1D8] bg-white px-2.5 py-1 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="Question">Questions</option>
            <option value="Discussion">Discussions</option>
            <option value="Resource">Resources</option>
            <option value="Milestone">Milestones</option>
            <option value="Looking for">Looking for</option>
            <option value="Poll">Polls</option>
          </select>
        </div>
      </div>

      {/* Active Space Indicator Banner */}
      {selectedSpaceSlug !== 'all' && (
        <div className="flex items-center justify-between rounded-lg bg-white border border-[#E5E1D8] p-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F1B2D]">
              #{spaces.find((s) => s.slug === selectedSpaceSlug)?.name || selectedSpaceSlug}
            </span>
            <span className="text-[#5A6E85]">• {posts.length} posts</span>
          </div>
          <button
            onClick={onClearSpaceFilter}
            className="text-xs font-semibold text-[#B8955A] hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Post List */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E5E1D8] bg-white p-12 text-center">
          <MessageSquare size={32} className="mx-auto text-[#7B8CA3] mb-3" />
          <h4 className="font-bold text-[#0F1B2D]">
            {activeTab === 'reported' ? 'Flagged queue is empty!' : 'No posts found in this view'}
          </h4>
          <p className="mt-1 text-xs text-[#5A6E85]">
            {activeTab === 'reported'
              ? 'All reported discussions have been triaged by platform moderators.'
              : 'Be the first to start a conversation or ask a question in this space.'}
          </p>
          {activeTab !== 'reported' && (
            <button
              onClick={() => onOpenComposeWithType('Question')}
              className="mt-4 rounded-lg bg-[#0F1B2D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
            >
              Start Conversation
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              activePersona={activePersona}
              onOpenThread={onOpenThread}
              onUpvote={onUpvote}
              onToggleBookmark={onToggleBookmark}
              onPollVote={onPollVote}
              onOpenReport={onOpenReport}
              onDismissFlag={onDismissFlag}
              onRemovePost={onRemovePost}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      )}
    </section>
  );
}

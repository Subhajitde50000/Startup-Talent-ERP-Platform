'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  HelpCircle,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Users,
  Compass,
  Lightbulb,
  Briefcase,
  UserCheck,
  Calendar,
  Bell,
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  BookOpen,
  Share2,
  Flag,
  UserPlus,
  ArrowUpRight,
  ThumbsUp,
  MessageCircle,
  PlusCircle,
  Lock,
  AlertTriangle,
  Info,
  Check,
  Clock,
  X,
  ExternalLink,
  ChevronRight,
  Send,
  Award,
  Vote,
  RefreshCcw,
  Sliders,
  ChevronDown,
} from 'lucide-react';
import CommunityHeader from './community-header';
import {
  COMMUNITY_PERSONAS,
  COMMUNITY_SPACES,
  INITIAL_POSTS,
  UPCOMING_AMAS,
  ROLE_COMMUNITY_CONFIG,
  getPersonaForRole,
  analyzePostCompliance,
} from './community-data';

import {
  StartupShell,
  MentorShell,
  InvestorShell,
  EmployerShell,
  JobSeekerShell,
  AdminShell,
} from '@/components';

export default function CommunityView({
  role = 'startup',
  shellMode = 'none', // 'none' | 'startup' | 'mentor' | 'investor' | 'employer' | 'jobseeker' | 'admin'
}) {
  const roleConfig = ROLE_COMMUNITY_CONFIG[role] || ROLE_COMMUNITY_CONFIG.startup;

  // Active Persona State (initialized to the requested role's persona)
  const [activePersona, setActivePersona] = useState(() => getPersonaForRole(role));

  // Posts State
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [spaces, setSpaces] = useState(COMMUNITY_SPACES);

  // Filter States
  const [selectedSpaceSlug, setSelectedSpaceSlug] = useState('all');
  const [activeTab, setActiveTab] = useState('for-you'); // 'for-you' | 'following' | 'unanswered' | 'top'
  const [postTypeFilter, setPostTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedPostThread, setSelectedPostThread] = useState(null);
  const [connectModalData, setConnectModalData] = useState(null);
  const [reportModalData, setReportModalData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Helper: Check if active persona can access a space
  const canAccessSpace = (space) => {
    if (activePersona.roleKey === 'admin') return true;
    if (space.allowedRoles.includes('all')) return true;
    return space.allowedRoles.includes(activePersona.roleKey);
  };

  // Handler: Upvote a post
  const handleUpvotePost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const alreadyUpvoted = p.userUpvoted;
        return {
          ...p,
          helpfulVotes: alreadyUpvoted ? p.helpfulVotes - 1 : p.helpfulVotes + 1,
          userUpvoted: !alreadyUpvoted,
        };
      })
    );
    showToast('Vote recorded');
  };

  // Handler: Bookmark a post
  const handleToggleBookmark = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, userBookmarked: !p.userBookmarked } : p))
    );
    showToast('Bookmark updated');
  };

  // Handler: Cast a poll vote
  const handlePollVote = (postId, optionId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId || !p.pollData || p.pollData.userVotedOptionId) return p;
        const updatedOptions = p.pollData.options.map((opt) =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return {
          ...p,
          pollData: {
            ...p.pollData,
            totalVotes: p.pollData.totalVotes + 1,
            userVotedOptionId: optionId,
            options: updatedOptions,
          },
        };
      })
    );
    showToast('Your poll vote has been counted');
  };

  // Handler: Accept Answer (only by question author)
  const handleAcceptAnswer = (postId, answerId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const targetComment = p.comments.find((c) => c.id === answerId);
        return {
          ...p,
          acceptedAnswerId: answerId,
          acceptedAnswer: targetComment
            ? {
                authorName: targetComment.author.name,
                authorRole: targetComment.author.role,
                preview: targetComment.content,
                isExpert: targetComment.isExpertAnswer,
                expertBadge: targetComment.expertBadge || 'Verified Solution',
                upvotes: targetComment.helpfulVotes || 12,
              }
            : p.acceptedAnswer,
        };
      })
    );
    showToast('Answer marked as accepted solution');
  };

  // Handler: Add comment/reply
  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: `comm_${Date.now()}`,
      author: {
        name: activePersona.name,
        handle: activePersona.handle,
        role: activePersona.role,
        avatar: activePersona.avatar,
        verified: activePersona.verified,
      },
      content: text,
      timestamp: 'Just now',
      helpfulVotes: 0,
      userUpvoted: false,
      isExpertAnswer: activePersona.roleKey === 'mentor',
      expertBadge: activePersona.roleKey === 'mentor' ? 'Verified Mentor' : null,
      replies: [],
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, newComment],
        };
      })
    );

    if (selectedPostThread && selectedPostThread.id === postId) {
      setSelectedPostThread((prev) => ({
        ...prev,
        commentsCount: prev.commentsCount + 1,
        comments: [...prev.comments, newComment],
      }));
    }

    showToast('Your answer has been published');
  };

  // Handler: Create new post
  const handleCreatePost = (newPostData) => {
    const createdPost = {
      id: `post_${Date.now()}`,
      spaceId: newPostData.spaceId,
      spaceName: spaces.find((s) => s.id === newPostData.spaceId)?.name || 'Ask the Community',
      type: newPostData.type,
      title: newPostData.title,
      content: newPostData.content,
      tags: newPostData.tags || [],
      author: {
        name: activePersona.name,
        handle: activePersona.handle,
        role: activePersona.role,
        organization: activePersona.organization,
        avatar: activePersona.avatar,
        verified: activePersona.verified,
      },
      timestamp: 'Just now',
      helpfulVotes: 0,
      userUpvoted: false,
      userBookmarked: false,
      commentsCount: 0,
      isUnanswered: newPostData.type === 'Question',
      comments: [],
      pollData: newPostData.pollData || null,
      acceptedAnswer: null,
    };

    setPosts([createdPost, ...posts]);
    setComposeOpen(false);
    showToast('Post published successfully to #' + createdPost.spaceName);
  };

  // Handler: Toggle Space Join
  const handleToggleJoinSpace = (spaceId) => {
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id !== spaceId) return s;
        const nowJoined = !s.isJoined;
        return {
          ...s,
          isJoined: nowJoined,
          memberCount: nowJoined ? s.memberCount + 1 : s.memberCount - 1,
        };
      })
    );
    showToast('Space preferences updated');
  };

  // Filtered Posts Logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Space filter
      if (selectedSpaceSlug !== 'all') {
        const targetSpace = spaces.find((s) => s.slug === selectedSpaceSlug);
        if (targetSpace && post.spaceId !== targetSpace.id) return false;
      }

      // Tab filter
      if (activeTab === 'unanswered') {
        if (post.type !== 'Question' || !post.isUnanswered) return false;
      } else if (activeTab === 'following') {
        const space = spaces.find((s) => s.id === post.spaceId);
        if (!space || !space.isJoined) return false;
      } else if (activeTab === 'top') {
        if (post.helpfulVotes < 15) return false;
      }

      // Post Type filter
      if (postTypeFilter !== 'all' && post.type !== postTypeFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesContent = post.content.toLowerCase().includes(q);
        const matchesAuthor = post.author.name.toLowerCase().includes(q);
        const matchesTags = post.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesContent && !matchesAuthor && !matchesTags) return false;
      }

      return true;
    });
  }, [posts, spaces, selectedSpaceSlug, activeTab, postTypeFilter, searchQuery]);

  // Content JSX for the Community UI
  const communityContent = (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg border border-[#0F1B2D] bg-[#0F1B2D] px-4 py-3 text-xs font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-[#B8955A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Standalone Header (only when not wrapped in a shell) */}
      {shellMode === 'none' && (
        <CommunityHeader
          activePersona={activePersona}
          onSelectPersona={(persona) => setActivePersona(persona)}
          onOpenCompose={() => setComposeOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {/* Role Context Bar & Switcher Strip */}
      <div className="border-b border-[#E5E1D8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Left: Role Indicator & Description */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-md bg-[#0F1B2D] px-2.5 py-1 font-semibold text-white">
                <ShieldCheck size={13} className="text-[#B8955A]" />
                {roleConfig.banner.tag}
              </span>
              <span className="font-medium text-[#5A6E85]">
                {roleConfig.banner.title}
              </span>
            </div>

            {/* Right: Cross-Role Portal Quick Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7B8CA3]">
                Role Views:
              </span>
              <div className="flex flex-wrap items-center gap-1">
                {[
                  { key: 'startup', label: 'Startup', path: '/startup/community' },
                  { key: 'mentor', label: 'Mentor', path: '/mentor/community' },
                  { key: 'investor', label: 'Investor', path: '/investor/community' },
                  { key: 'employer', label: 'Employer', path: '/employer/community' },
                  { key: 'jobseeker', label: 'Talent', path: '/jobseeker/community' },
                  { key: 'admin', label: 'Admin', path: '/admin/community' },
                ].map((item) => {
                  const isCurrent = (role === item.key);
                  return (
                    <Link
                      key={item.key}
                      href={item.path}
                      className={`rounded px-2 py-0.5 text-[11px] font-medium transition ${
                        isCurrent
                          ? 'bg-[#B8955A] font-semibold text-white'
                          : 'bg-[#F2EFE9] text-[#0F1B2D] hover:bg-[#E5E1D8]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/community"
                  className="ml-1 rounded border border-[#E5E1D8] bg-white px-2 py-0.5 text-[11px] font-medium text-[#5A6E85] hover:border-[#0F1B2D] hover:text-[#0F1B2D]"
                >
                  Global Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Role-Specific Mission Banner */}
        <div className="mb-6 rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-bold text-[#0F1B2D] sm:text-xl">
                  {roleConfig.banner.title}
                </h1>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  {activePersona.role} Verified
                </span>
              </div>
              <p className="text-xs text-[#5A6E85] sm:text-sm">
                {roleConfig.banner.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {role === 'mentor' && (
                <button
                  onClick={() => setActiveTab('unanswered')}
                  className="flex items-center gap-1.5 rounded-lg border border-[#B8955A] bg-[#B8955A]/10 px-3 py-1.5 text-xs font-semibold text-[#8C6D37] hover:bg-[#B8955A]/20 transition"
                >
                  <HelpCircle size={14} />
                  Unanswered Questions ({posts.filter((p) => p.isUnanswered).length})
                </button>
              )}
              {role === 'startup' && (
                <button
                  onClick={() => {
                    const lounge = spaces.find((s) => s.slug === 'founders-lounge');
                    if (lounge) setSelectedSpaceSlug(lounge.slug);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-[#0F1B2D] bg-[#0F1B2D] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition"
                >
                  <Users size={14} className="text-[#B8955A]" />
                  Enter Founders Lounge
                </button>
              )}
              {role === 'investor' && (
                <button
                  onClick={() => {
                    const lounge = spaces.find((s) => s.slug === 'investors-forum');
                    if (lounge) setSelectedSpaceSlug(lounge.slug);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-[#0F1B2D] bg-[#0F1B2D] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition"
                >
                  <Briefcase size={14} className="text-[#B8955A]" />
                  Enter Investors Forum
                </button>
              )}
              {role === 'employer' && (
                <button
                  onClick={() => {
                    const lounge = spaces.find((s) => s.slug === 'employers-guild');
                    if (lounge) setSelectedSpaceSlug(lounge.slug);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-[#0F1B2D] bg-[#0F1B2D] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition"
                >
                  <Briefcase size={14} className="text-[#B8955A]" />
                  Enter Employers Guild
                </button>
              )}
              {role === 'jobseeker' && (
                <button
                  onClick={() => {
                    const lounge = spaces.find((s) => s.slug === 'talent-lounge');
                    if (lounge) setSelectedSpaceSlug(lounge.slug);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-[#0F1B2D] bg-[#0F1B2D] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition"
                >
                  <UserCheck size={14} className="text-[#B8955A]" />
                  Enter Talent Lounge
                </button>
              )}
              {role === 'admin' && (
                <Link
                  href="/admin/policies"
                  className="flex items-center gap-1.5 rounded-lg border border-[#B8955A] bg-[#B8955A]/10 px-3 py-1.5 text-xs font-semibold text-[#8C6D37] hover:bg-[#B8955A]/20 transition"
                >
                  <Sliders size={14} />
                  Content Policy Rules
                </Link>
              )}
              <button
                onClick={() => setComposeOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-sm"
              >
                <PlusCircle size={14} className="text-[#B8955A]" />
                Start Post
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT COLUMN: Persona card + Topic Spaces + Role Lounges (3 cols) */}
          <aside className="lg:col-span-3 space-y-5">
            {/* Active User Card */}
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F1B2D] font-serif font-bold text-white">
                  {activePersona.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-bold text-[#0F1B2D]">
                      {activePersona.name}
                    </span>
                    {activePersona.verified && (
                      <CheckCircle2 size={13} className="shrink-0 text-[#B8955A]" />
                    )}
                  </div>
                  <p className="truncate text-xs text-[#5A6E85]">{activePersona.role}</p>
                </div>
              </div>

              {/* Persona Stats */}
              <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-[#F2EFE9] pt-3 text-center">
                <div className="rounded-lg bg-[#FAF8F4] p-2">
                  <p className="text-base font-bold text-[#0F1B2D]">
                    {activePersona.helpfulAnswersCount}
                  </p>
                  <p className="text-[10px] text-[#5A6E85]">Helpful Votes</p>
                </div>
                <div className="rounded-lg bg-[#FAF8F4] p-2">
                  <p className="text-base font-bold text-emerald-800">
                    {activePersona.acceptedAnswersCount}
                  </p>
                  <p className="text-[10px] text-[#5A6E85]">Accepted Ans</p>
                </div>
              </div>
            </div>

            {/* Topic Spaces Navigation */}
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B8CA3] flex items-center gap-1.5">
                  <Layers size={14} className="text-[#B8955A]" />
                  Topic Spaces
                </h3>
                <Link
                  href="/community/spaces"
                  className="text-[11px] font-medium text-[#B8955A] hover:underline"
                >
                  Browse All
                </Link>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setSelectedSpaceSlug('all')}
                  className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition ${
                    selectedSpaceSlug === 'all'
                      ? 'bg-[#0F1B2D] text-white font-semibold'
                      : 'text-[#0F1B2D] hover:bg-[#FAF8F4]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className={selectedSpaceSlug === 'all' ? 'text-[#B8955A]' : 'text-[#7B8CA3]'} />
                    <span>All Open Feeds</span>
                  </div>
                  <span className={`text-[10px] rounded-full px-1.5 py-0.5 ${selectedSpaceSlug === 'all' ? 'bg-white/20 text-white' : 'text-[#7B8CA3]'}`}>
                    {posts.length}
                  </span>
                </button>

                {spaces
                  .filter((s) => s.categoryKey === 'open')
                  .map((space) => {
                    const isSelected = selectedSpaceSlug === space.slug;
                    return (
                      <button
                        key={space.id}
                        onClick={() => setSelectedSpaceSlug(space.slug)}
                        className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition ${
                          isSelected
                            ? 'bg-[#0F1B2D] text-white font-semibold'
                            : 'text-[#5A6E85] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                        }`}
                      >
                        <span className="truncate"># {space.name}</span>
                        {space.isJoined && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#B8955A]" />
                        )}
                      </button>
                    );
                  })}
              </div>

              {/* Role Lounges Section */}
              <div className="mt-5 border-t border-[#F2EFE9] pt-4">
                <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#7B8CA3] flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#B8955A]" />
                  Role Lounges
                </h3>
                <div className="space-y-1">
                  {spaces
                    .filter((s) => s.categoryKey === 'lounge')
                    .map((lounge) => {
                      const hasAccess = canAccessSpace(lounge);
                      const isSelected = selectedSpaceSlug === lounge.slug;

                      return (
                        <button
                          key={lounge.id}
                          onClick={() => {
                            if (hasAccess) {
                              setSelectedSpaceSlug(lounge.slug);
                            } else {
                              showToast(`Locked: ${lounge.audience}. Switch role to view.`);
                            }
                          }}
                          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition ${
                            isSelected
                              ? 'bg-[#0F1B2D] text-white font-semibold'
                              : hasAccess
                              ? 'text-[#0F1B2D] hover:bg-[#FAF8F4]'
                              : 'text-[#A0AEC0] hover:bg-red-50/50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {!hasAccess && <Lock size={12} className="shrink-0 text-[#A0AEC0]" />}
                            <span className="truncate">{lounge.name}</span>
                          </div>
                          <span
                            className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                              hasAccess
                                ? 'bg-emerald-50 text-emerald-800'
                                : 'bg-[#F2EFE9] text-[#7B8CA3]'
                            }`}
                          >
                            {hasAccess ? 'Unlocked' : 'Locked'}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Platform Rules Card */}
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs text-[#5A6E85]">
              <div className="flex items-center gap-1.5 font-bold text-[#0F1B2D] mb-1.5">
                <BookOpen size={14} className="text-[#B8955A]" />
                <span>Community Code</span>
              </div>
              <p className="text-[11px] leading-relaxed mb-2.5">
                Zero tolerance for unsolicited fundraising pitches, fee fraud, or PII harvesting.
              </p>
              <Link
                href="/community/guidelines"
                className="text-[11px] font-semibold text-[#B8955A] hover:underline flex items-center gap-1"
              >
                Read platform guidelines <ChevronRight size={12} />
              </Link>
            </div>
          </aside>

          {/* MIDDLE COLUMN: Feed, Compose prompt, Tabs, Posts (6 cols) */}
          <section className="lg:col-span-6 space-y-4">
            {/* Quick Compose Prompt */}
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F1B2D] font-serif font-bold text-white text-xs">
                  {activePersona.avatar}
                </div>
                <button
                  onClick={() => setComposeOpen(true)}
                  className="flex-1 rounded-full border border-[#E5E1D8] bg-[#FAF8F4] px-4 py-2 text-left text-xs text-[#7B8CA3] hover:border-[#0F1B2D] hover:bg-white transition"
                >
                  Ask a question, share a milestone, or start a discussion...
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#F2EFE9] pt-2.5 text-xs text-[#5A6E85]">
                <button
                  onClick={() => setComposeOpen(true)}
                  className="flex items-center gap-1.5 hover:text-[#0F1B2D] transition py-1"
                >
                  <HelpCircle size={14} className="text-amber-600" />
                  <span>Ask Question</span>
                </button>
                <button
                  onClick={() => setComposeOpen(true)}
                  className="flex items-center gap-1.5 hover:text-[#0F1B2D] transition py-1"
                >
                  <Sparkles size={14} className="text-purple-600" />
                  <span>Share Milestone</span>
                </button>
                <button
                  onClick={() => setComposeOpen(true)}
                  className="flex items-center gap-1.5 hover:text-[#0F1B2D] transition py-1"
                >
                  <UserPlus size={14} className="text-blue-600" />
                  <span>Looking For</span>
                </button>
                <button
                  onClick={() => setComposeOpen(true)}
                  className="flex items-center gap-1.5 hover:text-[#0F1B2D] transition py-1"
                >
                  <BookOpen size={14} className="text-emerald-600" />
                  <span>Post Resource</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs & Type Selector */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E1D8] pb-1 text-xs">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { id: 'for-you', label: 'For You' },
                  { id: 'following', label: 'Following Spaces' },
                  { id: 'unanswered', label: 'Unanswered Q&A' },
                  { id: 'top', label: 'Top This Week' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 font-semibold transition border-b-2 ${
                      activeTab === tab.id
                        ? 'border-[#B8955A] text-[#0F1B2D]'
                        : 'border-transparent text-[#7B8CA3] hover:text-[#0F1B2D]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Post Type Dropdown Filter */}
              <div className="flex items-center gap-1">
                <select
                  value={postTypeFilter}
                  onChange={(e) => setPostTypeFilter(e.target.value)}
                  className="rounded-lg border border-[#E5E1D8] bg-white px-2.5 py-1 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="Question">Questions</option>
                  <option value="Discussion">Discussions</option>
                  <option value="Resource">Resources</option>
                  <option value="Milestone">Milestones</option>
                  <option value="Looking for">Looking for</option>
                  <option value="Poll">Polls</option>
                  <option value="AMA">AMAs</option>
                </select>
              </div>
            </div>

            {/* Active Space Indicator Banner */}
            {selectedSpaceSlug !== 'all' && (
              <div className="flex items-center justify-between rounded-lg bg-white border border-[#E5E1D8] p-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0F1B2D]">
                    #{spaces.find((s) => s.slug === selectedSpaceSlug)?.name}
                  </span>
                  <span className="text-[#5A6E85]">
                    • {filteredPosts.length} posts
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSpaceSlug('all')}
                  className="text-xs font-semibold text-[#B8955A] hover:underline"
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* Feed List */}
            {filteredPosts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#E5E1D8] bg-white p-12 text-center">
                <MessageSquare size={32} className="mx-auto text-[#7B8CA3] mb-3" />
                <h4 className="font-bold text-[#0F1B2D]">No posts found in this view</h4>
                <p className="mt-1 text-xs text-[#5A6E85]">
                  Be the first to start a conversation or ask a question in this space.
                </p>
                <button
                  onClick={() => setComposeOpen(true)}
                  className="mt-4 rounded-lg bg-[#0F1B2D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                >
                  Create First Post
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm transition hover:border-[#D6D0C4]"
                  >
                    {/* Post Top Bar: Author, Space, Type Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0F1B2D] font-serif font-bold text-white text-xs">
                          {post.author.avatar || 'U'}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-bold text-[#0F1B2D]">
                              {post.author.name}
                            </span>
                            {post.author.verified && (
                              <CheckCircle2 size={13} className="text-[#B8955A]" />
                            )}
                            <span className="rounded bg-[#FAF8F4] px-1.5 py-0.2 text-[10px] text-[#5A6E85] font-medium border border-[#E5E1D8]">
                              {post.author.role}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-[#7B8CA3]">
                            <span>{post.author.organization}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                            <span>•</span>
                            <span className="font-medium text-[#B8955A]">#{post.spaceName}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-[#FAF8F4] px-2.5 py-0.5 text-[10px] font-semibold text-[#0F1B2D] border border-[#E5E1D8]">
                          {post.type}
                        </span>
                        {post.stageBadge && (
                          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
                            {post.stageBadge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Post Title & Content */}
                    <div className="mt-3">
                      <h2
                        onClick={() => setSelectedPostThread(post)}
                        className="cursor-pointer font-serif text-base font-bold text-[#0F1B2D] hover:text-[#B8955A] transition"
                      >
                        {post.title}
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-[#4A5568] line-clamp-3">
                        {post.content}
                      </p>
                    </div>

                    {/* POLL WIDGET (If type === 'Poll') */}
                    {post.pollData && (
                      <div className="mt-4 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-3.5 text-xs">
                        <div className="mb-2.5 flex items-center justify-between text-[11px] text-[#7B8CA3]">
                          <span className="font-semibold text-[#0F1B2D] flex items-center gap-1">
                            <Vote size={13} className="text-[#B8955A]" />
                            {post.pollData.question}
                          </span>
                          <span>{post.pollData.totalVotes} votes cast</span>
                        </div>
                        <div className="space-y-2">
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
                                onClick={() => handlePollVote(post.id, option.id)}
                                className={`relative w-full overflow-hidden rounded-md border p-2 text-left text-xs transition ${
                                  hasVoted
                                    ? 'border-[#B8955A] bg-amber-50/50'
                                    : 'border-[#E5E1D8] bg-white hover:border-[#0F1B2D]'
                                }`}
                              >
                                {/* Percentage bar background */}
                                <div
                                  className="absolute inset-y-0 left-0 bg-[#B8955A]/15 transition-all"
                                  style={{ width: `${pct}%` }}
                                />
                                <div className="relative flex items-center justify-between">
                                  <span className="font-medium text-[#0F1B2D]">
                                    {option.text} {hasVoted && '✓'}
                                  </span>
                                  <span className="text-[11px] font-bold text-[#0F1B2D]">
                                    {pct}% ({option.votes})
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ACCEPTED ANSWER HIGHLIGHT CARD (StackOverflow Style) */}
                    {post.acceptedAnswer && (
                      <div className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50/40 p-3.5 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                            <CheckCircle2 size={16} className="text-emerald-700" />
                            <span>Accepted Answer</span>
                          </div>
                          {post.acceptedAnswer.isExpert && (
                            <span className="flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                              <Award size={12} />
                              Expert Answer • {post.acceptedAnswer.expertBadge}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#2D3748] line-clamp-2">
                          {post.acceptedAnswer.preview}
                        </p>
                        <button
                          onClick={() => setSelectedPostThread(post)}
                          className="mt-2 text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-1"
                        >
                          View complete verified solution ({post.acceptedAnswer.upvotes} helpful votes) <ChevronRight size={12} />
                        </button>
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-[#FAF8F4] px-2 py-0.5 text-[10px] font-medium text-[#5A6E85] border border-[#E5E1D8]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Post Footer Action Bar */}
                    <div className="mt-4 flex items-center justify-between border-t border-[#F2EFE9] pt-3 text-xs text-[#5A6E85]">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpvotePost(post.id)}
                          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition ${
                            post.userUpvoted
                              ? 'bg-[#B8955A]/20 text-[#8C6D37]'
                              : 'hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                          }`}
                        >
                          <ThumbsUp size={14} className={post.userUpvoted ? 'fill-current' : ''} />
                          <span>Helpful ({post.helpfulVotes})</span>
                        </button>

                        <button
                          onClick={() => setSelectedPostThread(post)}
                          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 hover:bg-[#FAF8F4] hover:text-[#0F1B2D] transition"
                        >
                          <MessageCircle size={14} />
                          <span>{post.commentsCount} Answers</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleBookmark(post.id)}
                          title="Bookmark"
                          className={`rounded p-1.5 transition ${
                            post.userBookmarked
                              ? 'text-[#B8955A]'
                              : 'text-[#7B8CA3] hover:text-[#0F1B2D]'
                          }`}
                        >
                          <Bookmark size={15} className={post.userBookmarked ? 'fill-current' : ''} />
                        </button>

                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(window.location.origin + `/community/posts/${post.id}`);
                              showToast('Link copied to clipboard');
                            }
                          }}
                          title="Share"
                          className="rounded p-1.5 text-[#7B8CA3] hover:text-[#0F1B2D] transition"
                        >
                          <Share2 size={15} />
                        </button>

                        <button
                          onClick={() => setReportModalData(post)}
                          title="Report to Trust & Safety"
                          className="rounded p-1.5 text-[#7B8CA3] hover:text-red-600 transition"
                        >
                          <Flag size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* RIGHT COLUMN: Scheduled AMAs, Questions to help with, Suggested Spaces (3 cols) */}
          <aside className="lg:col-span-3 space-y-5">
            {/* Scheduled AMAs Card */}
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#B8955A]" />
                  Scheduled AMAs
                </h3>
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-700">
                  Live
                </span>
              </div>

              <div className="space-y-3">
                {UPCOMING_AMAS.map((ama) => (
                  <div
                    key={ama.id}
                    className="rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs space-y-1.5"
                  >
                    <p className="font-serif font-bold text-[#0F1B2D] leading-snug">
                      {ama.title}
                    </p>
                    <div className="text-[11px] text-[#5A6E85]">
                      <p className="font-semibold text-[#0F1B2D]">{ama.hostName}</p>
                      <p className="text-[#7B8CA3]">{ama.hostRole}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#E5E1D8] pt-2 text-[10px]">
                      <span className="text-[#5A6E85]">{ama.date}</span>
                      <button
                        onClick={() => showToast(`Reminder set for ${ama.title}`)}
                        className="rounded border border-[#0F1B2D] bg-white px-2 py-0.5 font-semibold text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-white transition"
                      >
                        Remind Me
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions to Help With (StackOverflow style matching) */}
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-[#B8955A]" />
                  Questions to Help With
                </h3>
                <span className="text-[10px] text-[#7B8CA3]">Expertise match</span>
              </div>

              <div className="space-y-2.5">
                {posts
                  .filter((p) => p.isUnanswered && p.type === 'Question')
                  .slice(0, 3)
                  .map((q) => (
                    <div
                      key={q.id}
                      onClick={() => setSelectedPostThread(q)}
                      className="cursor-pointer rounded-lg border border-[#F2EFE9] p-2.5 text-xs hover:border-[#B8955A] hover:bg-[#FAF8F4] transition"
                    >
                      <p className="font-medium text-[#0F1B2D] line-clamp-2 leading-snug">
                        {q.title}
                      </p>
                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#7B8CA3]">
                        <span>#{q.spaceName}</span>
                        <span className="font-semibold text-amber-700">Needs Answer</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Suggested Spaces to Join */}
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                Suggested Spaces for You
              </h3>
              <div className="space-y-2.5">
                {spaces
                  .filter((s) => !s.isJoined && s.categoryKey === 'open')
                  .slice(0, 3)
                  .map((space) => (
                    <div
                      key={space.id}
                      className="flex items-center justify-between text-xs rounded-lg border border-[#F2EFE9] p-2"
                    >
                      <div>
                        <p className="font-semibold text-[#0F1B2D]">#{space.name}</p>
                        <p className="text-[10px] text-[#7B8CA3]">{space.memberCount} members</p>
                      </div>
                      <button
                        onClick={() => handleToggleJoinSpace(space.id)}
                        className="rounded border border-[#0F1B2D] px-2.5 py-1 text-[11px] font-semibold text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-white transition"
                      >
                        Join
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MODAL 1: COMPOSE POST MODAL (With Live Policy Checks) */}
      {composeOpen && (
        <ComposePostModal
          activePersona={activePersona}
          spaces={spaces}
          onClose={() => setComposeOpen(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {/* MODAL 2: THREAD DETAILS DRAWER */}
      {selectedPostThread && (
        <PostThreadDrawer
          post={selectedPostThread}
          activePersona={activePersona}
          onClose={() => setSelectedPostThread(null)}
          onUpvotePost={handleUpvotePost}
          onAcceptAnswer={handleAcceptAnswer}
          onAddComment={handleAddComment}
          onOpenConnect={(user) => setConnectModalData(user)}
          onOpenReport={(post) => setReportModalData(post)}
        />
      )}

      {/* MODAL 3: CONNECT REQUEST MODAL */}
      {connectModalData && (
        <ConnectModal
          targetUser={connectModalData}
          activePersona={activePersona}
          onClose={() => setConnectModalData(null)}
          onSuccess={(note) => {
            showToast(`Connection request sent with personal note.`);
            setConnectModalData(null);
          }}
        />
      )}

      {/* MODAL 4: REPORT MODAL */}
      {reportModalData && (
        <ReportModal
          post={reportModalData}
          onClose={() => setReportModalData(null)}
          onSubmitReport={(reason, notes) => {
            showToast('Report submitted to Trust & Safety team.');
            setReportModalData(null);
          }}
        />
      )}
    </div>
  );

  // Return the appropriate Shell wrapper based on shellMode
  switch (shellMode) {
    case 'startup':
      return (
        <StartupShell
          active="Community"
          title="Community Discussion"
          description="Open knowledge sharing, peer founder support, and verified role lounges."
        >
          {communityContent}
        </StartupShell>
      );
    case 'mentor':
      return (
        <MentorShell
          active="Community"
          title="Mentor Advisory & Community"
          description="Answer founder roadblocks, host office hours & AMAs, and collaborate in Mentors Circle."
        >
          {communityContent}
        </MentorShell>
      );
    case 'investor':
      return (
        <InvestorShell
          active="Community"
          title="Investor Syndicate & Ecosystem"
          description="Connect with fellow angels, discuss due diligence frameworks, and review startup achievements."
        >
          {communityContent}
        </InvestorShell>
      );
    case 'employer':
      return (
        <EmployerShell
          active="Community"
          activeNav="Community"
        >
          {communityContent}
        </EmployerShell>
      );
    case 'jobseeker':
      return (
        <JobSeekerShell
          active="Community"
          title="Talent & Careers Hub"
          description="Peer interview practice, confidential offer reviews, salary transparency, and developer discussions."
        >
          {communityContent}
        </JobSeekerShell>
      );
    case 'admin':
      return (
        <AdminShell
          active="Community Forum"
          activeNav="Community Forum"
        >
          {communityContent}
        </AdminShell>
      );
    default:
      return communityContent;
  }
}

// -------------------------------------------------------------
// SUBCOMPONENT: COMPOSE POST MODAL WITH POLICY SCANNER
// -------------------------------------------------------------
function ComposePostModal({ activePersona, spaces, onClose, onSubmit }) {
  const [selectedSpaceId, setSelectedSpaceId] = useState(spaces[0].id);
  const [postType, setPostType] = useState('Question');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  // Real-time compliance issues
  const complianceIssues = useMemo(() => {
    return analyzePostCompliance(title, content);
  }, [title, content]);

  const hasCriticalIssue = complianceIssues.some((i) => i.type === 'critical');

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
                <option value="Feedback request">Feedback Request</option>
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
              placeholder="e.g. How should a B2B SaaS in India structure GST export invoices for Stripe?"
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
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide background context, what you have already attempted, and specific metrics where applicable..."
              className="w-full rounded-lg border border-[#E5E1D8] px-3.5 py-2.5 text-xs text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:outline-none"
            />
          </div>

          {/* Poll Options (If Poll is selected) */}
          {postType === 'Poll' && (
            <div className="space-y-2 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs">
              <span className="font-bold text-[#0F1B2D]">Poll Options</span>
              {pollOptions.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...pollOptions];
                    newOpts[i] = e.target.value;
                    setPollOptions(newOpts);
                  }}
                  className="w-full rounded border border-[#E5E1D8] bg-white px-2.5 py-1.5 text-xs text-[#0F1B2D]"
                />
              ))}
              {pollOptions.length < 4 && (
                <button
                  type="button"
                  onClick={() => setPollOptions([...pollOptions, ''])}
                  className="text-[11px] font-semibold text-[#B8955A] hover:underline"
                >
                  + Add option
                </button>
              )}
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
              placeholder="GST, SaaS, Invoicing, Taxes"
              className="w-full rounded-lg border border-[#E5E1D8] px-3 py-1.5 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
            />
          </div>

          {/* REAL-TIME COMPLIANCE CHECK ALERTS */}
          {complianceIssues.length > 0 && (
            <div className="space-y-2 rounded-xl border border-amber-300 bg-amber-50/60 p-3.5 text-xs text-amber-900">
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
              All posts subject to community trust standards.
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

// -------------------------------------------------------------
// SUBCOMPONENT: POST THREAD DRAWER (Full Q&A & Answers View)
// -------------------------------------------------------------
function PostThreadDrawer({
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

  const isAuthor = post.author.handle === activePersona.handle;

  const handlePostReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddComment(post.id, replyText);
    setReplyText('');
  };

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
          {/* Question Author & Title */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1B2D] font-serif font-bold text-white text-xs">
                  {post.author.avatar || 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0F1B2D]">
                      {post.author.name}
                    </span>
                    {post.author.verified && (
                      <CheckCircle2 size={13} className="text-[#B8955A]" />
                    )}
                    <span className="rounded bg-[#FAF8F4] px-1.5 text-[10px] text-[#5A6E85]">
                      {post.author.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7B8CA3]">{post.author.organization}</p>
                </div>
              </div>

              {activePersona.handle !== post.author.handle && (
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
              {post.content}
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between border-y border-[#F2EFE9] py-2.5 text-xs text-[#5A6E85]">
            <button
              onClick={() => onUpvotePost(post.id)}
              className="flex items-center gap-1.5 font-semibold text-[#0F1B2D] hover:text-[#B8955A]"
            >
              <ThumbsUp size={14} className={post.userUpvoted ? 'fill-current text-[#B8955A]' : ''} />
              Helpful ({post.helpfulVotes})
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenReport(post)}
                className="text-[#7B8CA3] hover:text-red-600 flex items-center gap-1"
              >
                <Flag size={13} /> Report
              </button>
            </div>
          </div>

          {/* Verified Accepted Answer Card if available */}
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
              <p className="text-xs leading-relaxed text-[#1E293B]">
                {post.acceptedAnswer.preview}
              </p>
            </div>
          )}

          {/* Answers & Discussion List */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B8CA3]">
              Answers & Insights ({post.comments?.length || 0})
            </h3>

            {(!post.comments || post.comments.length === 0) ? (
              <p className="text-xs text-[#7B8CA3] italic">
                No answers yet. Share your experience or playbook below!
              </p>
            ) : (
              post.comments.map((comm) => {
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
                          {comm.author.avatar || 'U'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#0F1B2D]">{comm.author.name}</span>
                            {comm.isExpertAnswer && (
                              <span className="flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.2 text-[9px] font-bold text-[#8C6D37] border border-amber-200">
                                <Award size={10} /> Expert
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#7B8CA3]">{comm.timestamp}</span>
                        </div>
                      </div>

                      {/* Accept Answer CTA (only shown to question author) */}
                      {isAuthor && !isAccepted && (
                        <button
                          onClick={() => onAcceptAnswer(post.id, comm.id)}
                          className="flex items-center gap-1 rounded border border-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 hover:bg-emerald-50"
                        >
                          <Check size={11} /> Mark as Accepted
                        </button>
                      )}
                      {isAccepted && (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          <CheckCircle2 size={12} /> Accepted Solution
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#334155] whitespace-pre-line">
                      {comm.content}
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
              placeholder={`Answer as ${activePersona.name}...`}
              className="flex-1 rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1C2B42] transition"
            >
              <Send size={13} />
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SUBCOMPONENT: SAFE PEER CONNECT REQUEST MODAL
// -------------------------------------------------------------
function ConnectModal({ targetUser, activePersona, onClose, onSuccess }) {
  const [note, setNote] = useState('');

  const isColdPitchToInvestor =
    activePersona.roleKey === 'startup' && targetUser.role?.includes('Investor');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
          <h3 className="font-serif text-base font-bold text-[#0F1B2D]">
            Connect with {targetUser.name}
          </h3>
          <button onClick={onClose} className="text-[#7B8CA3] hover:text-[#0F1B2D]">
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs text-[#5A6E85]">
          <p>
            To keep platform networking respectful and spam-free, please provide a short note
            explaining why you would like to connect.
          </p>

          {isColdPitchToInvestor && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-2.5 text-[11px] text-amber-900">
              <p className="font-bold">Investor Outreach Notice:</p>
              <p className="mt-0.5">
                Accredited investors in the Community review questions and advice. Formal pitch decks
                should be submitted through the official <strong>Discover & Deals</strong> pipeline.
              </p>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
              Personalized Note (Required, max 300 chars)
            </label>
            <textarea
              required
              maxLength={300}
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Hi, I saw your insights on GST export structuring and would love to connect..."
              className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
            />
            <p className="text-right text-[10px] text-[#7B8CA3]">{note.length} / 300</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2 border-t border-[#F2EFE9] pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#E5E1D8] px-3.5 py-1.5 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4]"
          >
            Cancel
          </button>
          <button
            disabled={!note.trim()}
            onClick={() => onSuccess(note)}
            className="rounded-lg bg-[#0F1B2D] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1C2B42] disabled:opacity-40"
          >
            Send Connect Request
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SUBCOMPONENT: TRUST & SAFETY REPORT MODAL
// -------------------------------------------------------------
function ReportModal({ post, onClose, onSubmitReport }) {
  const [reason, setReason] = useState('UNSOLICITED_FUNDRAISING');
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
          <h3 className="font-serif text-base font-bold text-red-900 flex items-center gap-1.5">
            <Flag size={16} className="text-red-600" />
            Report to Trust & Safety
          </h3>
          <button onClick={onClose} className="text-[#7B8CA3] hover:text-[#0F1B2D]">
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
              Violation Category
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-[#E5E1D8] bg-white p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
            >
              <option value="UNSOLICITED_FUNDRAISING">Unsolicited Securities Pitch / Fundraising</option>
              <option value="PII_HARVESTING">Sharing Personal Phone/PAN/Aadhaar/UPI PII</option>
              <option value="UPFRONT_FEE_SCAM">Job/Interview Upfront Fee Solicitation</option>
              <option value="SPAM_COMMERCIAL">Commercial Spam / Unaffiliated Affiliate Links</option>
              <option value="HARASSMENT_ABUSE">Harassment or Abusive Conduct</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
              Additional Details for Moderators
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe why this post violates community standards..."
              className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2 border-t border-[#F2EFE9] pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#E5E1D8] px-3.5 py-1.5 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4]"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmitReport(reason, notes)}
            className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-red-700"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}

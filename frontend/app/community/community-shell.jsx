'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ShieldCheck,
  Sliders,
  Globe,
} from 'lucide-react';
import CommunityHeader from './components/community-header';
import CommunitySidebar from './components/community-sidebar';
import CommunityFeed from './components/community-feed';
import CommunityRightRail from './components/community-right-rail';
import ComposeModal from './components/compose-modal';
import ThreadDrawer from './components/thread-drawer';
import ConnectModal from './components/connect-modal';
import ReportModal from './components/report-modal';
import {
  ROLE_COMMUNITY_CONFIG,
  COMMUNITY_SPACES,
  INITIAL_POSTS,
  getPersonaForRole,
  loadCommunityPosts,
  saveCommunityPosts,
  loadCommunitySpaces,
  saveCommunitySpaces,
  loadCommunityRsvps,
  saveCommunityRsvps,
  normalizePost,
} from './community-data';

import {
  StartupShell,
  MentorShell,
  InvestorShell,
  EmployerShell,
  JobSeekerShell,
  AdminShell,
} from '@/components';

export default function CommunityShell({
  role = 'startup',
  shellMode = 'none', // 'none' | 'startup' | 'mentor' | 'investor' | 'employer' | 'jobseeker' | 'admin'
}) {
  const roleConfig = ROLE_COMMUNITY_CONFIG[role] || ROLE_COMMUNITY_CONFIG.startup;

  // Active Persona State
  const [activePersona, setActivePersona] = useState(() => getPersonaForRole(role));

  // Posts, Spaces & RSVPs - initialized deterministically to match SSR
  const [posts, setPosts] = useState(() => INITIAL_POSTS.map(normalizePost));
  const [spaces, setSpaces] = useState(() => COMMUNITY_SPACES);
  const [rsvpedAmas, setRsvpedAmas] = useState({});

  useEffect(() => {
    setPosts(loadCommunityPosts());
    setSpaces(loadCommunitySpaces());
    setRsvpedAmas(loadCommunityRsvps());
  }, []);

  // Filter States
  const [selectedSpaceSlug, setSelectedSpaceSlug] = useState('all');
  const [activeTab, setActiveTab] = useState('for-you'); // 'for-you' | 'following' | 'unanswered' | 'top' | 'reported'
  const [postTypeFilter, setPostTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeInitialType, setComposeInitialType] = useState('Question');
  const [selectedThread, setSelectedThread] = useState(null);
  const [connectUser, setConnectUser] = useState(null);
  const [reportPost, setReportPost] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const openComposeWithType = (type = 'Question') => {
    setComposeInitialType(type);
    setComposeOpen(true);
  };

  // Upvote Post Handler
  const handleUpvote = (postId) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== postId) return p;
        const alreadyUpvoted = p.userUpvoted;
        const newHelpfulVotes = alreadyUpvoted ? Math.max(0, p.helpfulVotes - 1) : p.helpfulVotes + 1;
        return {
          ...p,
          helpfulVotes: newHelpfulVotes,
          helpfulCount: newHelpfulVotes,
          userUpvoted: !alreadyUpvoted,
          isHelpfulByMe: !alreadyUpvoted,
        };
      });
      saveCommunityPosts(updated);
      return updated;
    });

    if (selectedThread && selectedThread.id === postId) {
      setSelectedThread((prev) => {
        const alreadyUpvoted = prev.userUpvoted;
        const newHelpfulVotes = alreadyUpvoted ? Math.max(0, prev.helpfulVotes - 1) : prev.helpfulVotes + 1;
        return {
          ...prev,
          helpfulVotes: newHelpfulVotes,
          helpfulCount: newHelpfulVotes,
          userUpvoted: !alreadyUpvoted,
          isHelpfulByMe: !alreadyUpvoted,
        };
      });
    }

    showToast('Vote recorded');
  };

  // Toggle Bookmark Handler
  const handleToggleBookmark = (postId) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== postId) return p;
        const newStatus = !p.userBookmarked;
        return {
          ...p,
          userBookmarked: newStatus,
          isSavedByMe: newStatus,
        };
      });
      saveCommunityPosts(updated);
      return updated;
    });
    showToast('Bookmark updated');
  };

  // Poll Vote Handler
  const handlePollVote = (postId, optionId) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
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
      });
      saveCommunityPosts(updated);
      return updated;
    });
    showToast('Your poll vote has been counted');
  };

  // Accept Answer Handler
  const handleAcceptAnswer = (postId, answerId) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== postId) return p;
        const targetComment = (p.comments || []).find((c) => c.id === answerId);
        const isRemoving = p.acceptedAnswerId === answerId;
        const updatedAcceptedId = isRemoving ? null : answerId;
        const updatedAccepted = isRemoving
          ? null
          : targetComment
          ? {
              authorName: targetComment.author.name,
              authorRole: targetComment.author.role,
              preview: targetComment.content || targetComment.body,
              isExpert: targetComment.isExpertAnswer,
              expertBadge: targetComment.expertBadge || 'Verified Solution',
              upvotes: targetComment.helpfulVotes || 12,
            }
          : p.acceptedAnswer;

        return {
          ...p,
          acceptedAnswerId: updatedAcceptedId,
          hasAcceptedAnswer: Boolean(updatedAcceptedId),
          acceptedAnswer: updatedAccepted,
          comments: (p.comments || []).map((c) => ({
            ...c,
            isAccepted: c.id === updatedAcceptedId,
          })),
        };
      });
      saveCommunityPosts(updated);
      return updated;
    });

    if (selectedThread && selectedThread.id === postId) {
      setSelectedThread((prev) => {
        const isRemoving = prev.acceptedAnswerId === answerId;
        const updatedAcceptedId = isRemoving ? null : answerId;
        return {
          ...prev,
          acceptedAnswerId: updatedAcceptedId,
          hasAcceptedAnswer: Boolean(updatedAcceptedId),
          comments: (prev.comments || []).map((c) => ({
            ...c,
            isAccepted: c.id === updatedAcceptedId,
          })),
        };
      });
    }

    showToast('Accepted solution updated');
  };

  // Add Comment/Reply Handler
  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: `comm_${Date.now()}`,
      author: {
        id: activePersona.id,
        name: activePersona.name,
        handle: activePersona.handle,
        role: activePersona.role,
        roleKey: activePersona.roleKey,
        avatar: activePersona.avatar,
        verified: activePersona.verified,
        organization: activePersona.organization,
        expertLabel: activePersona.roleKey === 'mentor' ? 'Verified Mentor' : null,
      },
      content: text,
      body: text,
      timestamp: 'Just now',
      createdAt: 'Just now',
      helpfulVotes: 0,
      helpfulCount: 0,
      userUpvoted: false,
      isUpvotedByMe: false,
      isAccepted: false,
      isExpertAnswer: activePersona.roleKey === 'mentor',
      expertBadge: activePersona.roleKey === 'mentor' ? 'Verified Mentor' : null,
      replies: [],
    };

    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== postId) return p;
        const updatedComments = [...(p.comments || []), newComment];
        return {
          ...p,
          commentsCount: updatedComments.length,
          comments: updatedComments,
          answers: updatedComments,
          isUnanswered: false,
        };
      });
      saveCommunityPosts(updated);
      return updated;
    });

    if (selectedThread && selectedThread.id === postId) {
      setSelectedThread((prev) => {
        const updatedComments = [...(prev.comments || []), newComment];
        return {
          ...prev,
          commentsCount: updatedComments.length,
          comments: updatedComments,
          answers: updatedComments,
          isUnanswered: false,
        };
      });
    }

    showToast('Your answer has been published');
  };

  // Create Post Handler
  const handleCreatePost = (newPostData) => {
    const spaceObj = spaces.find((s) => s.id === newPostData.spaceId) || spaces[0];
    const created = normalizePost({
      id: `post_${Date.now()}`,
      spaceId: spaceObj.id,
      spaceSlug: spaceObj.slug,
      spaceName: spaceObj.name,
      type: newPostData.type,
      title: newPostData.title,
      content: newPostData.content,
      body: newPostData.content,
      tags: newPostData.tags || [],
      author: {
        id: activePersona.id,
        name: activePersona.name,
        handle: activePersona.handle,
        role: activePersona.role,
        roleKey: activePersona.roleKey,
        organization: activePersona.organization,
        avatar: activePersona.avatar,
        verified: activePersona.verified,
      },
      timestamp: 'Just now',
      createdAt: 'Just now',
      helpfulVotes: 0,
      helpfulCount: 0,
      userUpvoted: false,
      isHelpfulByMe: false,
      userBookmarked: false,
      isSavedByMe: false,
      commentsCount: 0,
      isUnanswered: newPostData.type === 'Question',
      comments: [],
      answers: [],
      pollData: newPostData.pollData || null,
      acceptedAnswer: null,
      acceptedAnswerId: null,
      isFlagged: false,
      isRemoved: false,
    });

    setPosts((prev) => {
      const updated = [created, ...prev];
      saveCommunityPosts(updated);
      return updated;
    });

    setComposeOpen(false);
    showToast(`Post published to #${created.spaceName}`);
  };

  // Toggle Space Join Handler
  const handleToggleJoinSpace = (spaceId) => {
    setSpaces((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== spaceId) return s;
        const nowJoined = !s.isJoined;
        return {
          ...s,
          isJoined: nowJoined,
          memberCount: nowJoined ? s.memberCount + 1 : s.memberCount - 1,
        };
      });
      saveCommunitySpaces(updated);
      return updated;
    });
    showToast('Space preferences updated');
  };

  // Toggle AMA RSVP Handler
  const handleToggleRsvp = (ama) => {
    const isCurrentlyRsvped = Boolean(rsvpedAmas[ama.id]);
    const updated = { ...rsvpedAmas, [ama.id]: !isCurrentlyRsvped };
    setRsvpedAmas(updated);
    saveCommunityRsvps(updated);
    if (!isCurrentlyRsvped) {
      showToast(`RSVP confirmed for "${ama.title}"!`);
    } else {
      showToast(`RSVP cancelled for "${ama.title}".`);
    }
  };

  // Report Post Handler
  const handleReportPost = (postId, reason, notes) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          isFlagged: true,
          reportReason: reason,
          reportNotes: notes,
          reportedBy: activePersona.name,
          reportedAt: 'Just now',
        };
      });
      saveCommunityPosts(updated);
      return updated;
    });
    setReportPost(null);
    showToast('Report submitted. Flagged for Trust & Safety review.');
  };

  // Admin: Dismiss Flag Handler
  const handleDismissFlag = (postId) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          isFlagged: false,
          reportReason: null,
          reportNotes: null,
          reportedBy: null,
          reportedAt: null,
        };
      });
      saveCommunityPosts(updated);
      return updated;
    });
    showToast('Flag dismissed. Post cleared.');
  };

  // Admin: Remove Violating Post Handler
  const handleRemovePost = (postId, reason = 'Violates community guidelines') => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          isRemoved: true,
          removedReason: reason,
          removedBy: activePersona.name,
        };
      });
      saveCommunityPosts(updated);
      return updated;
    });
    showToast('Post removed from community feed by Admin.');
  };

  // Role-Aware Questions to Help With (Smart Tag Match)
  const roleHelpQuestions = useMemo(() => {
    const unanswered = posts.filter(
      (p) => !p.isRemoved && p.isUnanswered && p.type === 'Question'
    );
    if (!activePersona || !activePersona.roleKey) return unanswered.slice(0, 3);

    const roleKeywords = {
      mentor: ['architecture', 'tech', 'nextjs', 'websockets', 'performance', 'distributed', 'scaling', 'engineering'],
      investor: ['safe', 'fundraising', 'valuation', 'equity', 'cap table', 'investor', 'due-diligence'],
      startup: ['gst', 'finance', 'export', 'taxes', 'stripe', 'invoicing', 'banking', 'incorporation'],
      employer: ['hiring', 'salary', 'esop', 'compensation', 'talent', 'offer', 'equity'],
      jobseeker: ['interview', 'frontend', 'resume', 'career', 'offer', 'portfolio', 'salary'],
      admin: ['compliance', 'rules', 'trust', 'safety', 'dispute'],
    };

    const keywords = roleKeywords[activePersona.roleKey] || [];
    const matched = unanswered.filter((p) => {
      const text = `${p.title} ${p.content || p.body} ${(p.tags || []).join(' ')}`.toLowerCase();
      return keywords.some((kw) => text.includes(kw));
    });

    return (matched.length > 0 ? matched : unanswered).slice(0, 3);
  }, [posts, activePersona]);

  // Filtered Posts Logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Admin Flagged Queue Tab
      if (activeTab === 'reported') {
        return post.isFlagged && !post.isRemoved;
      }

      // Hide removed posts in all normal views
      if (post.isRemoved) return false;

      // Space filter (checks both id and slug)
      if (selectedSpaceSlug !== 'all') {
        const targetSpace = spaces.find((s) => s.slug === selectedSpaceSlug);
        if (targetSpace && post.spaceId !== targetSpace.id && post.spaceSlug !== targetSpace.slug) {
          return false;
        }
      }

      // Tab filter
      if (activeTab === 'unanswered') {
        if (post.type !== 'Question' || !post.isUnanswered) return false;
      } else if (activeTab === 'following') {
        const space = spaces.find((s) => s.id === post.spaceId || s.slug === post.spaceSlug);
        if (!space || !space.isJoined) return false;
      } else if (activeTab === 'top') {
        const votes = post.helpfulVotes ?? post.helpfulCount ?? 0;
        if (votes < 15) return false;
      }

      // Post Type filter
      if (postTypeFilter !== 'all' && post.type !== postTypeFilter) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = (post.title || '').toLowerCase().includes(q);
        const matchesContent = (post.content || post.body || '').toLowerCase().includes(q);
        const matchesAuthor = (post.author?.name || '').toLowerCase().includes(q);
        const matchesTags = (post.tags || []).some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesContent && !matchesAuthor && !matchesTags) return false;
      }

      return true;
    });
  }, [posts, spaces, selectedSpaceSlug, activeTab, postTypeFilter, searchQuery]);

  const flaggedCount = useMemo(() => {
    return posts.filter((p) => p.isFlagged && !p.isRemoved).length;
  }, [posts]);

  // Main UI Content
  const communityContent = (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg border border-[#0F1B2D] bg-[#0F1B2D] px-4 py-3 text-xs font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-[#B8955A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Standalone Header (rendered when not wrapped in another shell) */}
      {shellMode === 'none' && (
        <CommunityHeader
          activePersona={activePersona}
          onSelectPersona={setActivePersona}
          onOpenCompose={openComposeWithType}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {/* Main 3-Column Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Role Mission Banner */}
        <div className="mb-6 rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-bold text-[#0F1B2D] sm:text-xl">
                  {roleConfig.banner.title}
                </h1>
                {role === 'global' ? (
                  <span className="flex items-center gap-1 rounded-full bg-[#B8955A]/15 border border-[#B8955A]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#8C6D37]">
                    <Globe size={11} className="text-[#B8955A]" />
                    Global Hub
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    {activePersona.role} Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-[#5A6E85] sm:text-sm">
                {roleConfig.banner.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {role !== 'global' && (
                <Link
                  href="/community"
                  className="flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F1B2D] hover:border-[#0F1B2D] hover:bg-[#FAF8F4] transition shadow-xs"
                  title="Switch to Global Community Hub"
                >
                  <Globe size={14} className="text-[#B8955A]" />
                  <span>Global Hub</span>
                </Link>
              )}

              {role === 'admin' && (
                <Link
                  href="/admin/policies"
                  className="flex items-center gap-1.5 rounded-lg border border-[#B8955A] bg-[#B8955A]/10 px-3 py-1.5 text-xs font-semibold text-[#8C6D37] hover:bg-[#B8955A]/20 transition"
                >
                  <Sliders size={14} />
                  Content Policies
                </Link>
              )}
              <button
                onClick={() => openComposeWithType('Question')}
                className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-sm"
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT COLUMN: Sidebar (3 cols) */}
          <div className="lg:col-span-3">
            <CommunitySidebar
              activePersona={activePersona}
              spaces={spaces}
              selectedSpaceSlug={selectedSpaceSlug}
              onSelectSpace={setSelectedSpaceSlug}
              postsCount={posts.length}
              onShowToast={showToast}
              currentRole={role}
            />
          </div>

          {/* MIDDLE COLUMN: Feed (6 cols) */}
          <div className="lg:col-span-6">
            <CommunityFeed
              posts={filteredPosts}
              spaces={spaces}
              activePersona={activePersona}
              selectedSpaceSlug={selectedSpaceSlug}
              onClearSpaceFilter={() => setSelectedSpaceSlug('all')}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              postTypeFilter={postTypeFilter}
              onPostTypeFilterChange={setPostTypeFilter}
              onOpenComposeWithType={openComposeWithType}
              onOpenThread={setSelectedThread}
              onUpvote={handleUpvote}
              onToggleBookmark={handleToggleBookmark}
              onPollVote={handlePollVote}
              onOpenReport={setReportPost}
              onDismissFlag={handleDismissFlag}
              onRemovePost={handleRemovePost}
              onShowToast={showToast}
              flaggedCount={flaggedCount}
            />
          </div>

          {/* RIGHT COLUMN: Right Rail (3 cols) */}
          <div className="lg:col-span-3">
            <CommunityRightRail
              activePersona={activePersona}
              roleHelpQuestions={roleHelpQuestions}
              spaces={spaces}
              rsvpedAmas={rsvpedAmas}
              onToggleRsvp={handleToggleRsvp}
              onToggleJoinSpace={handleToggleJoinSpace}
              onOpenThread={setSelectedThread}
            />
          </div>
        </div>
      </main>

      {/* Compose Modal */}
      {composeOpen && (
        <ComposeModal
          activePersona={activePersona}
          spaces={spaces}
          initialPostType={composeInitialType}
          onClose={() => setComposeOpen(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {/* Thread Drawer */}
      {selectedThread && (
        <ThreadDrawer
          post={selectedThread}
          activePersona={activePersona}
          onClose={() => setSelectedThread(null)}
          onUpvotePost={handleUpvote}
          onAcceptAnswer={handleAcceptAnswer}
          onAddComment={handleAddComment}
          onOpenConnect={setConnectUser}
          onOpenReport={setReportPost}
        />
      )}

      {/* Connect Modal */}
      {connectUser && (
        <ConnectModal
          targetUser={connectUser}
          activePersona={activePersona}
          onClose={() => setConnectUser(null)}
          onSuccess={(note) => {
            showToast(`Connection request sent with personal note.`);
            setConnectUser(null);
          }}
        />
      )}

      {/* Report Modal */}
      {reportPost && (
        <ReportModal
          post={reportPost}
          onClose={() => setReportPost(null)}
          onSubmitReport={(reason, notes) => handleReportPost(reportPost.id, reason, notes)}
        />
      )}
    </div>
  );

  // Return wrapped in appropriate Shell based on shellMode
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
          activeNav="Community"
          title="Mentor Community"
          description="Answer startup roadblocks, share architecture playbooks, and host live AMAs."
        >
          {communityContent}
        </MentorShell>
      );
    case 'investor':
      return (
        <InvestorShell
          active="Community"
          title="Investor Community Forum"
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

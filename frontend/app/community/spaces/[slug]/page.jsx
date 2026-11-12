'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Users,
  Layers,
  PlusCircle,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Share2,
  Flag,
  Calendar,
  ChevronRight,
  Info,
} from 'lucide-react';
import CommunityHeader from '../../community-header';
import {
  COMMUNITY_PERSONAS,
  COMMUNITY_SPACES,
  INITIAL_POSTS,
} from '../../community-data';

export default function SingleSpacePage() {
  const params = useParams();
  const slug = params?.slug || 'ask-community';

  const [activePersona, setActivePersona] = useState(COMMUNITY_PERSONAS[0]);
  const [spaces, setSpaces] = useState(COMMUNITY_SPACES);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState('posts');
  const [toastMessage, setToastMessage] = useState('');

  const space = spaces.find((s) => s.slug === slug) || spaces[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2700);
  };

  const hasAccess = useMemo(() => {
    if (space.allowedRoles.includes('all')) return true;
    if (space.allowedRoles.includes(activePersona.roleKey)) return true;
    return false;
  }, [space, activePersona]);

  const spacePosts = useMemo(() => {
    return posts.filter((p) => p.spaceSlug === space.slug);
  }, [posts, space]);

  const handleToggleJoin = () => {
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.slug === space.slug) {
          const next = !s.isJoined;
          showToast(next ? `Joined #${s.name}` : `Left #${s.name}`);
          return {
            ...s,
            isJoined: next,
            memberCount: next ? s.memberCount + 1 : s.memberCount - 1,
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      {/* Toast */}
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

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link href="/community" className="hover:text-[#0F1B2D]">Community</Link>
          <span>/</span>
          <Link href="/community/spaces" className="hover:text-[#0F1B2D]">Spaces</Link>
          <span>/</span>
          <span className="font-semibold text-[#0F1B2D]">#{space.name}</span>
        </div>

        {/* Space Header Banner */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[10px] font-mono text-[#64748B]">
                  {space.category}
                </span>
                {space.categoryKey === 'lounge' && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.2 text-[9px] font-bold ${
                      hasAccess
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {hasAccess ? <CheckCircle2 size={10} /> : <Lock size={10} />}
                    <span>{hasAccess ? 'Access Granted' : 'Role Restricted'}</span>
                  </span>
                )}
              </div>
              <h1 className="font-serif text-2xl font-bold text-[#0F1B2D]">
                #{space.name}
              </h1>
              <p className="text-xs text-[#475569] mt-1 max-w-2xl leading-relaxed">
                {space.description}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleToggleJoin}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  space.isJoined
                    ? 'border border-[#E5E1D8] bg-[#FAF8F4] text-[#64748B] hover:bg-rose-50 hover:text-rose-600'
                    : 'bg-[#0F1B2D] text-white hover:bg-[#1C2B42]'
                }`}
              >
                {space.isJoined ? 'Joined Space' : 'Join Space'}
              </button>

              <Link
                href="/community"
                className="rounded-lg border border-[#E5E1D8] px-3.5 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
              >
                Back to Feed
              </Link>
            </div>
          </div>

          {/* Quick Meta Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E5E1D8] text-xs">
            <div>
              <span className="text-[10px] text-[#64748B] block uppercase">Audience</span>
              <span className="font-semibold text-[#0F1B2D] truncate block">{space.audience}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block uppercase">Members</span>
              <span className="font-semibold text-[#0F1B2D]">{space.memberCount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block uppercase">Answered Rate</span>
              <span className="font-semibold text-emerald-700">{space.answeredRate}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block uppercase">Anonymous Posting</span>
              <span className="font-semibold text-[#0F1B2D]">
                {space.anonymousAllowed ? 'Allowed' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Access Warning if Restricted */}
        {!hasAccess && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 flex items-start gap-3">
            <Lock size={18} className="text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Access Restricted to Verified {space.audience}</strong>
              <p className="mt-0.5 leading-relaxed">
                You are currently previewing as <strong>{activePersona.name} ({activePersona.role})</strong>. Switch your active persona in the top header to a permitted role to post or participate in this lounge.
              </p>
            </div>
          </div>
        )}

        {/* Space Tabs */}
        <div className="flex border-b border-[#E5E1D8] gap-4 text-xs">
          {[
            { key: 'posts', label: `Discussions & Q&A (${spacePosts.length})` },
            { key: 'rules', label: 'Space Rules & Principles' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2.5 font-semibold transition border-b-2 ${
                activeTab === tab.key
                  ? 'border-[#B8955A] text-[#0F1B2D]'
                  : 'border-transparent text-[#64748B] hover:text-[#0F1B2D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Posts Feed */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {spacePosts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-2xs hover:border-[#B8955A]/60 transition"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-[#0F1B2D]">{post.author.name}</span>
                    <span className="text-[#64748B] text-[10px]">({post.author.role})</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span className="text-[#64748B] text-[10px]">{post.createdAt}</span>
                  </div>
                  <span className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[10px] font-semibold text-[#0F1B2D]">
                    {post.type}
                  </span>
                </div>

                <Link href={`/community/posts/${post.id}`}>
                  <h3 className="font-serif text-base font-bold text-[#0F1B2D] hover:text-[#B8955A] transition">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#475569] mt-2 line-clamp-2 leading-relaxed">
                    {post.body}
                  </p>
                </Link>

                <div className="mt-3 pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-xs text-[#64748B]">
                  <span>{post.helpfulCount} helpful votes • {post.commentsCount} replies</span>
                  <Link
                    href={`/community/posts/${post.id}`}
                    className="font-bold text-[#0F1B2D] hover:text-[#B8955A] flex items-center gap-1"
                  >
                    <span>View Thread</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </article>
            ))}

            {spacePosts.length === 0 && (
              <div className="text-center py-10 rounded-xl border border-dashed border-[#E5E1D8] bg-white p-6">
                <p className="text-xs text-[#64748B]">No discussions posted in this space yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Rules */}
        {activeTab === 'rules' && (
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-5 space-y-4">
            <h3 className="font-serif text-base font-bold text-[#0F1B2D]">
              Rules for #{space.name}
            </h3>
            <ul className="space-y-2 text-xs text-[#475569]">
              {space.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8955A] mt-1.5 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-[#E5E1D8] text-[11px] text-[#64748B]">
              <strong>Allowed Post Types:</strong> {space.allowedPostTypes.join(', ')}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

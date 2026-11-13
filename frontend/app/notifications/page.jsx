'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Bell,
  Search,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  ArrowRight,
  ExternalLink,
  ArrowLeft,
  Calendar,
  DollarSign,
  MessageSquare,
  ShieldAlert,
  AlertTriangle,
  Briefcase,
  UserCheck,
  Award,
  Sparkles,
  TrendingUp,
  Users,
  FileText,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import {
  INITIAL_NOTIFICATIONS,
  NOTIFICATION_ROLES,
  loadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
  NOTIFICATIONS_UPDATED_EVENT,
} from '@/lib/notifications-data';

const ICON_MAP = {
  DollarSign,
  Calendar,
  MessageSquare,
  ShieldAlert,
  AlertTriangle,
  Briefcase,
  UserCheck,
  Award,
  Sparkles,
  TrendingUp,
  Users,
  FileText,
  CheckCircle2,
};

function NotificationsContent() {
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get('role') || 'all';

  const [activeRole, setActiveRole] = useState(initialRoleParam);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [items, setItems] = useState(() => INITIAL_NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState('');

  // Sync role if query param changes
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam && NOTIFICATION_ROLES.some((r) => r.id === roleParam)) {
      setActiveRole(roleParam);
    }
  }, [searchParams]);

  // Load from localStorage on mount & listen for changes
  useEffect(() => {
    setItems(loadNotifications());

    const handleUpdate = (e) => {
      if (e?.detail) {
        setItems(e.detail);
      } else {
        setItems(loadNotifications());
      }
    };

    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2600);
  };

  // Filtered list
  const filteredItems = useMemo(() => {
    return items.filter((n) => {
      // Role filter
      if (activeRole !== 'all' && n.role !== activeRole && n.role !== 'all') {
        return false;
      }
      // Unread only toggle
      if (unreadOnly && !n.unread) {
        return false;
      }
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'actions' && !n.urgent) return false;
        if (activeCategory !== 'actions' && n.category !== activeCategory) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = n.title.toLowerCase().includes(query);
        const matchesDetail = n.detail.toLowerCase().includes(query);
        const matchesCategory = n.category?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDetail && !matchesCategory) return false;
      }
      return true;
    });
  }, [items, activeRole, activeCategory, unreadOnly, searchQuery]);

  // Role-wise counts
  const roleCounts = useMemo(() => {
    const counts = {};
    NOTIFICATION_ROLES.forEach((r) => {
      if (r.id === 'all') {
        counts[r.id] = items.filter((n) => n.unread).length;
      } else {
        counts[r.id] = items.filter((n) => n.unread && (n.role === r.id || n.role === 'all')).length;
      }
    });
    return counts;
  }, [items]);

  const handleMarkItemRead = (id) => {
    markNotificationAsRead(id);
    showToast('Marked as read');
  };

  const handleDeleteItem = (id) => {
    deleteNotification(id);
    showToast('Notification dismissed');
  };

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead(activeRole);
    showToast(`Marked all ${activeRole === 'all' ? '' : activeRole} notifications as read`);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear these notifications?')) {
      clearAllNotifications(activeRole);
      showToast('Notifications cleared');
    }
  };

  // Portal dashboard link helper
  const roleDashboardLink = useMemo(() => {
    const map = {
      startup: '/startup/dashboard',
      mentor: '/mentor/dashboard',
      investor: '/investor/dashboard',
      employer: '/employer/dashboard',
      jobseeker: '/jobseeker/dashboard',
      admin: '/admin/dashboard',
    };
    return map[activeRole] || '/';
  }, [activeRole]);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-[#0F1B2D] bg-[#0F1B2D] px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-[#B8955A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Top Breadcrumb & Back Link */}
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-5">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#0F1B2D] transition">Home</Link>
            <span>/</span>
            <span className="font-bold text-[#0F1B2D]">Notifications</span>
          </div>

          {activeRole !== 'all' && (
            <Link
              href={roleDashboardLink}
              className="inline-flex items-center gap-1.5 font-semibold text-[#0F1B2D] hover:text-[#B8955A] transition"
            >
              <ArrowLeft size={13} />
              <span>Back to {NOTIFICATION_ROLES.find((r) => r.id === activeRole)?.label || 'Dashboard'}</span>
            </Link>
          )}
        </div>

        {/* Master Header Card */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 sm:p-7 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F1B2D] text-white shadow-xs">
                  <Bell size={20} className="text-[#B8955A]" />
                </div>
                <div>
                  <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D]">
                    Notifications Hub
                  </h1>
                  <p className="text-xs text-[#5A6E85] mt-0.5">
                    Unified alert and message center across all startup, mentor, investor, employer, and talent roles.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3.5 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] hover:border-[#0F1B2D] transition shadow-2xs"
              >
                <CheckCheck size={14} className="text-[#B8955A]" />
                <span>Mark All as Read</span>
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100/60 transition"
              >
                <Trash2 size={13} />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Search & Quick Filter Toolbar */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#F2EFE9] pt-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8CA3]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications by keyword, organization, or action..."
                className="w-full rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] py-2 pl-9 pr-4 text-xs text-[#0F1B2D] placeholder:text-[#A0AEC0] focus:border-[#0F1B2D] focus:bg-white focus:outline-none transition"
              />
            </div>

            {/* Unread Only Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUnreadOnly(!unreadOnly)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  unreadOnly
                    ? 'bg-[#0F1B2D] text-white font-semibold'
                    : 'border border-[#E5E1D8] bg-white text-[#5A6E85] hover:bg-[#FAF8F4]'
                }`}
              >
                <Filter size={13} />
                <span>Unread Only</span>
              </button>
            </div>
          </div>
        </div>

        {/* Role Tabs Navigation */}
        <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {NOTIFICATION_ROLES.map((r) => {
            const isSelected = activeRole === r.id;
            const unreadCount = roleCounts[r.id] || 0;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveRole(r.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-[#0F1B2D] text-white shadow-xs'
                    : 'border border-[#E5E1D8] bg-white text-[#5A6E85] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                }`}
              >
                <span>{r.label}</span>
                {unreadCount > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isSelected
                        ? 'bg-[#B8955A] text-white'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Category Filter Pills */}
        <div className="mb-5 flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'all', label: 'All Updates' },
            { id: 'actions', label: 'Action Required' },
            { id: 'funding', label: 'Funding & Equity' },
            { id: 'advisory', label: 'Advisory & AMAs' },
            { id: 'interviews', label: 'Interviews & Hiring' },
            { id: 'community', label: 'Community' },
            { id: 'compliance', label: 'Compliance & Legal' },
            { id: 'security', label: 'Security & Trust' },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  isSelected
                    ? 'bg-[#B8955A]/20 text-[#8C6D37] font-semibold border border-[#B8955A]/40'
                    : 'border border-[#E5E1D8] bg-white text-[#5A6E85] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E5E1D8] bg-white p-12 text-center">
            <CheckCircle2 size={40} className="mx-auto text-[#B8955A] mb-3" />
            <h3 className="font-serif text-base font-bold text-[#0F1B2D]">
              All caught up!
            </h3>
            <p className="mt-1 text-xs text-[#5A6E85] max-w-sm mx-auto">
              No notifications matching your current role, search query, or category filters.
            </p>
            {(activeRole !== 'all' || activeCategory !== 'all' || unreadOnly || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveRole('all');
                  setActiveCategory('all');
                  setUnreadOnly(false);
                  setSearchQuery('');
                }}
                className="mt-4 rounded-lg bg-[#0F1B2D] px-4 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] transition"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const IconComponent = ICON_MAP[item.icon] || Bell;
              const roleMeta = NOTIFICATION_ROLES.find((r) => r.id === item.role);

              return (
                <article
                  key={item.id}
                  className={`group relative rounded-xl border p-4 sm:p-5 transition hover:border-[#CBD5E1] shadow-2xs ${
                    item.unread
                      ? 'border-[#E5E1D8] bg-white ring-1 ring-amber-100'
                      : 'border-[#E5E1D8] bg-white/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Left Icon & Body */}
                    <div className="flex items-start gap-3.5">
                      {/* Icon */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-2xs ${
                          item.urgent
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-[#0F1B2D] text-[#B8955A]'
                        }`}
                      >
                        <IconComponent size={18} />
                      </div>

                      {/* Content */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2
                            className={`text-sm ${
                              item.unread
                                ? 'font-bold text-[#0F1B2D]'
                                : 'font-semibold text-[#334155]'
                            }`}
                          >
                            {item.title}
                          </h2>

                          {item.unread && (
                            <span className="flex h-2 w-2 rounded-full bg-[#B8955A]" />
                          )}

                          {item.urgent && (
                            <span className="rounded-full bg-amber-100 border border-amber-200 px-2 py-0.2 text-[10px] font-bold text-amber-900">
                              Action Required
                            </span>
                          )}

                          {roleMeta && roleMeta.id !== 'all' && (
                            <span
                              className={`rounded-md px-1.5 py-0.2 text-[10px] font-semibold ${roleMeta.color}`}
                            >
                              {roleMeta.label}
                            </span>
                          )}
                        </div>

                        <p className="text-xs leading-relaxed text-[#4A5568]">
                          {item.detail}
                        </p>

                        <div className="flex items-center gap-2 pt-1 text-[11px] text-[#7B8CA3]">
                          <span>{item.time}</span>
                          <span>•</span>
                          <span className="capitalize">{item.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Actions Toolbar */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-[#F2EFE9] shrink-0">
                      {item.actionUrl && (
                        <Link
                          href={item.actionUrl}
                          onClick={() => markNotificationAsRead(item.id)}
                          className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1C2B42] transition shadow-2xs"
                        >
                          <span>{item.actionLabel || 'View'}</span>
                          <ArrowRight size={12} className="text-[#B8955A]" />
                        </Link>
                      )}

                      <div className="flex items-center gap-1">
                        {item.unread && (
                          <button
                            type="button"
                            onClick={() => handleMarkItemRead(item.id)}
                            title="Mark as read"
                            className="flex items-center gap-1 rounded-md p-1.5 text-xs font-medium text-[#7B8CA3] hover:bg-[#FAF8F4] hover:text-[#0F1B2D] transition"
                          >
                            <Check size={14} />
                            <span className="hidden sm:inline text-[11px]">Mark read</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item.id)}
                          title="Dismiss"
                          className="rounded-md p-1.5 text-[#7B8CA3] hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default function SharedNotificationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F1B2D] border-t-[#B8955A]" />
        </div>
      }
    >
      <NotificationsContent />
    </Suspense>
  );
}

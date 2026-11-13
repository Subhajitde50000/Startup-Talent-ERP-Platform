'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Check,
  CheckCheck,
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
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  INITIAL_NOTIFICATIONS,
  NOTIFICATION_ROLES,
  loadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationsCount,
  NOTIFICATIONS_UPDATED_EVENT,
} from '@/lib/notifications-data';

// Dynamic icon mapping
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

export default function NotificationDropdown({
  role = 'all', // 'startup' | 'mentor' | 'investor' | 'employer' | 'jobseeker' | 'admin' | 'all'
  align = 'right', // 'right' | 'left'
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(() => INITIAL_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  // Sync with localStorage & listen for updates
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

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  // Filter notifications for this role (or all) & take last 5 to 10 (8 items)
  const roleFilteredItems = useMemo(() => {
    let list = items;
    if (role && role !== 'all') {
      list = items.filter((n) => n.role === role || n.role === 'all');
      // If role-specific list is small, backfill with general items
      if (list.length < 5) {
        const others = items.filter((n) => n.role !== role && n.role !== 'all');
        list = [...list, ...others];
      }
    }
    // Return last 5-10 notifications (slice latest 8)
    return list.slice(0, 8);
  }, [items, role]);

  // Unread count for this role
  const unreadCount = useMemo(() => {
    return getUnreadNotificationsCount(items, role);
  }, [items, role]);

  const roleMeta = useMemo(() => {
    return NOTIFICATION_ROLES.find((r) => r.id === role) || NOTIFICATION_ROLES[0];
  }, [role]);

  const handleMarkItemRead = (e, item) => {
    e.stopPropagation();
    markNotificationAsRead(item.id);
    if (item.actionUrl) {
      setOpen(false);
      router.push(item.actionUrl);
    }
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    markAllNotificationsAsRead(role);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open notifications"
        aria-expanded={open}
        className="relative grid h-10 w-10 place-items-center rounded-lg text-[#0F1B2D] hover:bg-black/5 transition focus:outline-none"
      >
        <Bell size={19} className="text-[#0F1B2D]" />
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B8955A] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B8955A]" />
          </span>
        )}
      </button>

      {/* Popover Dropdown (Last 5-10 Notifications) */}
      {open && (
        <div
          className={`absolute ${
            align === 'left' ? 'left-0' : 'right-0'
          } mt-2 w-80 sm:w-96 rounded-2xl border border-[#E5E1D8] bg-white shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F2EFE9] bg-[#FAF8F4] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm font-bold text-[#0F1B2D]">
                Notifications
              </span>
              {unreadCount > 0 ? (
                <span className="rounded-full bg-[#B8955A]/15 border border-[#B8955A]/30 px-2 py-0.2 text-[10px] font-bold text-[#8C6D37]">
                  {unreadCount} new
                </span>
              ) : (
                <span className="rounded-full bg-emerald-50 px-2 py-0.2 text-[10px] font-semibold text-emerald-800">
                  Caught up
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#8C6D37] hover:text-[#0F1B2D] transition"
              >
                <CheckCheck size={13} />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Body: Last 5 to 10 Notifications */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-[#F2EFE9]">
            {roleFilteredItems.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle2 size={32} className="mx-auto text-[#B8955A] mb-2" />
                <p className="text-xs font-bold text-[#0F1B2D]">No notifications right now</p>
                <p className="text-[11px] text-[#5A6E85] mt-0.5">
                  You are completely caught up across all activities.
                </p>
              </div>
            ) : (
              roleFilteredItems.map((item) => {
                const IconComponent = ICON_MAP[item.icon] || Bell;
                return (
                  <div
                    key={item.id}
                    onClick={(e) => handleMarkItemRead(e, item)}
                    className={`group relative flex items-start gap-3 p-3.5 text-left transition cursor-pointer ${
                      item.unread
                        ? 'bg-amber-50/20 hover:bg-amber-50/40'
                        : 'bg-white hover:bg-[#FAF8F4]'
                    }`}
                  >
                    {/* Unread Indicator Bar */}
                    {item.unread && (
                      <span className="absolute left-1 top-4 h-6 w-1 rounded-full bg-[#B8955A]" />
                    )}

                    {/* Notification Icon */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-2xs ${
                        item.urgent
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-[#0F1B2D] text-[#B8955A]'
                      }`}
                    >
                      <IconComponent size={15} />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p
                          className={`truncate text-xs ${
                            item.unread
                              ? 'font-bold text-[#0F1B2D]'
                              : 'font-medium text-[#2D3748]'
                          }`}
                        >
                          {item.title}
                        </p>
                        <span className="shrink-0 text-[10px] text-[#7B8CA3]">
                          {item.time}
                        </span>
                      </div>

                      <p className="mt-0.5 text-[11px] leading-snug text-[#5A6E85] line-clamp-2">
                        {item.detail}
                      </p>

                      {item.actionLabel && (
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-[#8C6D37] group-hover:underline">
                          <span>{item.actionLabel}</span>
                          <ArrowRight size={10} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Button to Navigate to Role-Wise / All Notifications */}
          <div className="border-t border-[#E5E1D8] bg-[#FAF8F4] p-2.5">
            <Link
              href={role && role !== 'all' ? `/notifications?role=${role}` : '/notifications'}
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F1B2D] py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1C2B42] transition"
            >
              <span>
                {role && role !== 'all'
                  ? `View All ${roleMeta.label} Notifications`
                  : 'View All Notifications'}
              </span>
              <ArrowRight size={13} className="text-[#B8955A]" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

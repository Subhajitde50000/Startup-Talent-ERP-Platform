'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CommunityView from '../community-view';

export default function CommunityRolePage() {
  const params = useParams();
  const roleSlug = params?.role || 'startup';

  // Normalize role string
  let role = 'startup';
  if (roleSlug === 'mentor') role = 'mentor';
  else if (roleSlug === 'investor') role = 'investor';
  else if (roleSlug === 'employer') role = 'employer';
  else if (roleSlug === 'jobseeker' || roleSlug === 'talent') role = 'jobseeker';
  else if (roleSlug === 'admin') role = 'admin';

  return <CommunityView role={role} shellMode="none" />;
}

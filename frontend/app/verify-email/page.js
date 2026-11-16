import { Suspense } from 'react';
import AuthScreen from '../AuthScreen';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F4]" />}>
      <AuthScreen page="verify" />
    </Suspense>
  );
}

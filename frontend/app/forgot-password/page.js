import { Suspense } from 'react';
import AuthScreen from '../AuthScreen';

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F4]" />}>
      <AuthScreen page="forgot" />
    </Suspense>
  );
}

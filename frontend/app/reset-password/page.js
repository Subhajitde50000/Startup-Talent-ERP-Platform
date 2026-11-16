import { Suspense } from 'react';
import AuthScreen from '../AuthScreen';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F4]" />}>
      <AuthScreen page="reset" />
    </Suspense>
  );
}

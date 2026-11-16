import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import RouteGuard from '@/components/RouteGuard';

export const metadata = {
  title: 'Forma — Workspace',
  description: 'Startup and talent workspace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RouteGuard>{children}</RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}

import './globals.css'

import Footer from '@/app/_shared/components/footer/Footer';
import NotificationManager from '@/components/notification/NotificationManager';
import TestNavbar from './_shared/components/navbar/UserNavbar';
import { createServerSupabaseClient } from './_shared/helpers/ServerSupabaseClient';
import { getUser } from './_shared/helpers/AccountHelper';

export const metadata = {
  title: 'Tempo',
  description: 'A music community',
}

export default async function RootLayout({ children }: any) {
  const supabase = createServerSupabaseClient();
  const user = await getUser(supabase);

  return (
    <html lang="en" className="bg-background">
      <body className="bg-background">
        <NotificationManager />
        <main className="min-h-screen">
          <TestNavbar />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
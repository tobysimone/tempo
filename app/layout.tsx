import './globals.css';

import Footer from '@/app/_shared/components/footer/Footer';
import NotificationManager from '@/components/notification/NotificationManager';
import UserNavbar from './_shared/components/navbar/UserNavbar';
import { getUser } from './_shared/helpers/AccountHelper';
import { createServerSupabaseClient } from './_shared/helpers/ServerSupabaseClient';

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
          <UserNavbar user={user} />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
import './globals.css'

import UserNavbar from '@/components/navbar/UserNavbar';
import { UserProvider } from './_shared/providers/UserProvider';
import Footer from '@/app/_shared/components/footer/Footer';
import NotificationManager from '@/components/notification/NotificationManager';

export const metadata = {
  title: 'Tempo',
  description: 'A music community',
}

export default async function RootLayout({ children }: any) {
  return (
    <UserProvider>
      <html lang="en" className="bg-background">
        <body className="bg-background">
          <NotificationManager />
          <main className="min-h-screen">
            <UserNavbar />
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </UserProvider>
  )
}
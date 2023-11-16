import UserNavbar from '@/components/navbar/UserNavbar';
import './globals.css'
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './_shared/providers/UserProvider';

export const metadata = {
  title: 'Tempo',
  description: 'A music community',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <html lang="en" className="bg-background">
        <body>
          <Toaster
            position="bottom-left"
            toastOptions={{
              duration: 55000,
              style: {
                padding: '16px',
                background: 'bg-background'
              }
            }}
          />
          <main className="min-h-screen bg-background flex flex-col">
            <UserNavbar />
            <div className="flex flex-col w-full" style={{ marginTop: 60 }}>
              {children}
            </div>
          </main>
          <div className="w-full flex flex-col items-center bg-white py-2.5 border-t border-gray-200 dark:border-gray-700 dark:bg-raisedBackground sm:px-4 rounded">
            <div className="flex justify-center text-center text-xs">
              <p className="text-sm font-muted text-black dark:text-white">
                Made with <span className="text-pink-500">&#9829;</span> by Toby Simone
                <br />
                Tempo &copy; 2023
              </p>
            </div>
          </div>
        </body>
      </html>
    </UserProvider>
  )
}

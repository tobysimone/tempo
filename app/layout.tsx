import UserNavbar from '@/components/navbar/UserNavbar';
import './globals.css'

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
    <html lang="en" className="bg-background">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          <UserNavbar />
          <div className="flex flex-col items-center w-full" style={{ marginTop: 60 }}>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

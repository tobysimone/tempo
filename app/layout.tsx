import './globals.css'

export const metadata = {
  title: 'Tempo',
  description: 'A music community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          <button></button>
          {children}
        </main>
      </body>
    </html>
  )
}

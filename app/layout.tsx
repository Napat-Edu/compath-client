import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
import './globals.css'
import NavigateBar from '@/components/NavigateBar'
import { LocalStorageProvider } from '@/contexts/LocalStorageContext';
import { SelectInsightProvider } from '@/contexts/SelectInsightContext';
import { SidebarProvider } from '@/contexts/SidebarContext';

const IBM_PLEX_SANS_THAI = IBM_Plex_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Compath',
  description: 'Web application for classification suited career with your resume',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={IBM_PLEX_SANS_THAI.className}>
        <main className='flex flex-col md:flex-row min-h-screen'>
          <SidebarProvider>

            <NavigateBar></NavigateBar>

            <LocalStorageProvider>
              <SelectInsightProvider>
                <main className='grow overflow-x-hidden px-6'>
                  {children}
                </main>
              </SelectInsightProvider>
            </LocalStorageProvider>

          </SidebarProvider>
        </main>
      </body>
    </html>
  )
}

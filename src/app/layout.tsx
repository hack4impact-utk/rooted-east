import { authOptions } from './api/auth/[...nextauth]/route';
import Provider from './context/client-provider';
import { getServerSession } from 'next-auth/next';
import '@/styles.css';

//👇 Import Open Sans font
import { PT_Sans } from 'next/font/google';

//👇 Configure our font object
const openSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hangman',
  description: 'Learn a new word every day and compete with friends!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='border-b-2 border-b-black h-20 w-full flex items-center justify-center text-3xl'>Hangman</div>
        {children}
      </body>
    </html>
  );
}

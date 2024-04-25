import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your blog',
  description: '...',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' data-theme='dim'>
      <body className={inter.className}>
        <Nav />
        <div className='page-container'>
          <main className='mx-auto max-w-5xl'>
            {children} 
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

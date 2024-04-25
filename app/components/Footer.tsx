import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className='footer items-center py-10 px-20 bg-neutral text-neutral-content'>
        <aside className='items-center grid-flow-col'>
            <p>© 2024 - present. All rights reserved.</p>
        </aside> 
        <div className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
            <Link href='/about'>About</Link>
        </div>
    </footer>
  )
};

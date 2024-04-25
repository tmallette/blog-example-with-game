import Link from 'next/link';
import React from 'react';

export default function Nav() {
  return (
    <nav className='navbar bg-neutral text-neutral-content z-[9999] px-6 py-3'>
        <div className='flex-1'>
            <Link href={ '/' } className='btn btn-ghost text-xl rounded-sm'>Home</Link>
        </div>
        <div className='flex-none'>
            <Link href={ '/blog' } className='btn btn-ghost mx-2 rounded-sm'>Blog</Link>
            <Link href={ '/games' } className='btn btn-ghost mx-2 rounded-sm'>Games</Link>
        </div>
    </nav>
  )
};

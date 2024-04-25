import React from 'react';
import { getMarkdownMetaData } from '@/app/CommonFunctions';
import { BlogPostData } from '../types/global';
import Link from 'next/link';

export default function BlogPostList() {
    let postData = getMarkdownMetaData();

    postData.sort((a : BlogPostData, b : BlogPostData) => Date.parse(b.date) - Date.parse(a.date));

  return (
    <>
        {postData.map(( post : BlogPostData, i) => {
            return (
                <Link key={i} href={`/blog/${post.slug}`}>
                    <div className='group m-5 ml-0 px-8 py-5 bg-base-300 rounded-sm'>
                        <div className='text-sm mb-1 text-primary'>{post.category}</div>
                        <div className='text-2xl font-medium group-hover:text-primary'>{post.title}</div>
                        <div className='text-xs mb-2'>{post.date}</div>
                        <div className='text-sm'>{post.subtitle}</div>
                    </div>
                </Link>
            )
        })}
    </>
  )
};

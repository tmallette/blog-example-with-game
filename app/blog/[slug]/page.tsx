import React from 'react';
import fs from 'fs';
import type { Metadata } from 'next';
import { getMarkdownMetaData } from '@/app/CommonFunctions';
import { PageParams } from '@/app/types/global';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateMetadata( { params } : PageParams ): Promise<Metadata> {
    const slug = params.slug;
    const post = getPostData(slug);

    return {
      title: post.data.title,
      description: post.data.subtitle
    }
};

export const generateStaticParams = async () => {
    const posts = getMarkdownMetaData();

    let slugs : { slug: string } [] = [];

    posts.map((post) => {
        slugs = [...slugs, { slug : post.slug }]
    });

    return slugs;
};

const getPostData = ( slug : string ) => {
    let postData = null;

    try{
        const file = `posts/${slug}.md`;
        const post = fs.readFileSync(file, 'utf8');
        postData = matter(post);

    } catch(error) {
        notFound();
    }

    return postData;
};

export default function page( { params } : PageParams ) {
    const slug = params.slug;
    const post = getPostData(slug);

    const components = { Link };

  return (
    <main>
        <div className='flex items-center mb-5'>
            <Link href={'/'}>Home</Link> 
            <svg className='mx-2' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='9 18 15 12 9 6'></polyline></svg>
            <Link href={'/blog'}>Blog</Link>
        </div>
        <article className='prose lg:prose-ms w-full max-w-full mb-20 pre-tag'>
            <h1>{post.data.title}</h1>
            <div className='mb-12'>{post.data.date}</div>
            <MDXRemote source={post.content} components={ components } />
        </article>
    </main>
  );
};

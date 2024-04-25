import fs from 'fs';
import matter from 'gray-matter';
import { BlogPostData, GamePostData } from './types/global';

export const getMarkdownMetaData = () : BlogPostData[] => {
    const folder = 'posts/';
    const files = fs.readdirSync(folder);

    let slugs : BlogPostData[] = [];

    files.map((file)=> {
        const fileData = fs.readFileSync( `posts/${file}`, 'utf8' );
        const matterRes = matter(fileData);

        if(file.endsWith('.md')) {
            slugs = [...slugs, {
                title: matterRes.data.title,
                subtitle: matterRes.data.subtitle,
                slug:  file.replace('.md', ''),
                category: matterRes.data.category,
                date: matterRes.data.date
            }];
        }
    });

    return slugs;
};

export const getGameMetadata = () : GamePostData[] => {
    const folder = 'games/';
    const files = fs.readdirSync(folder);

    let slugs : GamePostData[] = [];

    files.map((file)=> {
        const fileData = fs.readFileSync(`games/${file}`, 'utf8');
        const matterRes = matter(fileData);

        if(file.endsWith('.md')) {
            slugs = [...slugs, {
                title: matterRes.data.title,
                slug:  file.replace('.md', ''),
                date: matterRes.data.date,
                subtitle: matterRes.data.subtitle
            }];
        }
    });

    return slugs;
};
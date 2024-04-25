import React from 'react';
import { getGameMetadata } from '@/app/CommonFunctions';
import { GamePostData } from '../types/global';
import Link from 'next/link';

export default function GameList( { numberOfGames } : { numberOfGames ?: number} ) {
    let gameData = getGameMetadata();

    gameData.sort((a : GamePostData, b : GamePostData) => Date.parse(b.date) - Date.parse(a.date));

    if(numberOfGames) {
        gameData = gameData.slice(0, numberOfGames);
    }

  return (
    <>
        {gameData.map(( game : GamePostData, i) => {
            return (
                <Link key={i} href={`/games/${game.slug}`}>
                    <div className='group my-5 px-8 py-5 bg-base-300 rounded-sm'>
                        <div className='text-2xl font-medium group-hover:text-primary'>{game.title}</div>
                        <div className='text-xs mb-2'>{game.date}</div>
                        <div className='text-sm'>{game.subtitle}</div>
                    </div>
                </Link>
            )
        })}
    </>
  );
};
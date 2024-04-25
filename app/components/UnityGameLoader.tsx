'use client';

import { useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { UnityContextData } from '../types/global';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5';

export default function UnityGameLoader({gameLink,gameName,gameVersion,gameCompany}:UnityContextData) {
    const [loadGame, setLoadGame] = useState(false);
    const [muted, setMute] = useState(false);

    const {unityProvider,unload,isLoaded,requestFullscreen,sendMessage} = useUnityContext({
        dataUrl: `/game_builds/${gameLink}/game.data`,
        frameworkUrl: `/game_builds/${gameLink}/game.framework.js`,
        codeUrl: `/game_builds/${gameLink}/game.wasm`,
        loaderUrl: `/game_builds/${gameLink}/game.loader.js`,
        companyName: gameCompany,
        productName: gameName,
        productVersion: gameVersion
    });

    const handleMute = () => {
        if(muted) {
            sendMessage('AudioManager','Webgl_Unmute');
            setMute(false);
        } else {
            sendMessage('AudioManager','Webgl_Mute');
            setMute(true);
        }
    };

    useEffect(()=>{
        const stopGame = async () => {
            await unload();
        };
        
        return(()=>{
            if(isLoaded){
                stopGame();
            }
        });
    }, [isLoaded]);

    return (
       
        <div className='flex rounded-sm p-[6px] bg-black w-[972px] h-[612px]' >
            {(loadGame) ? 
                <div className='relative'>
                    <div className='absolute flex flex-col bottom-0 right-0'>
                        <button key='fullscreen' className='btn btn-info mb-4 rounded-sm' onClick={(e)=>{requestFullscreen(true)}}>
                            <AiOutlineFullscreen size={28}/>
                        </button>
                        <button key='mute' className='btn btn-info rounded-sm' onClick={handleMute}>
                            {muted?<IoVolumeHighOutline size={32}/>:<IoVolumeMuteOutline size={28}/>}
                        </button>
                    </div>
                    <Unity unityProvider={unityProvider} style={{width: 960, height: 600}} />
                </div>
                : 
                <div className='flex flex-col w-full items-center'>
                    <div role='alert' className='alert alert-info mt-2 rounded-sm w-fit'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='stroke-current shrink-0 w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path></svg>
                        <span>You may need to turn on Hardware acceleration in your browser settings if there is any lag.</span>
                    </div>
                    <button className='btn btn-outline btn-info m-auto rounded-sm' onClick={(e)=>{setLoadGame(true)}}>Load game</button>
                    <div role='alert' className='alert alert-info mb-2 rounded-sm w-fit'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='stroke-current shrink-0 w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path></svg>
                        <span>Best experienced in fullscreen.</span>
                    </div>
                </div>
            }
        </div>
    );
};
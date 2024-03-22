'use client';

import { useState, useEffect, useMemo } from 'react';
import Holden from './Holden';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { Home, ChevronsRight, Trophy, ChevronsUp, ChevronsDown, Minus } from 'lucide-react';
import { useGameContext } from '../context';
import StatsDisplay from './StatsDisplay';
import Modal from './Modal';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const cityBuildings: string[] = [
    '/city-building-1-broken.png',
    '/city-building-2-broken.png',
    '/city-building-5.png',
    '/city-building-6.png',
    '/city-building-7.png',
    '/city-building-8.png',
    '/city-building-9.png',
    '/city-building-10.png',
];

const Game = () => {
    const context = useGameContext();
    if (context === undefined) {
        throw new Error('useContext(GameContext) must be used within a GameContext.Provider');
    }
    const { xPos, setXPos, happiness, setHappiness, money, setMoney, friends, setFriends, progress, setProgress } = context;
    const [achievementsModalOpened, setAchievementsModalOpened] = useState(false);
    const [huntingHatModalOpened, setHuntingHatModalOpened] = useState(false);

    // positions
    let redHuntingHatPos = 0;
    if (typeof window !== 'undefined') redHuntingHatPos = window.innerWidth * 0.6;

    const [isShowing, setIsShowing] = useState(false);
    setTimeout(() => setIsShowing(true), 100);

    useEffect(() => {
        if (xPos >= redHuntingHatPos - (redHuntingHatPos - 210)) {
            if (progress[0].reached == false) {
                setProgress((prev) => {
                    const items = prev;
                    items[0].reached = true;
                    setHuntingHatModalOpened(true);
                    return items;
                });
            }
        }
    }, [xPos]);

    return (
        <div className='flex flex-col game-position'>
            {/* nav & stats */}
            <Transition show={isShowing} appear={false} enter='transition-all duration-[1500ms]' enterFrom='opacity-0' enterTo='opacity-100'>
                <div className='absolute top-4 left-4 flex flex-col items-start gap-3'>
                    <Link className='flex gap-2 items-center justify-center group' href='/'>
                        <Home className='group-hover:text-primary transition-all' />
                        <p className='group-hover:text-primary transition-all'>back to home</p>
                    </Link>
                    <div className='flex gap-2 items-center justify-center group cursor-pointer' onClick={() => setAchievementsModalOpened((prev) => !prev)}>
                        <Trophy className='group-hover:text-primary transition-all' />
                        <p className='group-hover:text-primary transition-all'>achievements</p>
                    </div>
                    <Modal openedModal={achievementsModalOpened} setOpenedModal={setAchievementsModalOpened}>
                        <div></div>
                    </Modal>
                </div>
                <StatsDisplay />
            </Transition>

            {/* actual game */}
            <Transition
                show={isShowing}
                appear={false}
                enter='transition-all duration-[1500ms]'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                className='h-full w-screen flex flex-col absolute -bottom-56 lesktop:-bottom-44 left-0'
            >
                <div className='flex max-h-[12.5rem] w-screen'>
                    <img
                        src='/holden-red-hunting-hat.png'
                        className={cn('relative flex max-h-[12.5rem] w-16 h-16 top-[360px] lesktop:top-[488px] rounded-full', progress[0].completed && ' hidden')}
                        style={{ left: `${-xPos <= 0 ? -xPos + redHuntingHatPos : redHuntingHatPos}px` }}
                    />
                    <Modal openedModal={huntingHatModalOpened} setOpenedModal={setHuntingHatModalOpened}>
                        <div className='w-full h-full p-6 flex flex-col gap-2'>
                            <h1 className='font-extrabold tracking-wider text-3xl'>Holden's Red Hunting Hat</h1>
                            <div className='flex flex-col mb-2'>
                                <p className='flex items-center gap-1 text-lg'>
                                    <ChevronsUp className='h-10 w-10 text-success' />
                                    <p>10% happiness</p>
                                </p>
                                <p className='flex items-center gap-1 text-lg'>
                                    <ChevronsDown className='h-10 w-10 text-error' />
                                    <p>$1 money</p>
                                </p>
                                <p className='flex items-center gap-1 text-lg'>
                                    <Minus className='h-10 w-10 text-blue-300' />
                                    <p>0 friends</p>
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    if (!progress[0].completed) {
                                        setHappiness((prev) => prev + 10);
                                        setMoney((prev) => prev - 1);
                                        setProgress((prev) => {
                                            const items = [...prev];
                                            items[0].completed = true;
                                            return items;
                                        });
                                    }
                                    setHuntingHatModalOpened(false);
                                }}
                                className='text-md w-full lobile:text-lg outline-none tablet:text-xl flex items-center justify-center rounded-lg py-2 lobile:py-3 bg-primary text-white font-black tracking-wider shadow-[0_7px_0_#da8484] hover:shadow-none hover:translate-y-[7px] transition-all'
                            >
                                Accept
                            </button>
                        </div>
                    </Modal>
                </div>
                <div className='w-screen max-h-[12.5rem] hidden lesktop:flex lesktop:ml-16 desktop:ml-24'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <ChevronsRight className={cn('relative w-32 h-full top-[350px]')} strokeWidth={2} style={{ left: `${-xPos <= 0 ? -xPos : 0}px` }} />
                    ))}
                </div>
                <div className='flex ml-[80%]'>
                    <CityBuildings xPos={xPos} />
                </div>
                <Holden />
                <div>
                    <div className='w-[300vw] h-1 bg-black absolute' style={{ left: `${-xPos <= 0 ? -xPos : 0}px` }} />
                </div>
            </Transition>
        </div>
    );
};

type CityBuildingsProps = {
    xPos: number;
};

const CityBuildings = ({ xPos }: CityBuildingsProps) => {
    const cityBuildingImages = useMemo(() => {
        return Array.from({ length: 30 }).map((_, index) => {
            const src = cityBuildings[Math.floor(Math.random() * cityBuildings.length)];
            const marginRight = `${Math.floor(Math.random() * 500) + 20}px`;
            return { key: index, src, marginRight };
        });
    }, []);

    // style={{ left: `${-xPos <= 0 ? -xPos : 0}px`, marginRight: `${Math.floor(Math.random() * 500) + 20}px` }}

    return cityBuildingImages.map(({ key, src, marginRight }) => (
        <img
            key={key}
            src={src}
            alt='citybuilding'
            width='w-full'
            height='h-full'
            className='relative top-40 opacity-[30%]'
            style={{ left: `${-xPos <= 0 ? -xPos : 0}px`, marginRight: marginRight }}
        />
    ));
};

export default Game;

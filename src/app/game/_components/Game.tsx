'use client';

import { useState, Fragment } from 'react';
import Holden from './Holden';
import { Transition, Dialog } from '@headlessui/react';
import Link from 'next/link';
import { BadgeDollarSign, Frown, Handshake, Home, LucideIcon, Meh, Smile, Trophy } from 'lucide-react';
import { useGameContext } from '../context';
import { cn } from '@/lib/utils';

type StatDisplay = {
    name: string;
    value: number;
    max: number;
};

const Game = () => {
    const context = useGameContext();
    if (context === undefined) {
        throw new Error('useContext(GameContext) must be used within a GameContext.Provider');
    }
    const { xPos, setXPos, happiness, setHappiness, money, setMoney, friends, setFriends } = context;

    const [isShowing, setIsShowing] = useState(false);
    setTimeout(() => setIsShowing(true), 100);

    return (
        <div className='flex flex-col mt-72'>
            {/* nav & stats */}
            <Transition show={isShowing} appear={false} enter='transition-all duration-[1500ms]' enterFrom='opacity-0' enterTo='opacity-100'>
                <div className='absolute top-4 left-4 flex flex-col items-start gap-3'>
                    <Link className='flex gap-2 items-center justify-center group' href='/'>
                        <Home className='group-hover:text-primary transition-all' />
                        <p className='group-hover:text-primary transition-all'>back to home</p>
                    </Link>
                    <Modal />
                </div>
                <StatsDisplay />
            </Transition>

            {/* actual game */}
            <Holden />
            <Transition show={isShowing} appear={false} enter='transition-all duration-[1500ms]' enterFrom='scale-0' enterTo='scale-100'>
                <div className='w-screen h-1 bg-black' />
            </Transition>
        </div>
    );
};

type StatsDisplayIconProps = {
    name: string;
    value: number;
    max: number;
};

const StatsDisplay = () => {
    const context = useGameContext();
    if (context === undefined) {
        throw new Error('useContext(GameContext) must be used within a GameContext.Provider');
    }
    const { happiness, money, friends } = context;

    const statsArray: StatDisplay[] = [
        { name: 'happiness', value: happiness, max: 50 },
        { name: 'money', value: money, max: 150 },
        { name: 'friends', value: friends, max: 5 },
    ];

    const Icon = ({ name, value, max }: StatsDisplayIconProps) => {
        let newClass = `w-12 laptop:w-20 h-12 laptop:h-20`;
        if (name == 'happiness') {
            if (value >= (max / 3) * 2) return <Smile className={newClass} />;
            if (value >= max / 3) return <Meh className={newClass} />;
            else return <Frown className={newClass} />;
        } else if (name == 'money') return <BadgeDollarSign className={newClass} />;
        else if (name == 'friends') return <Handshake className={newClass} />;
    };

    return (
        <div className='absolute top-4 right-4 flex flex-col taptop:flex-row gap-5'>
            {statsArray.map((stat, index) => (
                <div
                    key={stat.name + index}
                    className='flex items-center rounded-md gap-2 w-48 laptop:w-56 px-5 lobile:py-1.5 border-[3px] border-primary shadow-[5px_5px_0px_0px_#de9292] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] cursor-pointer transition-all'
                >
                    <Icon name={stat.name} value={stat.value} max={stat.max} />
                    <div className='w-full flex gap-2 justify-start items-center lobile:block lobile:justify-center'>
                        <h1 className='hidden lobile:block text-xl laptop:text-2xl font-bold'>{stat.name}</h1>
                        <div className='relative bottom-2 w-full lobile:relative lobile:bottom-2.5 lobile:block'>
                            <div
                                className={cn(
                                    'relative flex justify-center items-center top-4 lobile:top-4 rounded-full w-full h-4 z-[9999] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]',
                                    stat.value >= (stat.max / 3) * 2 ? 'bg-success' : stat.value >= stat.max / 3 ? 'bg-warning' : 'bg-error'
                                )}
                                style={{ width: `${(stat.value / stat.max) * 100}%` }}
                            >
                                {stat.name == 'money' && stat.value >= stat.max / 3 ? `$${stat.value}` : ''}
                                {stat.name == 'friends' && stat.value >= stat.max / 3 ? `${stat.value}` : ''}
                            </div>
                            <div className='relative rounded-full flex justify-center items-center w-full h-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                                {stat.name == 'money' && stat.value < stat.max / 3 ? `$${stat.value}` : ''}
                                {stat.name == 'friends' && stat.value < stat.max / 3 ? `${stat.value}` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Modal = () => {
    const [openedModal, setOpenedModal] = useState(false);

    return (
        <>
            <div className='flex gap-2 items-center justify-center group cursor-pointer' onClick={() => setOpenedModal((prev) => !prev)}>
                <Trophy className='group-hover:text-primary transition-all' />
                <p className='group-hover:text-primary transition-all'>achievements</p>
            </div>
            <Transition show={openedModal} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={setOpenedModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                        <div className='flex min-h-screen min-w-screen items-center justify-center p-4 text-center sm:items-center sm:p-0'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                                enterTo='opacity-100 translate-y-0 sm:scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            >
                                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[36rem] h-[24rem]'></Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Game;

'use client';

import { Fragment, useState } from 'react';
import Game from './_components/Game';
import { MyProvider } from './context';
import Link from 'next/link';
import { Home, Trophy } from 'lucide-react';
import { Transition, Dialog } from '@headlessui/react';

const page = () => {
    const [openedModal, setOpenedModal] = useState(false);

    return (
        <div className='min-w-full min-h-full flex items-center justify-center bg-gradient overflow-hidden'>
            <div className='absolute top-4 left-4 flex flex-col items-start gap-3'>
                <Link className='flex gap-2 items-center justify-center group' href='/'>
                    <Home className='group-hover:text-primary transition-all' />
                    <p className='group-hover:text-primary transition-all'>back to home</p>
                </Link>
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
            </div>
            <MyProvider>
                <Game />
            </MyProvider>
        </div>
    );
};

export default page;

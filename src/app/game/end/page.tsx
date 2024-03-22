'use client';

import { Toaster } from 'react-hot-toast';
import { MyProvider } from '../context';
import StatsDisplay from '../_components/StatsDisplay';
import Link from 'next/link';

const page = () => {
    return (
        <div className='min-w-full min-h-screen items-center justify-center bg-gradient overflow-hidden flex flex-col'>
            <MyProvider>
                <Toaster />
                <h1 className='text-4xl mobile:text-[2.5rem] lobile:text-5xl mablet:text-6xl tablet:text-7xl font-extrabold text-center tracking-wider text-gradient leading-none'>
                    The End!
                </h1>
                <Link
                    href='/'
                    className='mt-8 text-md w-96 lobile:text-lg tablet:text-xl flex items-center justify-center rounded-lg py-2 lobile:py-3 bg-primary text-white font-black tracking-wider shadow-[0_7px_0_#da8484] hover:shadow-none hover:translate-y-[7px] transition-all'
                >
                    PLAY AGAIN
                </Link>
            </MyProvider>
        </div>
    );
};

export default page;

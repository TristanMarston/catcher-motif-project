'use client';

import Game from './_components/Game';
import { Toaster } from 'react-hot-toast';
import { MyProvider } from './context';

const page = () => {
    return (
        <div className='min-w-full min-h-screen items-center justify-center bg-gradient overflow-hidden flex flex-col'>
            <MyProvider>
                <Toaster />
                <Game />
            </MyProvider>
        </div>
    );
};

export default page;

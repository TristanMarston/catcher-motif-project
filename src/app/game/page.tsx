'use client';

import Game from './_components/Game';
import { MyProvider } from './context';

const page = () => {

    return (
        <div className='min-w-full min-h-screen items-center justify-center bg-gradient overflow-hidden flex flex-col'>
            <MyProvider>
                <Game />
            </MyProvider>
        </div>
    );
};

export default page;

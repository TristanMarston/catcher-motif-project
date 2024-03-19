'use client';

import { useState } from 'react';
import Holden from './Holden';
import { Transition } from '@headlessui/react';

const Game = () => {
    const [isShowing, setIsShowing] = useState(false);
    setTimeout(() => setIsShowing(true), 100);

    return (
        <div className='flex flex-col mt-72'>
            <Holden />
            {/* ground */}
            <Transition show={isShowing} appear={false} enter='transition-all duration-[1500ms]' enterFrom='scale-0' enterTo='scale-100'>
                <div className='w-screen h-1 bg-black' />
            </Transition>
        </div>
    );
};

export default Game;

'use client';

import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LandingPage = () => {
    const [isShowing, setIsShowing] = useState(false);
    const router = useRouter();

    return (
        <div className='flex flex-col gap-6 lobile:gap-8 mx-6'>
            <h1 className='text-4xl mobile:text-[2.5rem] lobile:text-5xl mablet:text-6xl tablet:text-7xl font-extrabold text-center tracking-wider text-gradient leading-none'>
                The Life of <br />
                Holden Caulfield
            </h1>
            <div className='flex flex-col gap-4 lobile:gap-6'>
                <Transition
                    show={isShowing}
                    appear={false}
                    unmount={true}
                    enter='transition-all duration-1000'
                    enterFrom='transform translate-x-full'
                    enterTo='transform translate-x-0'
                    leave='transition-all duration-1000'
                    leaveFrom='transform translate-x-0'
                    leaveTo='transform translate-x-full'
                    className='fixed bg-gradient text-white w-screen mx-auto inset-0 z-40 overflow-y-scroll '
                ></Transition>
                <button
                    onClick={() => {
                        setIsShowing((prev) => !prev);
                        setTimeout(() => router.push('/game'), 1000);
                    }}
                    className='text-md lobile:text-lg tablet:text-xl flex items-center justify-center rounded-lg py-2 lobile:py-3 bg-primary text-white font-black tracking-wider shadow-[0_7px_0_#da8484] hover:shadow-none hover:translate-y-[7px] transition-all'
                >
                    BEGIN JOURNEY
                </button>
                <Link
                    href='/'
                    className='text-md lobile:text-lg tablet:text-xl flex items-center justify-center bg-transparent border-primary border-2 rounded-lg py-2 lobile:py-3 text-primary font-black tracking-wider shadow-[0_5px_0_#de9292] hover:shadow-none hover:translate-y-[5px] transition-all'
                >
                    EXPLANATION
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;

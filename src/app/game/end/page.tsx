'use client';

import { Toaster } from 'react-hot-toast';
import { MyProvider } from '../context';
import StatsDisplay from '../_components/StatsDisplay';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Fallback = () => <div>fallback</div>;

const page = () => {
    const searchParams = useSearchParams();
    const happinessParam = searchParams.get('happiness');
    const moneyParam = searchParams.get('money');
    const innocenceParam = searchParams.get('innocence');

    const happiness: number = happinessParam != null ? parseInt(happinessParam) : 60;
    const money: number = moneyParam != null ? parseInt(moneyParam) : 50;
    const innocence: number = innocenceParam != null ? parseInt(innocenceParam) : 60;

    return (
        <Suspense fallback={<Fallback />}>
            <div className='min-w-full min-h-screen items-center justify-center bg-gradient overflow-hidden flex flex-col px-6'>
                <MyProvider>
                    <Toaster />
                    <div className='w-96 h-full flex flex-col items-center'>
                        <h1 className='text-4xl mobile:text-[2.5rem] lobile:text-5xl mablet:text-6xl tablet:text-7xl font-extrabold text-center tracking-wider text-gradient leading-none'>
                            The End!
                        </h1>
                        <Link
                            href='/'
                            className='mt-8 text-md w-72 lobile:w-full lobile:text-lg tablet:text-xl flex items-center justify-center rounded-lg py-2 lobile:py-3 bg-primary text-white font-black tracking-wider shadow-[0_7px_0_#da8484] hover:shadow-none hover:translate-y-[7px] transition-all'
                        >
                            PLAY AGAIN
                        </Link>
                    </div>
                    <StatsDisplay happiness={happiness} money={money} innocence={innocence} />
                </MyProvider>
            </div>
        </Suspense>
    );
};

export default page;

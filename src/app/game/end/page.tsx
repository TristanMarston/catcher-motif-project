'use client';

import { Toaster } from 'react-hot-toast';
import EndPage from './EndPage';
import { Suspense } from 'react';

const Fallback = () => <div>fallback</div>;

const page = () => {
    return (
        <Suspense fallback={<Fallback />}>
            <div className='min-w-full min-h-screen items-center justify-center bg-gradient overflow-hidden flex flex-col px-6'>
                <Toaster />
                <EndPage />
            </div>
        </Suspense>
    );
};

export default page;

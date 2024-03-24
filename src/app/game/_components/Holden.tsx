import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGameContext } from '../context';
import { Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';

const Holden = () => {
    const [showHolden, setShowHolden] = useState(false);
    setTimeout(() => setShowHolden(true), 100);

    const context = useGameContext();
    if (context === undefined) {
        throw new Error('useContext(GameContext) must be used within a GameContext.Provider');
    }
    const { xPos, setXPos, movementEnabled, progress } = context;
    const [keyState, setKeyState] = useState<{ [key: string]: boolean }>({});

    const [inputMethod, setInputMethod] = useState<string>('unknown');

    useEffect(() => {
        if (!('ontouchstart' in window) && !navigator.maxTouchPoints) setInputMethod('mouse');
        else if ('ontouchstart' in window || navigator.maxTouchPoints) setInputMethod('touch');
        else setInputMethod('unknown');
    }, []);

    const handleKeyPress = (event: KeyboardEvent) => {
        setKeyState((prevState) => ({
            ...prevState,
            [event.key]: true,
        }));
    };

    const handleKeyRelease = (event: KeyboardEvent) => {
        setKeyState((prevState) => ({
            ...prevState,
            [event.key]: false,
        }));
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyRelease);

        const interval = setInterval(moveCharacter, 1000 / 120); // Adjust this value for smoother movement
        if (!movementEnabled) clearInterval(interval);

        function moveCharacter() {
            if (movementEnabled) {
                if (keyState['ArrowLeft'] || keyState['a'] || keyState['left']) {
                    setXPos((prevX) => (prevX - 5 >= 0 && movementEnabled ? prevX - 5 : prevX)); // Move left by reducing x position
                }
                if (keyState['ArrowRight'] || keyState['d'] || keyState['right']) {
                    setXPos((prevX) => (movementEnabled ? prevX + 5 : prevX)); // Move right by increasing x position
                }
            }
        }

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', handleKeyRelease);
            clearInterval(interval);
        };
    }, [keyState, movementEnabled]);

    const touchMove = (direction: string) => {
        setKeyState((prevState) => ({
            ...prevState,
            [direction]: true,
        }));
    };

    const touchEnd = (direction: string) => {
        setKeyState((prevState) => ({
            ...prevState,
            [direction]: false,
        }));
    };

    return (
        <>
            <Transition
                show={showHolden}
                appear={false}
                enter='transition-all duration-[1500ms]'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                className={cn('w-full flex justify-center absolute bottom-20 h-[224px]')}
            >
                {/* <div className='bg-red-400 w-16 h-40 relative' /> */}
                <div className={cn('flex justify-center h-[224px] items-end', progress[0].completed ? 'flex-col items-center' : 'flex-row')}>
                    <img
                        src='/holden-red-hunting-hat.png'
                        className={cn('relative max-h-[12.5rem] w-16 h-16 rounded-full top-6 right-3 z-10', !progress[0].completed ? ' hidden' : 'flex')}
                    />
                    <img src='/holden-stick-figure.png' className='h-40 relative' />
                </div>
                <div className='absolute -bottom-28 left-0 w-full flex justify-center gap-5'>
                    <CircleChevronLeft
                        strokeWidth={2.5}
                        className='w-14 h-14 hover:scale-110 rounded-full transition-all cursor-pointer select-none border-transparent'
                        onMouseDown={() => (inputMethod == 'mouse' ? touchMove('left') : {})}
                        onMouseUp={() => (inputMethod == 'mouse' ? touchEnd('left') : {})}
                        onTouchStart={() => (inputMethod == 'touch' ? touchMove('left') : {})}
                        onTouchEnd={() => (inputMethod == 'touch' ? touchEnd('left') : {})}
                    />
                    <CircleChevronRight
                        strokeWidth={2.5}
                        className='w-14 h-14 hover:scale-110 rounded-full transition-all cursor-pointer select-none border-transparent'
                        onMouseDown={() => (inputMethod == 'mouse' ? touchMove('right') : {})}
                        onMouseUp={() => (inputMethod == 'mouse' ? touchEnd('right') : {})}
                        onTouchStart={() => (inputMethod == 'touch' ? touchMove('right') : {})}
                        onTouchEnd={() => (inputMethod == 'touch' ? touchEnd('right') : {})}
                    />
                </div>
            </Transition>
        </>
    );
};

export default Holden;

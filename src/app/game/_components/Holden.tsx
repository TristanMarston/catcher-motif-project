import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGameContext } from '../context';
import { Transition } from '@headlessui/react';

const Holden = () => {
    const [showHolden, setShowHolden] = useState(false);
    setTimeout(() => setShowHolden(true), 100);

    const context = useGameContext();
    if (context === undefined) {
        throw new Error('useContext(GameContext) must be used within a GameContext.Provider');
    }
    const { xPos, setXPos } = context;
    const [keyState, setKeyState] = useState<{ [key: string]: boolean }>({});

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

    const moveCharacter = () => {
        if (keyState['ArrowLeft'] || keyState['a'] || keyState['left']) {
            setXPos((prevX) => prevX - 2.5); // Move left by reducing x position
        }
        if (keyState['ArrowRight'] || keyState['d'] || keyState['right']) {
            setXPos((prevX) => prevX + 2.5); // Move right by increasing x position
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyRelease);

        const interval = setInterval(moveCharacter, 1000 / 120); // Adjust this value for smoother movement

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', handleKeyRelease);
            clearInterval(interval);
        };
    }, [keyState]);

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
            <Transition show={showHolden} appear={false} enter='transition-all duration-[1500ms]' enterFrom='scale-0' enterTo='scale-100' className='w-full flex justify-center'>
                <div
                    className='bg-red-400 w-16 h-40 relative'
                    style={{
                        left: `${xPos}px`,
                    }}
                />
            </Transition>
            <Transition show={showHolden} appear={false} enter='transition-all duration-[1500ms]' enterFrom='opacity-0' enterTo='opacity-100'>
                <div className='absolute bottom-[5%] flex w-full justify-center gap-5'>
                    <CircleChevronLeft
                        strokeWidth={2.5}
                        className='w-14 h-14 hover:bg-background-dark rounded-full transition-all cursor-pointer select-none border-transparent'
                        onMouseDown={() => touchMove('left')}
                        onMouseUp={() => touchEnd('left')}
                        onTouchStart={() => touchMove('left')}
                        onTouchEnd={() => touchEnd('left')}
                    />
                    <CircleChevronRight
                        strokeWidth={2.5}
                        className='w-14 h-14 hover:bg-background-dark rounded-full transition-all cursor-pointer select-none border-transparent'
                        onMouseDown={() => touchMove('right')}
                        onMouseUp={() => touchEnd('right')}
                        onTouchStart={() => touchMove('right')}
                        onTouchEnd={() => touchEnd('right')}
                    />
                </div>
            </Transition>
        </>
    );
};

export default Holden;

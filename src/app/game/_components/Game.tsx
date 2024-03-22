'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Holden from './Holden';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { Home, ChevronsRight, Trophy, ChevronsUp, ChevronsDown, Minus, Smile, BadgeDollarSign, Cigarette } from 'lucide-react';
import { useGameContext } from '../context';
import StatsDisplay from './StatsDisplay';
import Modal from './Modal';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const cityBuildings: string[] = [
    '/city-building-1-broken.png',
    '/city-building-2-broken.png',
    '/city-building-5.png',
    '/city-building-6.png',
    '/city-building-7.png',
    '/city-building-8.png',
    '/city-building-9.png',
    '/city-building-10.png',
];

const Game = () => {
    const context = useGameContext();
    if (context === undefined) {
        throw new Error('useContext(GameContext) must be used within a GameContext.Provider');
    }
    const { xPos, setXPos, happiness, setHappiness, money, setMoney, innocence, setInnocence, progress, setProgress } = context;
    const [achievementsModalOpened, setAchievementsModalOpened] = useState(false);
    const [huntingHatModalOpened, setHuntingHatModalOpened] = useState(false);
    const [expulsionModalOpened, setExpulsionModalOpened] = useState(false);
    const router = useRouter();

    // positions
    const redHuntingHatPos = 500;

    const stradlaterDecisionPos = 1000;
    const [stradlaterDecision, setStradlaterDecision] = useState<string>('');

    const penceyDecisionPos = 1300;
    const [penceyDecision, setPenceyDecision] = useState<string>('');

    const callDecisionPos = 1700;
    const [callDecision, setCallDecision] = useState<string>('');

    const firstDestinationChoicePos = 2250;
    const [firstDestinationChoice, setFirstDestinationChoice] = useState<string>('');

    const destinationInteractionPos = 2500;
    const [destinationDecision, setDestinationDecision] = useState<string>('');

    const finalDestinationPos = 2800;
    const [finalDestinationDecision, setFinalDestinationDecision] = useState<string>('');

    const [isShowing, setIsShowing] = useState(false);
    setTimeout(() => setIsShowing(true), 100);

    useEffect(() => {
        if (xPos >= redHuntingHatPos - 40 && xPos < redHuntingHatPos) {
            if (progress[0].completed == false) {
                setProgress((prev) => {
                    const items = prev;
                    items[0].reached = true;
                    setHuntingHatModalOpened(true);
                    return items;
                });
            }
        }
        if (
            (xPos >= callDecisionPos - 40 && xPos < callDecisionPos && penceyDecision == "no, I'm going to tough it out.") ||
            (xPos >= 2000 - 40 && xPos < 2000 && penceyDecision == 'yes, off to NYC!')
        ) {
            if (progress[4].completed == false) {
                setProgress((prev) => {
                    const items = prev;
                    items[4].reached = true;
                    setExpulsionModalOpened(true);
                    return items;
                });
            }
        }
    }, [xPos]);

    useEffect(() => {
        if (finalDestinationDecision.length > 0) router.push('/end');
    }, [finalDestinationDecision]);

    return (
        <div className='flex flex-col game-position'>
            {/* nav & stats */}
            <Transition show={isShowing} appear={false} enter='transition-all duration-[1500ms]' enterFrom='opacity-0' enterTo='opacity-100'>
                <div className='absolute top-4 left-4 flex flex-col items-start gap-3'>
                    <Link className='flex gap-2 items-center justify-center group' href='/'>
                        <Home className='group-hover:text-primary transition-all' />
                        <p className='group-hover:text-primary transition-all'>back to home</p>
                    </Link>
                    {/* <div className='flex gap-2 items-center justify-center group cursor-pointer' onClick={() => setAchievementsModalOpened((prev) => !prev)}>
                        <Trophy className='group-hover:text-primary transition-all' />
                        <p className='group-hover:text-primary transition-all'>achievements</p>
                    </div> */}
                    <Modal openedModal={achievementsModalOpened} setOpenedModal={setAchievementsModalOpened}>
                        <div></div>
                    </Modal>
                </div>
                <StatsDisplay />
            </Transition>

            {/* actual game */}
            <Transition
                show={isShowing}
                appear={false}
                enter='transition-all duration-[1500ms]'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                className='max-h-[800px] flex w-screen absolute bottom-20 left-0'
            >
                <Modal openedModal={huntingHatModalOpened} setOpenedModal={setHuntingHatModalOpened}>
                    <div className='w-full h-full p-6 flex flex-col gap-2'>
                        <h1 className='font-extrabold tracking-wider text-3xl'>Holden's Red Hunting Hat</h1>
                        <div className='flex flex-col mb-2'>
                            <p className='flex items-center gap-1 text-lg'>
                                <ChevronsUp className='h-10 w-10 text-success' />
                                <p>+10% happiness</p>
                            </p>
                            <p className='flex items-center gap-1 text-lg'>
                                <ChevronsDown className='h-10 w-10 text-error' />
                                <p>-$1 money</p>
                            </p>
                            <p className='flex items-center gap-1 text-lg'>
                                <ChevronsUp className='h-10 w-10 text-success' />
                                <p>+10% innocence</p>
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                if (!progress[0].completed) {
                                    setHappiness((prev) => prev + 10);
                                    setMoney((prev) => prev - 1);
                                    setInnocence((prev) => prev + 10);
                                    setProgress((prev) => {
                                        const items = [...prev];
                                        items[0].completed = true;
                                        return items;
                                    });
                                }
                                setHuntingHatModalOpened(false);
                            }}
                            className='text-md w-full lobile:text-lg outline-none tablet:text-xl flex items-center justify-center rounded-lg py-2 lobile:py-3 bg-primary text-white font-black tracking-wider shadow-[0_7px_0_#da8484] hover:shadow-none hover:translate-y-[7px] transition-all'
                        >
                            Accept
                        </button>
                    </div>
                </Modal>
                {/* <div className='absolute justify-center w-full bottom-[650px] lesktop:bottom-[450px] max-h-[300px] flex lesktop:justify-start lesktop:ml-16 desktop:ml-24'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <ChevronsRight key={index} className={cn('relative w-24 lesktop:w-32 h-full top-[350px]')} strokeWidth={2} style={{ left: `${-xPos <= 0 ? -xPos : 0}px` }} />
                    ))}
                </div> */}
                <div className='absolute bottom-24 ml-10 flex flex-col justify-center max-h-[300px]' style={{ left: `${-xPos <= 0 ? -xPos : 0}px` }}>
                    <h1 className='text-3xl text-center font-bold'>PENCEY PREP</h1>
                    <img src='/school.png' className='w-48 h-48 tablet:w-72 tablet:h-72' />
                </div>
                <div className='absolute ml-[80%] bottom-60 max-h-[300px]'>
                    <div className='flex'>
                        <CityBuildings xPos={xPos} length={10} />
                    </div>
                </div>
                <Holden />

                <div className='flex flex-col w-full'>
                    <div className='w-full h-[100px] left-[50%] absolute bottom-12'>
                        <img
                            src='/holden-red-hunting-hat.png'
                            className={cn('absolute w-16 h-16', progress[0].completed && 'hidden')}
                            style={{ left: `${-xPos <= 0 ? -xPos + redHuntingHatPos : 0}px` }}
                        />
                        <Decision
                            decision={stradlaterDecision}
                            setDecision={setStradlaterDecision}
                            title='confront stradlater?'
                            options={[
                                { text: 'go confront him about Jane', happinessChange: -9, moneyChange: 5, innocenceChange: -7, reason: 'gets in a fight' },
                                { text: 'avoid confrontation', happinessChange: 8, moneyChange: 0, innocenceChange: 5, reason: 'did the right thing' },
                            ]}
                            position={stradlaterDecisionPos}
                            progressNum={1}
                            image='/stradlater-stick-figure.png'
                            imageClasses='w-56 h-56 bottom-6'
                        />
                        <Decision
                            decision={penceyDecision}
                            setDecision={setPenceyDecision}
                            title='leave pencey?'
                            options={[
                                { text: 'yes, off to NYC!', happinessChange: 5, moneyChange: 0, innocenceChange: -12, reason: 'ignoring problems' },
                                { text: "no, I'm going to tough it out.", happinessChange: -3, moneyChange: 0, innocenceChange: 8, reason: 'facing problems' },
                            ]}
                            position={penceyDecisionPos}
                            progressNum={2}
                        />
                        {penceyDecision == 'yes, off to NYC!' ? (
                            <Decision
                                decision={callDecision}
                                setDecision={setCallDecision}
                                title='call someone?'
                                options={[
                                    { text: 'call phoebe', happinessChange: 10, moneyChange: -3, innocenceChange: 7, reason: 'reconnection w/ sister' },
                                    { text: 'call jane', happinessChange: -6, moneyChange: -3, innocenceChange: -4, reason: 'childhood joy is gone' },
                                    { text: 'call mom', happinessChange: -7, moneyChange: -3, innocenceChange: -6, reason: 'mom gets mad' },
                                    { text: "don't call anyone", happinessChange: -2, moneyChange: 0, innocenceChange: 3, reason: 'lonely' },
                                ]}
                                position={callDecisionPos}
                                progressNum={3}
                                image='phone-booth.png'
                                imageClasses='bottom-10 w-32'
                            />
                        ) : penceyDecision == "no, I'm going to tough it out." ? (
                            <>
                                <img
                                    src='/document.png'
                                    className={cn('absolute w-24 h-24', progress[4].completed && 'hidden')}
                                    style={{ left: `${-xPos <= 0 ? -xPos + callDecisionPos : 0}px` }}
                                />
                                <Modal openedModal={expulsionModalOpened} setOpenedModal={setExpulsionModalOpened}>
                                    <div className='w-full h-full p-6 flex flex-col gap-2'>
                                        <h1 className='font-extrabold tracking-wider text-3xl'>Holden's Expulsion Letter From Pencey</h1>
                                        <div className='flex flex-col mb-2'>
                                            <p className='flex items-center gap-1 text-lg'>
                                                <ChevronsDown className='h-10 w-10 text-error' />
                                                <p>-5% happiness</p>
                                            </p>
                                            <p className='flex items-center gap-1 text-lg'>
                                                <Minus className='h-10 w-10 text-warning' />
                                                <p>-$1 money</p>
                                            </p>
                                            <p className='flex items-center gap-1 text-lg'>
                                                <ChevronsDown className='h-10 w-10 text-error' />
                                                <p>-10% innocence</p>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (!progress[4].completed) {
                                                    setHappiness((prev) => prev + 10);
                                                    setMoney((prev) => prev - 1);
                                                    setInnocence((prev) => prev + 10);
                                                    setProgress((prev) => {
                                                        const items = [...prev];
                                                        items[4].completed = true;
                                                        return items;
                                                    });
                                                    toast(<h3 className='font-bold text-2xl w-full'>You may not return home or to Pencey now.</h3>);
                                                }
                                                setExpulsionModalOpened(false);
                                            }}
                                            className='text-md w-full lobile:text-lg outline-none tablet:text-xl flex items-center justify-center rounded-lg py-2 lobile:py-3 bg-primary text-white font-black tracking-wider shadow-[0_7px_0_#da8484] hover:shadow-none hover:translate-y-[7px] transition-all'
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <div></div>
                        )}

                        {penceyDecision == 'yes, off to NYC!' ? (
                            <>
                                <img
                                    src='/document.png'
                                    className={cn('absolute w-24 h-24', progress[4].completed && 'hidden')}
                                    style={{ left: `${-xPos <= 0 ? -xPos + 2000 : 0}px` }}
                                />
                                <Modal openedModal={expulsionModalOpened} setOpenedModal={setExpulsionModalOpened}>
                                    <div className='w-full h-full p-6 flex flex-col gap-2'>
                                        <h1 className='font-extrabold tracking-wider text-3xl'>Holden's Expulsion Letter From Pencey</h1>
                                        <div className='flex flex-col mb-2'>
                                            <p className='flex items-center gap-1 text-lg'>
                                                <ChevronsDown className='h-10 w-10 text-error' />
                                                <p>-5% happiness</p>
                                            </p>
                                            <p className='flex items-center gap-1 text-lg'>
                                                <Minus className='h-10 w-10 text-warning' />
                                                <p>+$0 money</p>
                                            </p>
                                            <p className='flex items-center gap-1 text-lg'>
                                                <ChevronsDown className='h-10 w-10 text-error' />
                                                <p>-15% innocence</p>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (!progress[4].completed) {
                                                    setHappiness((prev) => prev - 5);
                                                    setMoney((prev) => prev - 1);
                                                    setInnocence((prev) => prev - 15);
                                                    setProgress((prev) => {
                                                        const items = [...prev];
                                                        items[4].completed = true;
                                                        return items;
                                                    });
                                                    toast(<h3 className='font-bold text-2xl w-full'>You may not return home or to Pencey now.</h3>);
                                                }
                                                setExpulsionModalOpened(false);
                                            }}
                                            className='text-md w-full lobile:text-lg outline-none tablet:text-xl flex items-center justify-center rounded-lg py-2 lobile:py-3 bg-primary text-white font-black tracking-wider shadow-[0_7px_0_#da8484] hover:shadow-none hover:translate-y-[7px] transition-all'
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <div></div>
                        )}

                        <Decision
                            decision={firstDestinationChoice}
                            setDecision={setFirstDestinationChoice}
                            title='where to?'
                            options={[
                                { text: 'go to a hotel', happinessChange: 4, moneyChange: -15, innocenceChange: 3, reason: 'finally able to rest' },
                                { text: 'go to central park', happinessChange: -3, moneyChange: 0, innocenceChange: 10, reason: 'worried about ducks' },
                                { text: 'visit the museum', happinessChange: 11, moneyChange: -10, innocenceChange: 8, reason: 'feels very nostalgic' },
                                { text: 'drink at times square', happinessChange: -6, moneyChange: -20, innocenceChange: -14, reason: 'lonely' },
                            ]}
                            position={firstDestinationChoicePos}
                            progressNum={5}
                        />

                        {firstDestinationChoice == 'go to a hotel' ? (
                            <Decision
                                decision={destinationDecision}
                                setDecision={setDestinationDecision}
                                title="there's a prostitute. what do you do?"
                                options={[
                                    { text: 'pay $5 for a throw', happinessChange: -10, moneyChange: -10, innocenceChange: -15, reason: "doesn't do anything" },
                                    { text: 'pay $15 for the whole night', happinessChange: -15, moneyChange: -15, innocenceChange: -20, reason: 'gets profoundly lonely' },
                                    { text: 'run away', happinessChange: 3, moneyChange: 0, innocenceChange: 5, reason: 'did the right thing' },
                                ]}
                                position={destinationInteractionPos}
                                progressNum={6}
                                image='/maurice-and-pros.png'
                                imageClasses='w-96 bottom-8'
                            />
                        ) : firstDestinationChoice == 'go to central park' ? (
                            <Decision
                                decision={stradlaterDecision}
                                setDecision={setStradlaterDecision}
                                title='what do you do at central park?'
                                options={[
                                    { text: 'go find the ducks', happinessChange: 8, moneyChange: 0, innocenceChange: 9, reason: 'actually find the ducks!' },
                                    { text: 'just walk around', happinessChange: 12, moneyChange: 0, innocenceChange: 10, reason: 'finds boy singing' },
                                ]}
                                position={destinationInteractionPos}
                                progressNum={7}
                                image='/rubber-duck.png'
                                imageClasses='bottom-10 w-32 h-32'
                            />
                        ) : firstDestinationChoice == 'visit the museum' ? (
                            <Decision
                                decision={stradlaterDecision}
                                setDecision={setStradlaterDecision}
                                title='what do you do at the museum?'
                                options={[
                                    { text: 'think about good memories', happinessChange: -2, moneyChange: 0, innocenceChange: 8, reason: 'gets sad remembering good times' },
                                    { text: 'just explore the museum', happinessChange: 5, moneyChange: 0, innocenceChange: 6, reason: 'has a good time' },
                                ]}
                                position={destinationInteractionPos}
                                progressNum={8}
                                image='/museum.png'
                                imageClasses='w-48 bottom-10'
                            />
                        ) : firstDestinationChoice == 'drink at times square' ? (
                            <Decision
                                decision={stradlaterDecision}
                                setDecision={setStradlaterDecision}
                                title='how many more drinks?'
                                options={[
                                    { text: '3 more', happinessChange: 8, moneyChange: -15, innocenceChange: -17, reason: "so drunk can't even think" },
                                    { text: '2 more', happinessChange: -7, moneyChange: -10, innocenceChange: -12, reason: 'is intoxicated & depressed' },
                                    { text: '1 more', happinessChange: 4, moneyChange: -5, innocenceChange: -5, reason: 'has a good time' },
                                    { text: "i'm done", happinessChange: 3, moneyChange: 0, innocenceChange: 3, reason: 'made the right choice' },
                                ]}
                                position={destinationInteractionPos}
                                progressNum={9}
                                image='/beer.png'
                                imageClasses='w-32 h-32 bottom-10'
                            />
                        ) : (
                            <div></div>
                        )}

                        <Decision
                            decision={finalDestinationDecision}
                            setDecision={setFinalDestinationDecision}
                            title='where to now?'
                            options={[
                                { text: 'go west and live life there', happinessChange: -15, moneyChange: -money, innocenceChange: -10, reason: 'does not go as planned' },
                                { text: 'go home and reconnect with Phoebe', happinessChange: 20, moneyChange: 0, innocenceChange: 12, reason: 'gets really happy' },
                            ]}
                            position={finalDestinationPos}
                            progressNum={10}
                        />
                    </div>
                    <div className='w-[4500px] h-1 bg-black absolute bottom-20' style={{ left: `${-xPos <= 0 ? -xPos : 0}px` }} />
                </div>
            </Transition>
        </div>
    );
};

type Choice = {
    text: string;
    happinessChange: number;
    moneyChange: number;
    innocenceChange: number;
    reason: string;
};

type DecisionProps = {
    decision: string;
    setDecision: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    options: Choice[];
    position: number;
    progressNum: number;
    image?: string;
    imageClasses?: string;
};

type IconProps = {
    value: number;
};

type StatPreviewProps = {
    happinessChange: number;
    moneyChange: number;
    innocenceChange: number;
};

const Decision = ({ decision, setDecision, title, options, position, progressNum, image, imageClasses }: DecisionProps) => {
    const [openedModal, setOpenedModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(-1);

    const context = useGameContext();
    if (context === undefined) {
        throw new Error('useContext(GameContext) must be used within a GameContext.Provider');
    }
    const { xPos, progress, setProgress, setHappiness, setMoney, setInnocence } = context;

    useEffect(() => {
        if (xPos >= position - 40 && xPos < position) {
            if (progress[progressNum].completed == false) {
                setProgress((prev) => {
                    const items = prev;
                    items[progressNum].reached = true;
                    setOpenedModal(true);
                    return items;
                });
            }
        }
    }, [xPos]);

    const ArrowIcon = ({ value }: IconProps) => {
        if (value > 0) return <ChevronsUp className='text-success' strokeWidth={3} />;
        else if (value < 0) return <ChevronsDown className='text-error' strokeWidth={3} />;
        else if (value == 0) return <Minus className='text-warning' strokeWidth={3} />;
    };

    const StatPreview = ({ happinessChange, moneyChange, innocenceChange }: StatPreviewProps) => {
        return (
            <div className='flex gap-2 justify-center'>
                {Array.from({ length: 3 }).map((_, index) => {
                    const value = index == 0 ? happinessChange : index == 1 ? moneyChange : index == 2 ? innocenceChange : 0;

                    return (
                        <div className='flex items-center'>
                            <ArrowIcon value={value} />
                            <h3 className={cn(value > 0 ? 'text-success' : value < 0 ? 'text-error' : 'text-warning')}>{Math.abs(value)}</h3>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <img
                src={image != null ? (image.length > 0 ? image : '/road-sign.png') : '/road-sign.png'}
                className={cn('absolute', imageClasses != null ? imageClasses : 'w-32 h-32', progress[progressNum].completed && 'hidden')}
                onClick={() => setOpenedModal(!progress[progressNum].completed)}
                style={{ left: `${-xPos <= 0 ? -xPos + position : 0}px` }}
            />
            <Modal openedModal={openedModal} setOpenedModal={setOpenedModal}>
                <div className='w-full h-full p-6 flex flex-col gap-2'>
                    <h1 className='font-extrabold tracking-wider text-3xl'>{title}</h1>
                    <div className='flex flex-col gap-4 mb-6 mt-2'>
                        {options.map((data, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOption((prev) => (prev == index ? -1 : index))}
                                className={cn(
                                    'text-xl outline-none flex items-center justify-between px-4 border-primary border-2 rounded-lg py-2 lobile:py-3 text-primary font-black tracking-wider transition-all',
                                    selectedOption == index
                                        ? 'bg-primary border-primary-dark text-white shadow-[0_5px_0_#da8484] -mt-[5px]'
                                        : 'bg-transparent hover:shadow-none hover:translate-y-[5px] shadow-[0_5px_0_#de9292]'
                                )}
                            >
                                {data.text}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            if (!progress[progressNum].completed && selectedOption != -1) {
                                setHappiness((prev) => prev + options[selectedOption].happinessChange);
                                setMoney((prev) => prev + options[selectedOption].moneyChange);
                                setInnocence((prev) => prev + options[selectedOption].innocenceChange);
                                setProgress((prev) => {
                                    const items = [...prev];
                                    items[progressNum].completed = true;
                                    return items;
                                });
                                setDecision(options[selectedOption].text);
                                setSelectedOption(-1);
                                setOpenedModal(false);
                                toast(
                                    <div className='flex flex-col gap-3'>
                                        <h1 className='font-bold text-xl'>{options[selectedOption].reason}</h1>
                                        <StatPreview
                                            happinessChange={options[selectedOption].happinessChange}
                                            moneyChange={options[selectedOption].moneyChange}
                                            innocenceChange={options[selectedOption].innocenceChange}
                                        />
                                    </div>
                                );
                            } else if (selectedOption == -1) {
                                toast.error('please select an option', {
                                    duration: 4000,
                                    position: 'top-center',
                                    className: 'font-bold',
                                    style: { zIndex: 999999 },
                                });
                            }
                        }}
                        className='text-md w-full lobile:text-lg outline-none tablet:text-xl flex items-center justify-center rounded-lg py-2 lobile:py-3 bg-primary text-white font-black tracking-wider shadow-[0_7px_0_#da8484] hover:shadow-none hover:translate-y-[7px] transition-all'
                    >
                        Submit
                    </button>
                </div>
            </Modal>
        </>
    );
};

type CityBuildingsProps = {
    xPos: number;
    length: number;
};

const CityBuildings = ({ xPos, length }: CityBuildingsProps) => {
    const cityBuildingImages = useMemo(() => {
        return Array.from({ length: length }).map((_, index) => {
            const src = cityBuildings[Math.floor(Math.random() * cityBuildings.length)];
            const marginRight = `${Math.floor(Math.random() * 500) + 20}px`;
            return { key: index, src, marginRight };
        });
    }, []);

    return cityBuildingImages.map(({ key, src, marginRight }) => (
        <img
            key={key}
            src={src}
            alt='citybuilding'
            width='w-full'
            height='h-full'
            className='relative top-40 opacity-[10%]'
            style={{ left: `${-xPos <= 0 ? -xPos + 500 / 2 : 0}px`, marginRight: marginRight }}
        />
    ));
};

export default Game;

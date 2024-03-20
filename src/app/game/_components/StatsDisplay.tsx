import { cn } from '@/lib/utils';
import { Smile, Meh, Frown, BadgeDollarSign, Handshake } from 'lucide-react';
import { useGameContext } from '../context';
import React from 'react';

type StatDisplay = {
    name: string;
    value: number;
    max: number;
};

type StatsDisplayIconProps = {
    name: string;
    value: number;
    max: number;
};

const StatsDisplay: React.FC = () => {
    const context = useGameContext();
    if (context === undefined) {
        throw new Error('useContext(GameContext) must be used within a GameContext.Provider');
    }
    const { happiness, money, friends } = context;

    const statsArray: StatDisplay[] = [
        { name: 'happiness', value: happiness, max: 100 },
        { name: 'money', value: money, max: 150 },
        { name: 'friends', value: friends, max: 5 },
    ];

    const Icon = ({ name, value, max }: StatsDisplayIconProps) => {
        let newClass = `w-12 laptop:w-20 h-12 laptop:h-20`;
        if (name == 'happiness') {
            if (value >= (max / 3) * 2) return <Smile className={newClass} />;
            if (value >= max / 3) return <Meh className={newClass} />;
            else return <Frown className={newClass} />;
        } else if (name == 'money') return <BadgeDollarSign className={newClass} />;
        else if (name == 'friends') return <Handshake className={newClass} />;
    };

    return (
        <div className='absolute top-4 right-4 flex flex-col taptop:flex-row gap-5'>
            {statsArray.map((stat, index) => (
                <div
                    key={stat.name + index}
                    className='flex items-center rounded-md gap-2 w-48 laptop:w-56 px-5 lobile:py-1.5 border-[3px] border-primary shadow-[5px_5px_0px_0px_#de9292] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] cursor-pointer transition-all'
                >
                    <Icon name={stat.name} value={stat.value} max={stat.max} />
                    <div className='w-full flex gap-2 justify-start items-center lobile:block lobile:justify-center'>
                        <h1 className='hidden lobile:block text-xl laptop:text-2xl font-bold'>{stat.name}</h1>
                        <div className='relative bottom-2 w-full lobile:relative lobile:bottom-2.5 lobile:block'>
                            <div
                                className={cn(
                                    'relative flex justify-center items-center top-4 lobile:top-4 rounded-full w-full h-4 z-[9999] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]',
                                    stat.value >= (stat.max / 3) * 2 ? 'bg-success' : stat.value >= stat.max / 3 ? 'bg-warning' : 'bg-error'
                                )}
                                style={{ width: `${(stat.value / stat.max) * 100}%` }}
                            >
                                {stat.name == 'happiness' && stat.value >= stat.max / 3 ? `${stat.value}%` : ''}
                                {stat.name == 'money' && stat.value >= stat.max / 3 ? `$${stat.value}` : ''}
                                {stat.name == 'friends' && stat.value >= stat.max / 3 ? `${stat.value}` : ''}
                            </div>
                            <div className='relative rounded-full flex justify-center items-center w-full h-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                                {stat.name == 'happiness' && stat.value < stat.max / 3 ? `${stat.value}%` : ''}
                                {stat.name == 'money' && stat.value < stat.max / 3 ? `$${stat.value}` : ''}
                                {stat.name == 'friends' && stat.value < stat.max / 3 ? `${stat.value}` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsDisplay;

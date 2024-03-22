import React, { createContext, useState, useContext } from 'react';

type Context = {
    xPos: number;
    setXPos: React.Dispatch<React.SetStateAction<number>>;
    happiness: number;
    setHappiness: React.Dispatch<React.SetStateAction<number>>;
    money: number;
    setMoney: React.Dispatch<React.SetStateAction<number>>;
    friends: number;
    setFriends: React.Dispatch<React.SetStateAction<number>>;
    progress: Items[];
    setProgress: React.Dispatch<React.SetStateAction<Items[]>>;
    movementEnabled: boolean;
    setMovementEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

type Items = {
    name: string;
    reached: boolean;
    completed: boolean;
};

// Create the context
const GameContext = createContext<Context | undefined>(undefined);

// Create a custom hook to use the context
export const useGameContext = () => useContext(GameContext);

// Create the provider component
export const MyProvider = ({ children }: any) => {
    const [xPos, setXPos] = useState(0);
    const [happiness, setHappiness] = useState(60);
    const [money, setMoney] = useState(150);
    const [friends, setFriends] = useState(5);
    const [progress, setProgress] = useState<Items[]>([{ name: 'hunting hat', reached: false, completed: false }]);
    const [movementEnabled, setMovementEnabled] = useState(true);

    return (
        <GameContext.Provider
            value={{ xPos, setXPos, happiness, setHappiness, money, setMoney, friends, setFriends, progress, setProgress, movementEnabled, setMovementEnabled }}
        >
            {children}
        </GameContext.Provider>
    );
};

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
    itemsPickedUp: Items;
    setItemsPickedUp: React.Dispatch<React.SetStateAction<Items>>;
    movementEnabled: boolean;
    setMovementEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

type Items = {
    huntingHat: boolean;
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
    const [itemsPickedUp, setItemsPickedUp] = useState({ huntingHat: false });
    const [movementEnabled, setMovementEnabled] = useState(true);

    return (
        <GameContext.Provider
            value={{ xPos, setXPos, happiness, setHappiness, money, setMoney, friends, setFriends, itemsPickedUp, setItemsPickedUp, movementEnabled, setMovementEnabled }}
        >
            {children}
        </GameContext.Provider>
    );
};

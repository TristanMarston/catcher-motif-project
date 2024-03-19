import React, { createContext, useState, useContext } from 'react';

type Context = {
    xPos: number;
    setXPos: React.Dispatch<React.SetStateAction<number>>;
};

// Create the context
const GameContext = createContext<Context | undefined>(undefined);

// Create a custom hook to use the context
export const useGameContext = () => useContext(GameContext);

// Create the provider component
export const MyProvider = ({ children }: any) => {
    const [xPos, setXPos] = useState(0);

    return <GameContext.Provider value={{ xPos, setXPos }}>{children}</GameContext.Provider>;
};

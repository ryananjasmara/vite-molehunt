import React, { createContext, useState, useMemo } from "react";

export interface AppContextProps {
  isSoundOn: boolean;
  setIsSoundOn: (isSoundOn: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  timer: number;
  setTimer: (timer: number) => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);

  const value = useMemo(
    () => ({
      isSoundOn,
      setIsSoundOn,
      score,
      setScore,
      timer,
      setTimer,
    }),
    [isSoundOn, setIsSoundOn, score, setScore, timer, setTimer]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

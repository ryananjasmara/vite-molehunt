import { useContext } from "react";
import { AppContext, AppContextProps } from "../contexts/app.context";

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

import { createContext } from "react";

type HomeContextState = {
    fold: boolean;
};
export const HomeContext = createContext<HomeContextState>({
    fold: false,
});

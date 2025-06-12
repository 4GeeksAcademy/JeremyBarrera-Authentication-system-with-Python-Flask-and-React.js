import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore, actions } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore);
    // Attach actions to context, binding dispatch
    const boundActions = actions(dispatch);
    return (
        <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useGlobalReducer must be used within a StoreProvider");
    return context;
}

export { StoreContext };
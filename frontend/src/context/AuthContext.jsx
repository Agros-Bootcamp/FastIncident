import { createContext, useReducer } from "react";
import { useAxios } from "../hooks/useAxios";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}
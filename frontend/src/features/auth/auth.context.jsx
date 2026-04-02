import { useEffect, useMemo } from "react";
import {createContext, useState} from "react";
import { getUser } from "./services/auth.api";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    // get and set user handler
    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getUser()
                setUser(data.user)
            } catch (err) { 
                console.log(err);
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [setUser, setLoading]);

    return (
        //  value object is recreated on every render, and that can cause all context consumers to re-render even when 
        // the actual values have not changed - useMemo
         <AuthContext.Provider
             value={
                useMemo( () => ({ user, setUser, loading, setLoading }), [user, loading] )
            }
        >
            {children}
         </AuthContext.Provider>
    )
}
import { useEffect } from "react";
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
        <AuthContext.Provider  value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    );

}
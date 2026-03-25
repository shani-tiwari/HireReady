import {createContext, useState} from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    // already added in useAuth for better maintainability
        // useEffect(() => {

        //     const getSetUser = async() => {
        //         try {
        //             const data = await getUser();
        //             setUser(data.user);
        //         } catch (err) {
        //             console.log(err);
        //         } finally {
        //             setLoading(false);
        //         }
        //     }

        //     getSetUser();

        // }, []);

    return (
        <AuthContext.Provider  value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    );

}
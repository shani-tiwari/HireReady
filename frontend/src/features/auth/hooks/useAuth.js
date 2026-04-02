import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { loginUser, registerUser, logoutUser  } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    // login handler
    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await loginUser({ email, password });
            setUser(data.user)
        } catch (err) {
            console.log(err);
            setUser(null)
        } finally {
            setLoading(false)
        }
    };

    // register handler
    const handleRegister = async ({ name, email, password }) => {
        setLoading(true)
        try {
            const data = await registerUser({ name, email, password });
            setUser(data.user)
        } catch (err) {
            console.log(err + "register error");
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    // logout handler
    const handleLogout = async () => {
        setLoading(true);
        try {
            setUser(null);
            await logoutUser();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    //  get and set user handler
    // useEffect(() => {

    //     const getAndSetUser = async () => {
    //         try {
    //             const data = await getUser()
    //             setUser(data.user)
    //         } catch (err) { 
    //             console.log(err);
    //             setUser(null)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     getAndSetUser()

    // }, [setUser, setLoading]);

    return { user, loading, handleRegister, handleLogin, handleLogout };

}
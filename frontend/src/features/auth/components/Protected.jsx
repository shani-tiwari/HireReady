import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";


/**
 * @name Protected - component for protecting routes
 * @description Protects routes from unauthorized access
 * @param {React.ReactNode} children - The component to render if the user is authenticated
 * @returns {React.ReactNode} The component to render if the user is authenticated
 */
export default function Protected({children}) {

    const { loading, user } = useAuth();
    const navigate = useNavigate();

    if(loading){
        return <h1>Loading...</h1>
    }

    if(!user){
        return navigate('/login');
    }

    // return(
    //     {children}
    // );
    return children;
}

import {Navigate} from "react-router-dom";


const ProtectedRoute = ({element, isLoggedIn}) => {
    return (
        isLoggedIn ?
        element :
        <Navigate to="/sing-in" replace />
    );
}

export default ProtectedRoute;
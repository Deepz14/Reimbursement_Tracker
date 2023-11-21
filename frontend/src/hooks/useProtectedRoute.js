import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const useProtectedRoute = () => {
    const user = useSelector((state) => state.user);
    const getUserFromSessionStorage = JSON.parse(sessionStorage.getItem('user'))
    return user || getUserFromSessionStorage?.uId ? <Outlet /> : <Navigate to={"/auth"} />
}

export default useProtectedRoute;
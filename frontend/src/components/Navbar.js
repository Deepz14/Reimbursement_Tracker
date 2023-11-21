import NavLogo from "../../src/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/userSlice";
import { redirect  } from "react-router-dom";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const getUserFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));
    const dispatch = useDispatch();

    const logout = () => {
        handlerLogout();
    }

    const handlerLogout = async() => {
        const payload = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        const userLogout = await fetch(process.env.REACT_APP_API_ENDPOINT + '/api/auth/logout/', payload);
        const response = await userLogout.json();
        console.log("response: ", response);
        if(response?.success){
            sessionStorage.clear();
            dispatch(remove());
            redirect("/auth");
        }else{
            // error handling
        }
    }


    return (
        <div className="w-full border border-gray-300">
            <nav className="flex items-center justify-between">
                <a className="flex items-center w-[180px]">
                    <img className="h-13 w-16" alt="nav-logo" src={NavLogo} />
                    <span className="pt-2 text-sm">Reimbursement Tracker</span>
                </a>
                <ul className="border border-gray-300 mr-5">
                    {
                        (user?.uId || getUserFromSessionStorage?.uId) &&
                        (
                            <li><button onClick={logout} className="px-3 py-1 text-sm rounded-md hover:text-red-600">Log out</button></li>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;
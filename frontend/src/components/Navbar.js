import NavLogo from "../../src/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/userSlice";
import { useNavigate  } from "react-router-dom";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const getUserFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            navigate("/auth");
        }else{
            // error handling
        }
    }


    return (
        <div className="w-full border border-gray-300 shadow">
            <nav className="flex items-center justify-between">
                <a className="flex items-center w-[180px]">
                    <img className="h-13 w-16" alt="nav-logo" src={NavLogo} />
                    <span className="pt-2 text-sm">Reimbursement Tracker</span>
                </a>
                    {
                        (user?.uId || getUserFromSessionStorage?.uId) &&
                        <ul className="flex items-center justify-around mr-5 w-[260px] cursor-pointer">
                            <li>
                                <p onClick={() => navigate("/")} className="px-3 py-1 text-sm border border-3 border-gray-500 rounded hover:bg-blue-600 hover:text-white hover:border-0">Home</p>
                            </li>
                            <li>
                                <p onClick={() => navigate("/addexpense")} className="px-3 py-1 text-sm border border-3 border-gray-500 rounded hover:bg-green-600 hover:text-white hover:border-0">Add Expense</p>
                            </li>
                            <li>
                                <button onClick={logout} className="px-3 py-1 text-sm border border-gray-500 rounded hover:bg-red-600 hover:text-white hover:border-0">Log out</button>
                            </li>
                        </ul>
                    }
            </nav>
        </div>
    )
}

export default Navbar;
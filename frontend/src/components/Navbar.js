import NavLogo from "../../src/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/userSlice";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const getUserFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));
    const dispatch = useDispatch();

    const handlerLogout = () => {
        sessionStorage.clear();
        dispatch(remove());
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
                            <li><button onClick={handlerLogout} className="px-3 py-1 text-sm rounded-md hover:text-red-600">Log out</button></li>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;
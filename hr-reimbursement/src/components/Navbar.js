import NavLogo from "../../src/logo.jpg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
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
            </nav>
        </div>
    )
}

export default Navbar;
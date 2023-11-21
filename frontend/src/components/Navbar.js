import NavLogo from "../../src/logo.jpg";
const Navbar = () => {
    return (
        <div className="w-full border border-gray-300">
            <nav>
                <a className="flex items-center w-[180px]">
                    <img className="h-13 w-16" alt="nav-logo" src={NavLogo} />
                    <span className="pt-2 text-sm">Reimbursement Tracker</span>
                </a>
                {/* <ul>
                    <li><a>Sign Up</a></li>
                    <li><a>Login</a></li>
                </ul> */}
            </nav>
        </div>
    )
}

export default Navbar;
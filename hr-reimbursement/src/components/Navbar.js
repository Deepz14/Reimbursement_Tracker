import NavLogo from "../../src/logo.jpg";

const Navbar = () => {
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
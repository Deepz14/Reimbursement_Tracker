import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import CreateAccount from "./createAccount";

const Body = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <CreateAccount />
            </Router>
        </div>
    )
}

export default Body;
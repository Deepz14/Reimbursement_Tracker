import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import NewAccount from "./NewAccount";

const Body = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <NewAccount />
            </Router>
        </div>
    )
}

export default Body;
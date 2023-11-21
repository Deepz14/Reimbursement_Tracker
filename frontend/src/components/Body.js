import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Authentication from './Authentication';
import Navbar from './Navbar';
import SignUp from "./Signup";
import Login from "./Login";
import Expenses from './Expenses';

const Body = () => {
    const userInfo = useSelector((state) => state.user);
    return (
        <div>
            <Navbar />
            <Router>
                <Routes>
                    <Route exact path="/" element={<Expenses />}></Route>
                    <Route element={<Authentication />} path="auth">
                        <Route index element={<SignUp />} />
                        <Route element={<SignUp />} path='signup' />
                        <Route element={<Login />} path='login' />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default Body;
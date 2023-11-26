import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from './Authentication';
import Navbar from './Navbar';
import SignUp from "./Signup";
import Login from "./Login";
import Expenses from './Expenses';
import ProtectedRoute from "../hooks/useProtectedRoute";
import AddExpense from "./AddExpense";
import PendingPayments from "./PendingPayments";
import ViewExpense from "./ViewExpense";

const Body = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route exact path="/" element={<Expenses />}></Route>
                        <Route element={<AddExpense />} path="addexpense"></Route>
                        <Route element={<PendingPayments />} path="pendingPayments"></Route>
                        <Route element={<ViewExpense />} path="viewexpense/:expId"></Route>
                    </Route>
                    <Route element={<Authentication />} path="auth">
                        <Route index element={<Login />} />
                        <Route element={<SignUp />} path='signup' />
                        <Route element={<Login />} path='login' />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default Body;
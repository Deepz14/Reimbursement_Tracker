import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Authentication from './components/Authentication';
import Navbar from './components/Navbar';
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Expenses from './components/Expenses';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
            <Routes>
                <Route exact path="/" element={<Expenses />}></Route>
                <Route element={<Authentication />} path="auth">
                    <Route element={<SignUp />} path='signup' />
                    <Route element={<Login />} path='login' />
                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;

import { useState, useRef } from "react";
import { emailValidation, passwordValidation } from "../utils/helper";
import { showSuccessPrompt, showErrorPrompt, showWarningPrompt } from  "../utils/notification";
import LoaderScreen from "./LoaderScreen";

const NewAccount = () => {
    const [loader, setLoader] = useState(false);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const signUp = () => {
        createUserHandler();
    }

    const checkValidation = () => {
        if(!name.current.value || !email.current.value || !password.current.value){
            showWarningPrompt("Name, Email & Password cannot be Empty!")
            return false;
        }
        if(emailValidation(email.current.value)){
            showWarningPrompt("Please enter a valid email address.")
            return false;
        }
        if(passwordValidation(password.current.value)){
            showWarningPrompt("Your password must contain min 8 Characters, with at least a special character and numbers.");
            return false;
        }
        return true;
    }

    const createUserHandler = async() => {
        if (!checkValidation()) return;
        setLoader(true);
        const payload = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name.current.value, email: email.current.value, password: password.current.value })
        };
       
        const userCreate = await fetch(process.env.REACT_APP_API_ENDPOINT + '/api/auth/hr/createuser/', payload);
        const response = await userCreate.json();
        console.log("response: ", response);
        if(response?.error) {
            // display error message
            setLoader(false);
            showErrorPrompt(response?.error)
        }else{
            if(response?.success){
                setLoader(false);
                window.location.replace(process.env.REACT_APP_HR_ACCOUNT_CREATION_REDIRECTION + "/auth");
                //showSuccessPrompt('New Account has been created!');
            }
        }
    }

    return loader ? <LoaderScreen /> : (
        <div className="border border-black-300 rounded md:my-10 mt-12 md:top-0 md:w-1/3 md:mx-auto">
            <h1 className="font-bold text-2xl text-center my-5 md:text-xl">Create Account</h1>
            <div className="my-3 py-2 mx-3 px-3">
                <input ref={name} className="border border-gray-300 rounded w-full md:p-2 p-3" type="text" placeholder="Enter name" />
            </div>
            <div className="my-3 py-2 mx-3 px-3">
                <input ref={email} className="border border-gray-300 rounded w-full md:p-2 p-3" type="email" placeholder="Enter email" />
            </div>
            <div className="my-3 py-2 mx-3 px-3">
                <input ref={password} className="border border-gray-300 rounded w-full md:p-2 p-3" type="password" placeholder="Enter password" />
            </div>
            <div className="my-3 py-2 mx-3 px-3">
                <button onClick={signUp} className="bg-blue-600 text-white rounded w-full md:p-2 p-3">Create Account</button>
            </div>
        </div>
    )
}

export default NewAccount;
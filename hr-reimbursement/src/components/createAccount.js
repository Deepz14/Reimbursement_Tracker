import { useRef, useEffect } from "react";

const CreateAccount = () => {
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const signUp = () => {
        createUserHandler();
    }

    const createUserHandler = async() => {
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
        }else{
            if(response?.success){
                window.location.assign(process.env.REACT_APP_HR_ACCOUNT_CREATION_REDIRECTION + "/auth");
            }
        }
    }


    useEffect(() => {
        // const isAuthUser = JSON.parse(sessionStorage.getItem('user'));
        // userData || isAuthUser?.uId && navigate("/");
    }, []);

    return (
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

export default CreateAccount;
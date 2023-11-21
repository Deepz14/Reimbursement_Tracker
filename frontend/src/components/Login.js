const Login = () => {
    return (
        <div className="border border-black-300 rounded md:my-10 mt-12 md:top-0 md:w-1/3 md:mx-auto">
            <h1 className="font-bold text-2xl text-center my-5 md:text-xl">Login</h1>
            <div className="my-3 py-2 mx-3 px-3">
                <input className="border border-gray-300 w-full md:p-2 p-3" type="email" placeholder="Enter email" />
            </div>
            <div className="my-3 py-2 mx-3 px-3">
                <input className="border border-gray-300 w-full md:p-2 p-3" type="password" placeholder="Enter Password" />
            </div>
            <div className="my-3 py-2 mx-3 px-3">
                <button className="border border-gray-300 w-full md:p-2 p-3">LOGIN</button>
            </div>
            <p className="my-3 py-2 mx-3 px-3 text-center">Don't have an account yet? <span>Sign up</span></p>
        </div>
    )
}

export default Login;
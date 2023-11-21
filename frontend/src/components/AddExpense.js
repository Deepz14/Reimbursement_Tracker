const AddExpense = () => {
    return (
        <div>
            <div className="border border-black-300 rounded md:my-10 mt-12 md:top-0 md:w-1/3 md:mx-auto">
                <h1 className="font-bold text-2xl text-center my-5 md:text-xl">Add Expense</h1>
                <div className="my-3 py-2 mx-3 px-3">
                    <input className="border border-gray-300 w-full md:p-2 p-3" type="text" placeholder="Employee Name" />
                </div>
                <div className="my-3 py-2 mx-3 px-3">
                    <select className="border border-gray-300 rounded  w-full md:p-2 p-3">
                        <option>Select Department</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>HR</option>
                        <option>Finance</option>
                    </select>
                </div>
                <div className="my-3 py-2 mx-3 px-3">
                    <input className="border border-gray-300 rounded w-full md:p-2 p-3" type="date" placeholder="Date" />
                </div>
                <div className="my-3 py-2 mx-3 px-3">
                    <input className="border border-gray-300 rounded w-full md:p-2 p-3" type="text" placeholder="Cost" />
                </div>
                <div className="my-3 py-2 mx-3 px-3">
                    <label htmlFor="cash">
                        <input id="cash" className="" type="radio" name="payment-type" value="Cash" />
                        <span className="pl-2">Cash</span>
                    </label><br/>
                    <label htmlFor="credit">
                        <input id="credit" className="" type="radio" name="payment-type" value="Credit" />
                        <span className="pl-2">Credit</span>
                    </label>
                </div>
                <div className="my-3 py-2 mx-3 px-3">
                    <textarea className="border border-gray-300 rounded w-full md:p-2 p-3" placeholder="Description"></textarea>
                </div>
                <div className="my-3 py-2 mx-3 px-3">
                    <input className="border border-gray-300 rounded w-full md:p-2 p-3" type="file" placeholder="Upload Document" />
                </div>
                <div className="my-3 py-2 mx-3 px-3">
                    <button className="bg-green-600 text-white rounded w-full md:p-2 p-3">Submit</button>
                </div>
            </div>
        </div>
    )
}


export default AddExpense;
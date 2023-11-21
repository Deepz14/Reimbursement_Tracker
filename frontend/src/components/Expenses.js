

const Expenses = () => {
    return (
        <div className="w-[100vw] overflow-x-scroll md:overflow-x-hidden">
            <div className="mt-5 md:mx-5 md:px-3">
                <h1 className="font-bold text-lg my-1">Expenses</h1>
                <table className="w-[100%] ">
                    <thead className="bg-indigo-500 text-white">
                        <tr>
                            <th className="p-3 text-sm font-semibold text-left">Employee Name</th>
                            <th className="p-3 text-sm font-semibold text-left">Department</th>
                            <th className="p-3 text-sm font-semibold text-left">Date</th>
                            <th className="p-3 text-sm font-semibold text-left">Cost</th>
                            <th className="p-3 text-sm font-semibold text-left">Payment Type</th>
                            <th className="p-3 text-sm font-semibold text-left">Expense Type</th>
                            <th className="p-3 text-sm font-semibold text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody className="expense-table-body">
                        <tr>
                            <td className="p-3 text-sm font-semibold">Indiana</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                        </tr>
                        <tr>
                            <td className="p-3 text-sm font-semibold">Indiana</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                        </tr><tr>
                            <td className="p-3 text-sm font-semibold">Indiana</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                        </tr><tr>
                            <td className="p-3 text-sm font-semibold">Indiana</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                        </tr><tr>
                            <td className="p-3 text-sm font-semibold">Indiana</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                        </tr><tr>
                            <td className="p-3 text-sm font-semibold">Indiana</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                            <td className="p-3 text-sm font-semibold">Indianapolis</td>
                        </tr>
                    </tbody> 
                </table>
            </div>
            
        </div>
    )
}

export default Expenses;
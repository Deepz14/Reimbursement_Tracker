import { useEffect, useState } from "react";
import getAuthUserInfo from "../utils/getAuthUserInfo";
import { useSelector } from "react-redux";

const Expenses = () => {
    const [expenseList, setExpenseList] = useState([]);
    const userData = useSelector((state) => state.user);

    useEffect(() => {
        const isAuthUser = getAuthUserInfo();
        if(userData || isAuthUser?.uId){
            fetchExpenseList(isAuthUser);
        }
    }, []);

    const fetchExpenseList = async(authUser) => {
        const payload = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authUser?.token, 
            },
        };
       
        const getData = await fetch(process.env.REACT_APP_API_ENDPOINT + '/api/expense/getrecord/', payload);
        const response = await getData.json();
        console.log("response: ", response);
        if(response?.error) {
            // display error message
        }else{
            if(response?.success){
               setExpenseList(response?.expense);
            }
        }
    }

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
                            <th className="p-3 text-sm font-semibold text-left">Status</th>
                            <th className="p-3 text-sm font-semibold text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody className="expense-table-body">
                        {
                            expenseList.length > 0 ? 
                            expenseList.map((exp) => (
                                
                                    <tr key={exp?._id}>
                                        <td className="p-3 text-sm font-semibold text-left">{exp?.user?.name}</td>
                                        <td className="p-3 text-sm font-semibold text-left">{exp?.department}</td>
                                        <td className="p-3 text-sm font-semibold text-left">{exp?.dateOfExpense}</td>
                                        <td className="p-3 text-sm font-semibold text-left">{exp?.costOfExpense}</td>
                                        <td className="p-3 text-sm font-semibold text-left">{exp?.paymentType}</td>
                                        <td className="p-3 text-sm font-semibold text-left">{exp?.expenseType}</td>
                                        <td className="p-3 text-sm font-semibold text-left">{exp?.status}</td>
                                        <td className="p-3 text-sm font-semibold text-left">{exp?.description}</td>
                                    </tr>
                                
                            ))
                            :
                            ''
                        }
                    </tbody> 
                </table>
            </div>
            
        </div>
    )
}

export default Expenses;
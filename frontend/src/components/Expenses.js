import FileIcon from "../../src/file.png";
import { useEffect, useState } from "react";
import getAuthUserInfo from "../utils/getAuthUserInfo";
import { useSelector } from "react-redux";
import { stausLabel, transformToDate, currencyConversion } from "../utils/helper";


const Expenses = () => {
    const [expenseList, setExpenseList] = useState([]);
    const [page, setPage] = useState(1);
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
        const apiURL = authUser?.role === "employee" ? '/api/expense/getrecord/' : '/api/expense/getAllrecord/';
        const getData = await fetch(process.env.REACT_APP_API_ENDPOINT + apiURL, payload);
        const response = await getData.json();
        console.log("response: ", response);
        if(response?.error) {
            // display error message
        }else{
            if(response?.success){
               setExpenseList(response?.expenses);
            }
        }
    }

    const selectPageHandler = (selectedPage) => {
        if(selectedPage >= 1 && selectedPage <= Math.ceil(expenseList.length / 5) && selectedPage !== page) {
            setPage(selectedPage);
        }
    }

    return (
        <div className="w-[100vw] overflow-x-scroll md:overflow-x-hidden">
            <div className="mt-5 md:mx-5 md:px-3">
                <h1 className="font-bold text-lg my-3"> {getAuthUserInfo()?.role === "employee" ? 'Expenses' : 'All Records'}</h1>
                <table className="w-[100%] border border-gray-200 rounded shadow">
                    <thead className="bg-indigo-500 text-white">
                        <tr>
                            <th className="p-3 text-sm font-semibold text-left">EMPLOYEE NAME</th>
                            <th className="p-3 text-sm font-semibold text-left">DEPARTMENT</th>
                            <th className="p-3 text-sm font-semibold text-left">DATE</th>
                            <th className="p-3 text-sm font-semibold text-left">COST</th>
                            <th className="p-3 text-sm font-semibold text-left">PAYMENT TYPE</th>
                            <th className="p-3 text-sm font-semibold text-left">EXPENSE TYPE</th>
                            <th className="p-3 text-sm font-semibold text-left">STATUS</th>
                            <th className="p-3 text-sm font-semibold text-left">DESCRIPTION</th>
                            <th className="p-3 text-sm font-semibold text-left">Bill Receipt</th>
                        </tr>
                    </thead>
                    <tbody className="expense-table-body">
                        {
                            expenseList?.length > 0 &&
                            expenseList?.slice((page * 5) - 5, page * 5)?.map((exp) => (
                                
                                    <tr key={exp?._id}>
                                        <td className="p-3 text-sm text-left">{exp?.user?.name}</td>
                                        <td className="p-3 text-sm text-left titlecase">{exp?.department}</td>
                                        <td className="p-3 text-sm text-left">{transformToDate(exp?.dateOfExpense)}</td>
                                        <td className="p-3 text-sm text-left">{currencyConversion(exp?.costOfExpense)}</td>
                                        <td className="p-3 text-sm text-left titlecase">{exp?.paymentType}</td>
                                        <td className="p-3 text-sm text-left titlecase">{exp?.expenseType}</td>
                                        <td className="p-3 text-sm text-left titlecase">
                                            <span className={"px-2 py-1 rounded " +
                                           stausLabel(exp?.status)}>{exp?.status}</span>
                                        </td>
                                        <td className="p-3 text-sm text-left"><p className="desc">{exp?.description}</p></td>
                                        <td className="p-3 text-sm text-left">
                                            <a target="_blank" href={exp?.uploadFile[0]?.secure_url}>
                                                <img className="h-5 cursor-pointer" src={FileIcon} alt="fileIcon" />
                                            </a>
                                        </td>
                                    </tr>
                                
                            ))
                        }
                    </tbody> 
                </table>
                {
                        expenseList?.length > 0 ? (
                            <div className="pagination flex justify-center cursor-pointer my-3">
                                <span onClick={() => selectPageHandler(page - 1)} className="rounded-l">◀</span>
                                {[...Array(Math.ceil(expenseList?.length / 5))]?.map((_, i) => {
                                    return <span className={page === i+1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i+1)}
                                     key={i}>{i+1}</span>
                                })}
                                <span onClick={() => selectPageHandler(page + 1)} className="rounded-r">▶</span>
                            </div>
                        ) : (
                            <div className="bg-gray-200 text-center py-3">
                                <h1>No Record Found! 😐</h1>
                            </div>
                        )
                    }
            </div>
            
        </div>
    )
}

export default Expenses;
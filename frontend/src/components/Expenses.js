import FileIcon from "../../src/file.png";
import { useEffect, useState } from "react";
import getAuthUserInfo from "../utils/getAuthUserInfo";
import { useSelector } from "react-redux";
import { stausLabel, transformToDate, currencyConversion } from "../utils/helper";
import Pagination from "./Pagination";


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
        <div className="mt-5 md:mx-5 md:px-3">
            <h1 className="font-bold text-lg m-3 pl-5"> {getAuthUserInfo()?.role === "employee" ? 'Expenses' : 'All Records'}</h1>
            <section class="table__body shadow">
                <table>
                    <thead>
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
                    <tbody>
                        {
                            expenseList?.length > 0 &&
                            expenseList?.slice((page * 5) - 5, page * 5)?.map((exp) => (
                                
                                    <tr key={exp?._id}>
                                        <td>{exp?.user?.name}</td>
                                        <td>{exp?.department}</td>
                                        <td >{transformToDate(exp?.dateOfExpense)}</td>
                                        <td>{currencyConversion(exp?.costOfExpense)}</td>
                                        <td className="titlecase">{exp?.paymentType}</td>
                                        <td className="titlecase">{exp?.expenseType}</td>
                                        <td className="titlecase">
                                            <span className={"px-2 py-1 rounded " +
                                            stausLabel(exp?.status)}>{exp?.status}</span>
                                        </td>
                                        <td><p className="desc">{exp?.description}</p></td>
                                        <td>
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
                    expenseList?.length === 0 && (
                        <div className="bg-gray-200 text-center py-3">
                            <h1>No Record Found! 😐</h1>
                        </div>
                    )
                }
            </section>
            {
                expenseList?.length > 0 && (
                    <Pagination expenseList={expenseList} page={page} selectPageHandler={selectPageHandler} />
                )
            }
        </div>
    )
}

export default Expenses;
import FileIcon from "../../src/file.png";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stausLabel, transformToDate, currencyConversion } from "../utils/helper";
import LoaderScreen from "../utils/loaderScreen";
import getAuthUserInfo from "../utils/getAuthUserInfo";
import { showErrorPrompt, showSuccessPrompt, showConfirmationPrompt } from  "../utils/notification";

const ExpenseCard = ({expenseInfo, expId}) => {
    const [loader, setLoader] = useState(false);
    const message = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = getAuthUserInfo();
        authUser?.role === "employee" && navigate("/");
    }, []);

    const cardActionHandler = async(actionType) => {
        showConfirmationPrompt()
        .then(async (result) => {
            if (result.isConfirmed) {
                setLoader(true);
                const authUser = getAuthUserInfo();
                let messageInfo = ''
                if(actionType === "approved") {
                    messageInfo = message.current.value ? message.current.value : "Your request has been approved! ☺";
                }

                if(actionType === "rejected"){
                    messageInfo = message.current.value ? message.current.value : "Your request has been rejected! ☹";
                }

                let expensePayload = {...expenseInfo, status: actionType, message: messageInfo}
                const payload = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + authUser?.token},
                    body: JSON.stringify(expensePayload)
                };

                const apiURL = `/api/expense/updateExpense/?expId=${expId}`;
                const getData = await fetch(process.env.REACT_APP_API_ENDPOINT + apiURL, payload);
                const response = await getData.json();
                if(response?.error) {
                    // display error message
                    showErrorPrompt(response?.error);
                    setLoader(false);
                }else{
                    if(response?.success){
                        setLoader(false);
                        showSuccessPrompt("Record has been updated!")
                        navigate("/");
                    }
                }
            }
        });
    }

    return loader ? <LoaderScreen /> : (
        <div className="border border-gray-300 md:w-1/2 w-full m-auto mt-5 mb-3 rounded shadow">
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"> <h4>Name :</h4></div>
                <div className="col-span-6"><h4>{expenseInfo?.user?.name}</h4></div>
            </div>
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"><h4>Department :</h4></div>
                <div className="col-span-6"><h4 className="titlecase">{expenseInfo?.department}</h4></div>
            </div>
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"><h4>Date :</h4></div>
                <div className="col-span-6"><h4>{transformToDate(expenseInfo?.dateOfExpense)}</h4></div>
            </div>
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"><h4>Cost :</h4></div>
                <div className="col-span-6"> <h4>{currencyConversion(expenseInfo?.costOfExpense)}</h4></div>
            </div>
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"><h4>Expense Type :</h4></div>
                <div className="col-span-6"> <h4 className="titlecase">{expenseInfo?.expenseType}</h4></div>
            </div>
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"><h4>Payment Type :</h4></div>
                <div className="col-span-6"><h4 className="titlecase">{expenseInfo?.paymentType}</h4></div>
            </div>
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"><h4>Description :</h4></div>
                <div className="col-span-6"><h4 className="desc">{expenseInfo?.description}</h4></div>
            </div>
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"><h4 >Status :</h4></div>
                <div className="col-span-6"><h4 className={"titlecase px-2 py-1 w-[90px] rounded " + stausLabel(expenseInfo?.status)}>{expenseInfo?.status}</h4></div>
            </div>
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"><h4>Bill Receipt :</h4></div>
                <div className="col-span-1">
                    <a target="_blank" href={expenseInfo?.uploadFile[0]?.secure_url}>
                        <img className="h-5 cursor-pointer" src={FileIcon} alt="fileIcon" />
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-12 m-3">
                <div className="col-span-4"><h4>Message :</h4></div>
                <div className="col-span-6">
                    <textarea ref={message} className="border border-gray-300 rounded w-full md:p-1 p-1" placeholder="Enter a message"></textarea>
                </div>
            </div>
            <div className="grid grid-cols-12 mt-3 border border-gray-200 py-2">
                <div className="col-span-12 flex justify-end">
                    <button onClick={() => cardActionHandler('approved')} className="px-3 py-1 rounded bg-green-600 text-white mr-3 hover:bg-transparent hover:text-black hover:border border-gray-400">Approve</button>
                    <button onClick={() => cardActionHandler('rejected')} className="px-3 py-1 rounded bg-red-600 text-white mr-3  hover:bg-transparent hover:text-black hover:border border-gray-400">Reject</button>
                </div>
            </div>
        </div>
    )
}

export default ExpenseCard;
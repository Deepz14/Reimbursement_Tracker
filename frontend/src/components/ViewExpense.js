import FileIcon from "../../src/file.png";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import getAuthUserInfo from "../utils/getAuthUserInfo";
import { showErrorPrompt } from  "../utils/notification";


const ViewExpense = () => {
    const { expId } = useParams();

    useEffect(() => {
        console.log("expID: ", expId);
        if(expId){
            getExpenseInfo();
        }
    },  []);


    const getExpenseInfo = async() => {
        const authUser = getAuthUserInfo();
        const payload = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authUser?.token, 
            },
        };

        const apiURL = `/api/expense/getExpenseById/?expId=${expId}`;
        const getData = await fetch(process.env.REACT_APP_API_ENDPOINT + apiURL, payload);
        const response = await getData.json();
        if(response?.error) {
            // display error message
            showErrorPrompt(response?.error);
        }else{
            if(response?.success){
               
            }
        }

    }

    return (
        <div className="border border-gray-300 md:w-1/2 w-full m-auto mt-8 rounded shadow">
            <div className="grid grid-cols-12 m-3 pb-1">
                <div className="col-span-4">
                    <h4>Name :</h4>
                </div>
                <div className="col-span-6">
                    <h4>Deepz</h4>
                </div>
            </div>
            <div className="grid grid-cols-12 m-3 pb-1">
                <div className="col-span-4">
                    <h4>Department :</h4>
                </div>
                <div className="col-span-6">
                    <h4>HR</h4>
                </div>
            </div>
            <div className="grid grid-cols-12 m-3 pb-1">
                <div className="col-span-4">
                    <h4>Cost :</h4>
                </div>
                <div className="col-span-6">
                    <h4>1200.00</h4>
                </div>
            </div>
            <div className="grid grid-cols-12 m-3 pb-1">
                <div className="col-span-4">
                    <h4>Expense Type :</h4>
                </div>
                <div className="col-span-6">
                    <h4>Late Stay</h4>
                </div>
            </div>
            <div className="grid grid-cols-12 m-3 pb-1">
                <div className="col-span-4">
                    <h4>Payment Type :</h4>
                </div>
                <div className="col-span-6">
                    <h4>Cash</h4>
                </div>
            </div>
            <div className="grid grid-cols-12 m-3 pb-1">
                <div className="col-span-4">
                    <h4>Description :</h4>
                </div>
                <div className="col-span-6">
                    <h4>tsduybvsdubisudfibu</h4>
                </div>
            </div>
            <div className="grid grid-cols-12 m-3 pb-1">
                <div className="col-span-4">
                    <h4>Status :</h4>
                </div>
                <div className="col-span-6">
                    <h4>Processing</h4>
                </div>
            </div>
            <div className="grid grid-cols-12 m-3 pb-1">
                <div className="col-span-4">
                    <h4>Bill Receipt :</h4>
                </div>
                <div className="col-span-6">
                    <a target="_blank" href={""}>
                        <img className="h-5 cursor-pointer" src={FileIcon} alt="fileIcon" />
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-12 mt-3 border border-gray-200 py-2">
                <div className="col-span-12 flex justify-end">
                    <button className="px-3 py-1 rounded bg-green-600 text-white mr-3">Approve</button>
                    <button className="px-3 py-1 rounded bg-red-600 text-white mr-3">Reject</button>
                </div>
            </div>
        </div>
    )
}

export default ViewExpense;
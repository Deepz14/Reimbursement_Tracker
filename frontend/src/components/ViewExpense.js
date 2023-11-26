import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import getAuthUserInfo from "../utils/getAuthUserInfo";
import { showErrorPrompt } from  "../utils/notification";
import LoaderScreen from "../utils/loaderScreen";
import ExpenseCard from "./ExpenseCard";


const ViewExpense = () => {
    const { expId } = useParams();
    const [expenseInfo, setExpenseInfo] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = getAuthUserInfo();
        authUser?.role === "employee" && navigate("/");
        if(expId){
            setLoader(true);
            getExpenseInfo(authUser);
        }
    },  []);


    const getExpenseInfo = async(authUser) => {
        const payload = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + authUser?.token}
        };

        const apiURL = `/api/expense/getExpenseById/?expId=${expId}`;
        const getData = await fetch(process.env.REACT_APP_API_ENDPOINT + apiURL, payload);
        const response = await getData.json();
        if(response?.error) {
            // display error message
            showErrorPrompt(response?.error);
            setLoader(false);
        }else{
            if(response?.success){
                const { user, department, dateOfExpense, costOfExpense, 
                    expenseType, paymentType, description, uploadFile, status } = response?.expense; 
               setExpenseInfo({ user, department, dateOfExpense, costOfExpense, 
                    expenseType, paymentType, description, uploadFile, status
               });
               setLoader(false);
            }
        }
    }

    return loader ? <LoaderScreen /> : expenseInfo && (
        <ExpenseCard expenseInfo={expenseInfo} expId={expId} />
    )
}

export default ViewExpense;
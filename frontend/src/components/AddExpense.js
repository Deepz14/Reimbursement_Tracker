import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import getAuthUserInfo from "../utils/getAuthUserInfo";

const AddExpense = () => {
    const [empName, setEmpName] = useState('');
    const [expenseData, setExpenseData] = useState({});

    const userData = useSelector((state) => state.user);

    useEffect(() => {
        const isAuthUser = getAuthUserInfo();
        if(userData || isAuthUser?.uId){
            setEmpName(isAuthUser?.name);
            setExpenseData({
                department: '',
                dateOfExpense: '',
                costOfExpense: '',
                expenseType: '',
                paymentType: '',
                description: '',
                uploadFile: ''
            });
        }
    }, []);

    const onUploadDocumentHandler = (e) => {
        let updatedExpenseData = {...expenseData, uploadFile: e.target.files[0]};
        setExpenseData(updatedExpenseData);
    }

    const setExpenseDataHandler = (formElemInfo) => {
        let updatedExpenseData = {...expenseData, ...formElemInfo};
        setExpenseData(updatedExpenseData);
    }

    const addRecordHandler = async(e) => {
        e.preventDefault();
        let isInvalid = false;
        let formData = new FormData();

        for (const [key] of Object.entries(expenseData)) {
            if(!expenseData[key]){
                isInvalid = true
            }
            if(key === 'uploadFile'){
                console.log(expenseData[key])
            }
            formData.append(key, expenseData[key])
        }
        if(isInvalid) return;

        const authUser = getAuthUserInfo();
        const payload = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authUser?.token, 
            },
            body: formData
        };
       
        const addRecord = await fetch(process.env.REACT_APP_API_ENDPOINT + '/api/expense/addrecord/', payload);
        const response = await addRecord.json();
        console.log("response: ", response);
        if(response?.error) {
            // display error message
        }else{
            if(response?.success){
                console.log("response: ", response);
            }
        }
    }

    return (
        <div>
            <div className="border border-black-300 rounded md:my-10 mt-12 md:top-0 md:w-1/3 md:mx-auto">
                <h1 className="font-bold text-2xl text-center my-5 md:text-xl">Add Expense</h1>
                <form method="POST" id="addExpenseForm" onSubmit={addRecordHandler}>
                    <div className="my-3 py-2 mx-3 px-3">
                        <input className="border border-gray-300 rounded w-full md:p-2 p-3" type="text" value={empName} placeholder="Employee Name" disabled />
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <select name='department' onChange={(e) => setExpenseDataHandler({'department': e.target.value})} className="border border-gray-300 rounded w-full md:p-2 p-3">
                            <option value=''>Select Department</option>
                            <option value='marketing'>Marketing</option>
                            <option value='sales'>Sales</option>
                            <option value='hr'>HR</option>
                            <option value='finance'>Finance</option>
                            <option value='lnd'>Learning and Development</option>
                            <option value='rnd'>Research and Development</option>
                            <option value='product_dev'>Product Development</option>
                            <option value='admin'>Admin</option>
                            <option value='security'>Security</option>
                        </select>
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <input name='dateOfExpense' onChange={(e) => setExpenseDataHandler({'dateOfExpense': e.target.value})} className="border border-gray-300 rounded w-full md:p-2 p-3" type="date" placeholder="Date" />
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <input name='costOfExpense' onChange={(e) => setExpenseDataHandler({'costOfExpense': e.target.value})} className="border border-gray-300 rounded w-full md:p-2 p-3" type="number" min="0" placeholder="Cost" />
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <select name='expenseType' onChange={(e) => setExpenseDataHandler({'expenseType': e.target.value})} className="border border-gray-300 rounded w-full md:p-2 p-3">
                            <option value=''>Select Expense</option>
                            <option value='travel'>Travel</option>
                            <option value='officeSupplies'>Office Supplies</option>
                            <option value='meals'>Meals</option>
                            <option value='software'>Software</option>
                            <option value='stay'>Late Stay</option>
                            <option value='events'>Team Events</option>
                            <option value='outing'>Team Outing</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <label htmlFor="cash">
                            <input id="cash" className=""  onChange={(e) => setExpenseDataHandler({'paymentType': e.target.value})}  name='paymentType' type="radio" value="cash" />
                            <span className="pl-2">Cash</span>
                        </label><br/>
                        <label htmlFor="credit">
                            <input id="credit" className=""  onChange={(e) => setExpenseDataHandler({'paymentType': e.target.value})} name='paymentType' type="radio" value="card" />
                            <span className="pl-2">Card</span>
                        </label>
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <textarea name='description' onChange={(e) => setExpenseDataHandler({'description': e.target.value})} className="border border-gray-300 rounded w-full md:p-2 p-3" placeholder="Description"></textarea>
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <input name='uploadFile' className="border border-gray-300 rounded w-full md:p-2 p-3" onChange={onUploadDocumentHandler} type="file" placeholder="Upload Document" />
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <button type="submit" className="bg-green-600 text-white rounded w-full md:p-2 p-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default AddExpense;
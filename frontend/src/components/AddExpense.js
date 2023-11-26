import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate  } from "react-router-dom";
import getAuthUserInfo from "../utils/getAuthUserInfo";
import LoaderScreen from "../utils/loaderScreen";
import { showSuccessPrompt, showErrorPrompt, showWarningPrompt } from  "../utils/notification";

const AddExpense = () => {
    const [loader, setLoader] = useState(false);
    const [empName, setEmpName] = useState('');
    const [expenseData, setExpenseData] = useState({});
    const navigate = useNavigate();

    const userData = useSelector((state) => state.user);

    useEffect(() => {
        const isAuthUser = getAuthUserInfo();
        if(userData || isAuthUser?.uId){
            isAuthUser?.role === "hr" && navigate("/");
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
                isInvalid = true;
                showWarningPrompt("Fields cannot be Empty!")
            }
            formData.append(key, expenseData[key])
        }
        if(isInvalid) return;
        
        setLoader(true);
        const authUser = getAuthUserInfo();
        const payload = {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + authUser?.token},
            body: formData
        };
       
        const addRecord = await fetch(process.env.REACT_APP_API_ENDPOINT + '/api/expense/addrecord/', payload);
        const response = await addRecord.json();
        if(response?.error) {
            // display error message
            setLoader(false);
            showErrorPrompt(response?.error);
        }else{
            if(response?.success){
                setLoader(false);
                showSuccessPrompt("New Record has been created!");
                navigate("/");
            }
        }
    }

    return loader ? <LoaderScreen /> :(
        <div>
            <div className="border border-black-300 rounded md:my-10 mt-12 md:top-0 md:w-1/3 md:mx-auto">
                <h1 className="font-bold text-2xl text-center my-5 md:text-xl">Add Expense</h1>
                <form method="POST" id="addExpenseForm" className="text-sm" onSubmit={addRecordHandler}>
                    <div className="my-3 py-2 mx-3 px-3">
                        <h6 className="mb-3">Request Raised By <span className="text-red-600 font-bold">*</span></h6>
                        <input className="border border-gray-300 rounded w-full md:p-2 p-3" type="text" value={empName} placeholder="Employee Name" disabled />
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <h6 className="mb-3">Department <span className="text-red-600 font-bold">*</span></h6>
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
                        <h6 className="mb-3">Date of Expense <span className="text-red-600 font-bold">*</span></h6>
                        <input name='dateOfExpense' onChange={(e) => setExpenseDataHandler({'dateOfExpense': e.target.value})} className="border border-gray-300 rounded w-full md:p-2 p-3" type="date" placeholder="Date" />
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <h6 className="mb-3">Cost of Expense <span className="text-red-600 font-bold">*</span></h6>
                        <input name='costOfExpense' onChange={(e) => setExpenseDataHandler({'costOfExpense': e.target.value})} className="border border-gray-300 rounded w-full md:p-2 p-3" type="number" min="0" placeholder="Cost" />
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <h6 className="mb-3">Expense Type <span className="text-red-600 font-bold">*</span></h6>
                        <select name='expenseType' onChange={(e) => setExpenseDataHandler({'expenseType': e.target.value})} className="border border-gray-300 rounded w-full md:p-2 p-3">
                            <option value=''>Select Expense</option>
                            <option value='travel'>Travel</option>
                            <option value='office Supplies'>Office Supplies</option>
                            <option value='meals'>Meals</option>
                            <option value='software'>Software</option>
                            <option value='stay'>Late Stay</option>
                            <option value='events'>Team Events</option>
                            <option value='outing'>Team Outing</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <h6 className="mb-3">Payment Type <span className="text-red-600 font-bold">*</span></h6>
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
                        <h6 className="mb-3">Description <span className="text-red-600 font-bold">*</span></h6>
                        <textarea name='description' onChange={(e) => setExpenseDataHandler({'description': e.target.value})} className="border border-gray-300 rounded w-full md:p-2 p-3" placeholder="Description"></textarea>
                    </div>
                    <div className="my-3 py-2 mx-3 px-3">
                        <h6 className="mb-3">Upload related document <span className="text-red-600 font-bold">*</span></h6>
                        <div className="drop_box">
                            <h4>Select File here</h4>
                            <p>Files Supported: jpg, png, jpeg </p>
                            <input name='uploadFile' hidden type="file" id="fileID" onChange={onUploadDocumentHandler}  />
                            <div onClick={() => {document.getElementById('fileID').click();
                            }} className="btn cursor-pointer">Choose File</div>
                            {expenseData?.uploadFile && 
                                <h4 className="cursor-pointer pt-3">{expenseData?.uploadFile?.name} 
                                <span onClick={() => setExpenseData({...expenseData, uploadFile: ''})} className="text-sm ml-2">❌</span></h4>
                            }
                        </div>
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
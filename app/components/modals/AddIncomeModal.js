import { useRef, useEffect, useContext} from "react"
import { currencyFormatter } from "@/app/lib/utils";
import { Modal } from './../Modal'
import { toast } from "react-toastify";
import { AddEntryButton } from "./../../icons/AddEntryButton"
import { DeleteButton } from "./../../icons/DeleteButton"
import { budgetbestieContext } from "@/app/lib/store/budget-bestie-context"
import { authContext } from "@/app/lib/store/auth-context";


export function AddIncomeModal({show, onClose}) {
    const amountRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();

    const { income, addIncomeItem, removeIncomeItem } = useContext(budgetbestieContext);
    const {user} = useContext(authContext)

        // handler functions
    const addIncomeHandler = async (e) => {
        e.preventDefault();
        const newIncome = {
            amount: +amountRef.current.value,
            category: categoryRef.current.value,
            description: descriptionRef.current.value,
            uid: user.uid,
            createdAt: new Date()
        }
        try {
            await addIncomeItem(newIncome)
            toast.success("Add income entry success!")
            amountRef.current.value = ''
            categoryRef.current.value = ''
            descriptionRef.current.value = ''
        } catch (error) {
            console.log(error)
        }
        
    };

    const deleteIncomeEntryHandler = async (id) => {
        try {
            await removeIncomeItem(id)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className="px-3 py-1">
            <form onSubmit={addIncomeHandler} className='input-group'>
                <div className='input-group'>
                <label className="font-bold font-mono" htmlFor="amount">Income Amount</label>
                <input
                    type="number"
                    name="amount"
                    ref={amountRef}
                    min={0.01}
                    step={0.01}
                    placeholder="Enter income amount"
                    required />
                </div>
                <div className='input-group'>
                <label className="font-bold font-mono" htmlFor="category">Category</label>
                <input
                    type="text"
                    name="category"
                    ref={categoryRef}
                    placeholder="Enter category"
                    required />
                </div>
            
                <div className='input-group'>
                <label className="font-bold font-mono" htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    ref={descriptionRef}
                    placeholder="Enter description"
                    required />
                </div>
                <div className='max-w-2xl'>
                <AddEntryButton label="Add income entry"/>
                </div>
            </form>
            <div className="my-5">
                <h1 className="text-lg font-mono font-semibold">
                Recent transactions
                </h1>
                {income
                .sort(({ createdAt: previousDate }, { createdAt: currentDate }) => currentDate - previousDate)
                .slice(0, 5).map(item => {
                return (
                    
                    <div className="flex justify-around" key={item.id}>
                    <div className="container bg-violet-100 rounded-xl p-2 my-2" key={item.id}>
                        <div className="flex justify-between item-center" key={item.id}>
                        <div>
                        <p className="font-mono">{item.category}</p>
                        <i className="font-mono text-slate-600">{item.description}</i>
                        </div>
                        <div>
                        <p className="font-mono">{currencyFormatter(item.amount)}</p>
                        <p className="font-mono text-slate-600">{item.createdAt.toLocaleDateString()}</p>
                        </div>
                        </div>
                    </div>
                    <div className="self-center">
                        <DeleteButton onClick={() => {deleteIncomeEntryHandler(item.id)}} className='w-8 h-8 m-3'/>
                    </div>
                    </div>
                )
                })}
                </div>
            </div>
            
        </Modal>
    )
}
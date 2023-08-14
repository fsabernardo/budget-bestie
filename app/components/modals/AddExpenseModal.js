import { AddExpenseIcon } from "@/app/icons/AddExpenseIcon";
import { Modal } from "../Modal";
import { AddEntryButton } from "./../../icons/AddEntryButton"
import { budgetbestieContext } from "@/app/lib/store/budget-bestie-context"
import { authContext } from "@/app/lib/store/auth-context";
import { toast } from "react-toastify";
import { useRef, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {db} from '@/app/lib/firebase/index'
import {collection, addDoc, getDocs, doc, deleteDoc, getDoc, updateDoc} from 'firebase/firestore'

export function AddExpenseModal({show, onClose}) {
    const amountRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();

    const { expenses, total, addExpenseItem } = useContext(budgetbestieContext);
    const {user} = useContext(authContext)

    const addExpenseItemHandler = async (e) => {
        e.preventDefault();
        var current = expenses.reduce((total, j) => {
            return total + j.amount;
          }, 0)
        
        // Update the total
        const updatedTotal = current + +amountRef.current.value;
        // await updateDoc(docRef, {expense: updatedTotal})

        const newExpense = {
            total: updatedTotal,
            category: categoryRef.current.value,
            description: descriptionRef.current.value,
            amount: +amountRef.current.value,
            uid: user.uid,
            items: [
                {
                    createdAt: new Date(),
                    id: uuidv4()
                }
            ]
        }
        try {
            await addExpenseItem(newExpense)
            toast.success("Add expense entry success!")
            amountRef.current.value = ''
            categoryRef.current.value = ''
            descriptionRef.current.value = ''
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal show={show} onClose={onClose}>
            <div className="px-3 py-1">
                <form onSubmit={addExpenseItemHandler} className='input-group'>
                    <div className='input-group'>
                    <label className="font-bold font-mono" htmlFor="amount">Expense Amount</label>
                    <input
                        type="number"
                        name="amount"
                        ref={amountRef}
                        min={0.01}
                        step={0.01}
                        placeholder="Enter expense amount"
                        required />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className='input-group w-1/2'>
                            <label className="font-bold font-mono" htmlFor="category">Category</label>
                            <input
                                type="text"
                                name="category"
                                ref={categoryRef}
                                placeholder="Enter category"
                                required />
                        </div>
                        {/* <div className="flex flex-col">
                            <h1 className="font-bold font-mono">Color</h1>
                            <div className="flex">
                                <button onClick={() => setColor("orange")} className="bg-red-500 rounded-full"> button </button>
                            </div>
                        </div> */}
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
                        <AddEntryButton label="Add expense entry"/>
                    </div>
                </form>
                </div>
            </Modal>
            
        </div>
    )
}

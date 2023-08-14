"use client"
import { useRef, useEffect, useContext, useState } from "react"

import { ExpenseCategory } from "./components/ExpenseCategory"
import { AddIncomeModal } from "./components/modals/AddIncomeModal"
import { AddExpenseModal } from "./components/modals/AddExpenseModal"
import { SignIn } from './components/SignIn'

import { currencyFormatter } from "@/app/lib/utils";
import { budgetbestieContext } from "@/app/lib/store/budget-bestie-context"
import { authContext } from "./lib/store/auth-context"

import { AddExpenseIcon}  from "./icons/AddExpenseIcon"
import { AddIncomeIcon } from "./icons/AddIncomeIcon"

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const [balance, setBalance] = useState(0)
  const { expenses, income, total, removeExpenseItem} = useContext(budgetbestieContext)
  const { user } = useContext(authContext)

  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
        return total + i.amount
      }, 0 ) - expenses.reduce((total, j) => {
        return total + j.amount;
      }, 0)
    setBalance(newBalance)
  },[expenses, income, balance])

  const deleteIncomeEntryHandler = async (id) => {
    try {
        await removeExpenseItem(id)
    } catch (error) {
        console.log(error.message)
    }
  }

  if (!user) {
    return <SignIn />
  }
  
  return (
    <>
      {/* Add income modal */}
      <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal}/>
      <AddExpenseModal show={showAddExpenseModal} onClose={setShowAddExpenseModal}/>
      <main>
        <section className="flex flex-col justify-center items-center py-3">
          <h1 className="text-xl text-slate-600 font-mono"> <i>Account Balance</i> </h1>
          <h1 className="text-5xl font-bold"> {currencyFormatter(balance)}</h1>
        </section>

        <section className="flex flex-row justify-center items-center gap-5">
          <button onClick={() => { setShowAddExpenseModal(true) }} className="flex flex-row items-center text-lg font-mono text-slate-100 bg-red-400 rounded-xl p-2 gap-2">
            <AddExpenseIcon className="w-4 h-4"/>
            Add expense
          </button>
          <button onClick={() => { setShowAddIncomeModal(true)}} className="flex flex-row items-center text-lg font-mono text-slate-100 bg-green-400 rounded-xl p-2 gap-2">
            <AddIncomeIcon className="w-4 h-4"/>
            Add income
          </button>
        </section>

        <section className="flex flex-col justify-center py-5 gap-5">
          <h1 className="text-3xl font-mono self-center font-semibold">
            Expenses
          </h1>
          {expenses.map((expense) => {
            return(
              <ExpenseCategory
                key={expense.id}
                category={expense.category}
                amount={expense.amount}
                onClick={() => {deleteIncomeEntryHandler(expense.id)}}
              />
            );
          })}
        </section>
      </main>
    </>
    
  )
}

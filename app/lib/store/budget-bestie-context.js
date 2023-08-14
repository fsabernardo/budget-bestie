"use client"
import { createContext, useState, useEffect, useContext } from "react";
// firebase imports
import {auth, db} from '@/app/lib/firebase/index'
import {collection, addDoc, getDocs, doc, deleteDoc, where, query} from 'firebase/firestore'
import { authContext } from "./auth-context";

export const budgetbestieContext = createContext({
    income: [],
    expenses: [],
    total: [],
    addIncomeItem: async () => {},
    addExpenseItem: async () => {},
    removeIncomeItem: async () => {},
    removeExpenseItem: async () => {}
});


export default function BudgetBestieContextProvider({children}) {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])
    const [total, setTotal] = useState([])
    const {user} = useContext(authContext)



    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, 'income')
        try {
            const docSnap = await addDoc(collectionRef, newIncome)
            setIncome((prevState) => {
                return [
                    ...prevState,
                    {
                        id: docSnap.id,
                        uid: user.uid,
                        ...newIncome,
                    }
                ]
            })
        } catch (error) {
            console.log(error.message)
            throw error
        }
    };

    const addExpenseItem = async (newExpense) => {
        const collectionRef = collection(db, 'expenses')
        try {
            const docSnap = await addDoc(collectionRef, newExpense)
            setExpenses((prevState) => {
                return [
                    ...prevState,
                    {
                        id: docSnap.id,
                        uid: user.uid,
                        ...newExpense,
                    }
                ]
            })
        } catch (error) {
            console.log(error.message)
            throw error
        }

    }

    const removeIncomeItem = async (id) => {
        const docRef = doc(db, 'income', id)
        try {
            await deleteDoc(docRef)
            setIncome((prevState) => {
                return prevState.filter((i) => i.id !== id)
        });
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    const removeExpenseItem = async (id) => {
        const docRef = doc(db, 'expenses', id)
        try {
            await deleteDoc(docRef)
            setExpenses((prevState) => {
                return prevState.filter((i) => i.id !== id)
        });
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }


    const values = {income, expenses, total, addIncomeItem, addExpenseItem, removeIncomeItem, removeExpenseItem}

    useEffect(() => {

        if (!user) {
            return;
        }

        const getIncomeData = async () => {
          const collectionRef = collection(db, "income")
          const q = query(collectionRef, where("uid", '==', user.uid))
          const docsSnapshot = await getDocs(q)
    
          const data = docsSnapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            }
          })
          setIncome(data)
        }
        

        const getExpensesData = async () => {
          const collectionRef = collection(db, "expenses")
          const q = query(collectionRef, where("uid", '==', user.uid))
          const docsSnapshot = await getDocs(q)
    
          const data = docsSnapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setExpenses(data)
        }

        getIncomeData()
    
        getExpensesData()

      }, [user])

    return (
        <budgetbestieContext.Provider value={values}>
            {children}
        </budgetbestieContext.Provider>
    )
}  
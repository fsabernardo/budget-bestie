import React from 'react'
import { useContext } from 'react';
import { currencyFormatter } from '@/app/lib/utils'
import { DeleteButton } from '../icons/DeleteButton';
import { budgetbestieContext } from "@/app/lib/store/budget-bestie-context"


export function ExpenseCategory ({category, amount, onClick}) {
  const {removeExpenseItem} = useContext(budgetbestieContext)

  const colors = {
    "teal": {
      "bg": 'bg-teal-100',
      "fill": 'bg-teal-400'
    },
    "orange": {
      "bg": 'bg-orange-100',
      "iconBg": 'bg-orange-400'
    },
    "purple": {
      bg: 'bg-purple-200',
      "fill": 'bg-purple-400'
    },
  };

  return (
    <button onClick={onClick}>
      <div className="px-2">
            <div className={`flex items-center justify-between bg-gray-300 max-w-2xl mx-auto rounded-xl`}>
                {/* icon and label */}
                <div className="flex items-center p-5 gap-3">
                  <div className={`bg-gray-300 rounded-full p-5`}>
                    {/* <Icon className={`w-9 h-9 ${colors[color].fill}`}/> */}
                  </div>
                  <p className="text-lg font-mono self-center"> {category} </p>
                </div>
                {/* amount */}
                  <div className="text-xl font-bold p-5">
                    {currencyFormatter(amount)}
                  </div>
                
            </div>
          </div>
    </button>
  )
}

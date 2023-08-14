import React from 'react'
import { CloseButton } from "../icons/CloseButton"


export function Modal({show, onClose, children}) {

  return (
    <div 
        style={{
            transform: show ? "translateX(0%)" : "translateX(+200%)"
        }}
        className="absolute top-0 left-0 px-2 py-10 w-full h-full z-10 transition-all duration-300">
        <div className="container mx-auto max-w-2xl rounded-3xl bg-slate-300 py-6 px-4">
            <button onClick={() => {onClose(false);}}>
              X
            </button>
            {children}
        </div>
    </div>
  )
}
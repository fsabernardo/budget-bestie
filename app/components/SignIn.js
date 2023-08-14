'use client'
import React from 'react'
import { useContext } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { authContext } from '../lib/store/auth-context'

export function SignIn() {
    const { googleLoginHandler } = useContext(authContext)
  return (
    <main className='flex flex-col items-center gap-10 container max-w-2xl px-6 mx-auto'>
        <h1 className='font-mono font-bold text-4xl text-center'>
            Welcome to Budget Bestie
        </h1>
        <button onClick={googleLoginHandler}>
            <div className='flex flex-row gap-5 justify-center items-center p-3 bg-gray-300 rounded-2xl'>
                <FcGoogle className='w-10 h-10'/>
                <h1 className='font-mono text-stone-700'> Sign in with Google </h1>
            </div>
        </button>
    </main>
  )
}

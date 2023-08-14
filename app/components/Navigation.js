'use client';

import {NotificationButton} from './../icons/NotificationButton'
import {LogoutButton} from './../icons/LogoutButton'
import { useContext } from 'react'
import { authContext } from '../lib/store/auth-context'

function Nav() {
  const {user, loading, logout} = useContext(authContext)
  return (
    <header className='container max-w-full px-10  py-5 mx-auto'>
      <div className='flex items-center justify-between'>
      {user && !loading && (
        <div className='flex items-center gap-3'>
          <button>
            <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy='no-referrer'
              />
            </div>
          </button>
          <h1 className='text-lg font-mono'> {user.displayName}</h1>
        </div>
      )}
        {user && !loading && (
          <nav className='flex items-center gap-5'>
          <div>
            <LogoutButton onClick={logout} className='h-[35px] w-[35px]'/>
          </div>
        </nav>
        )}
      </div>
    </header>
  )
}

export default Nav

import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const Navigate = useNavigate();

  // const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={() => Navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='hidden md:flex md: flex items-start gap-5 font-medium'>

        <NavLink to='/'>
  {({ isActive }) => (
    <li
      className={`py-1 cursor-pointer
        ${isActive ? 'underline underline-offset-8 decoration-2 decoration-primary' : 'hover:underline'}
      `}
    >
      HOME
    </li>
  )}
</NavLink>

        <NavLink to="/doctor">
          {({ isActive }) => (
            <li
              className={`py-1 cursor-pointer
        ${isActive ? 'underline underline-offset-8 decoration-2 decoration-primary' : 'hover:underline'}
      `}
            >
              ALL DOCTORS
            </li>
          )}
        </NavLink>

        <NavLink to="/about">
  {({ isActive }) => (
    <li
      className={`py-1 cursor-pointer
        ${isActive ? 'underline underline-offset-8 decoration-2 decoration-primary' : 'hover:underline'}
      `}
    >
      ABOUT
    </li>
  )}
</NavLink>

       <NavLink to="/contact">
  {({ isActive }) => (
    <li
      className={`py-1 cursor-pointer
        ${isActive ? 'underline underline-offset-8 decoration-2 decoration-primary' : 'hover:underline'}
      `}
    >
      Contact
    </li>
  )}
</NavLink>

      </ul>
      <div className='flex items-center gap-4'>
        {
          token
            ? <div className='flex items-center gap-2 cursor-pointer group relative '>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => Navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => Navigate('my-appointment')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => Navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'> Create account</button>
        }
      </div>

    </div>
  )
}

export default Navbar

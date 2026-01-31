import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)

  const linkClass = ({ isActive }) =>
    `px-3 py-1 rounded-md transition-all duration-300
     ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300">

      {/* LOGO */}
      <img
        onClick={() => navigate('/')}
        className='w-44 cursor-pointer'
        src={assets.logo}
        alt="logo"
      />

      {/* DESKTOP MENU */}
      <ul className='hidden md:flex items-center gap-4 font-medium'>
        <NavLink to="/" className={linkClass}>HOME</NavLink>
        <NavLink to="/doctor" className={linkClass}>ALL DOCTORS</NavLink>
        <NavLink to="/about" className={linkClass}>ABOUT</NavLink>
        <NavLink to="/contact" className={linkClass}>CONTACT</NavLink>
      </ul>

      {/* RIGHT SIDE */}
      <div className='flex items-center gap-4'>

        {token ? (
          <div className='relative group cursor-pointer flex items-center gap-2'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />

            <div className='absolute right-0 top-10 hidden group-hover:block bg-white shadow rounded-md w-48 p-4 z-20'>
              <p onClick={() => navigate('/my-profile')} className='cursor-pointer hover:text-blue-600'>My Profile</p>
              <p onClick={() => navigate('/my-appointments')} className='cursor-pointer hover:text-blue-600 mt-2'>My Appointments</p>
              <p onClick={() => setToken(false)} className='cursor-pointer hover:text-red-500 mt-2'>Logout</p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-blue-600 text-white px-6 py-2 rounded-full hidden md:block'
          >
            Create Account
          </button>
        )}

        {/* MOBILE MENU ICON */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt=""
        />

        {/* MOBILE MENU */}
        {showMenu && (
          <div className='fixed inset-0 bg-white z-30 md:hidden'>

            <div className='flex justify-between items-center p-5'>
              <img className='w-36' src={assets.logo} alt="" />
              <img
                onClick={() => setShowMenu(false)}
                className='w-6 cursor-pointer'
                src={assets.cross_logo}
                alt=""
              />
            </div>

            <ul className='flex flex-col items-center gap-6 text-lg font-medium mt-10'>
              <NavLink onClick={() => setShowMenu(false)} to="/" className={linkClass}>HOME</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/doctor" className={linkClass}>ALL DOCTORS</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/about" className={linkClass}>ABOUT</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/contact" className={linkClass}>CONTACT</NavLink>
            </ul>

          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar

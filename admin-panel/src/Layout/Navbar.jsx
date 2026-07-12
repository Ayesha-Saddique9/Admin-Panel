import React from 'react'
import { FaBell } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useLocation } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdCancel } from "react-icons/md";

function Navbar({toggleMenu,isOpen}) {
  const location = useLocation();
  return (
    <div className='w-full bg-white h-16 flex justify-between items-center shadow relative z-50'>
      <div className='flex gap-4 justify-center items-center'>
        {isOpen?<MdCancel className='mt-1 ml-8 md:hidden block text-2xl' onClick={toggleMenu}/>:<RxHamburgerMenu className='md:hidden block mt-1 ml-8 text-xl' onClick={toggleMenu}/>}
      <h1 className='font-bold md:px-10 md:text-2xl text-xl'>{location.pathname === "/"?'Dashboard':'Products'}</h1>
      </div>
      <div className='flex gap-2 justify-center items-center pr-6 text-xl'>
        <FaBell className='text-lg'/>
        <div className='flex gap-2 justify-center items-center'>
        <h1 className='text-sm'>Ayesha Admin</h1>
        <RxAvatar className='text-2xl'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar

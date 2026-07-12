import React from 'react'
import { Link } from 'react-router-dom';
import { MdDashboard,  } from "react-icons/md";
import { IoBag} from "react-icons/io5";
import { FaReceipt } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

function Sidebar({isOpen}) {
  return (
    <div     className={`
    fixed md:static
    top-0 left-0
    min-h-screen
    w-64
    bg-black
    transform
    transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}>
      <h1 className='text-white px-2 pt-4 font-bold md:text-2xl text-xl'>AyeshaMart Admin</h1>
           
           <Link to='/'>
           <div className='flex gap-3 p-6 items-center mt-10 py-3  hover:bg-gray-800 cursor-pointer'>
            <MdDashboard className='text-white text-lg md:text-xl'/>
            <p className='text-white md:text-lg text-medium'>Dashboard</p>
           </div>
           </Link>

            <Link to='/products'>
            <div className='flex gap-3 items-center p-6 mt-2 py-3  hover:bg-gray-800 cursor-pointer'>
            <IoBag className='text-white md:text-xl text-lg'/>
            <p className='text-white md:text-lg text-medium'>Products</p>
           </div>
           </Link>

            <div className='flex gap-3 items-center mt-2 py-3 p-6 hover:bg-gray-800 cursor-pointer'>
            <FaReceipt className='text-white md:text-xl text-lg'/>
            <p className='text-white md:text-lg text-medium'>Orders</p>
           </div>

            <div className='flex gap-3  items-center mt-2 py-3 p-6 hover:bg-gray-800 cursor-pointer'>
            <IoPeople className='text-white md:text-xl text-lg'/>
            <p className='text-white md:text-lg text-medium'>Customers</p>
           </div>

            <div className='flex gap-3 items-center mt-2 py-3 p-6 hover:bg-gray-800 cursor-pointer'>
            <IoSettings className='text-white md:text-xl text-lg'/>
            <p className='text-white md:text-lg text-medium'>Settings</p>
           </div>

            <div className='flex gap-3  items-center mt-4 py-3 p-6 hover:bg-gray-800 cursor-pointer'>
            <IoLogOut className='text-white md:text-2xl text-lg'/>
            <p className='text-white md:text-lg text-medium'>Logout</p>
           </div>
    </div>
  )
}

export default Sidebar

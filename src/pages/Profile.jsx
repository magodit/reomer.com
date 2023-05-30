import React from 'react'
import { getAuth } from 'firebase/auth'
import { useState } from "react";
import { useNavigate } from 'react-router';

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
  name: auth.currentUser.displayName,
  phoneNumber: auth.currentUser.phoneNumber,
  email: auth.currentUser.email,
})

const { name, phoneNumber, email } = formData;
function onLogout(){
auth.signOut();
navigate("/");
}


  return (
    <>
    <section className='max-w-6x1 mx-auto flex justify-center items-center flex-col  '>
      <h1 className="text-3x1 text-center mt-6 font-bold">My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
        { /* Name Input */ }

        <input type="text" id="name" value={name} disabled className="w-full justify-center px-4 py-2 text-x1
        text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out " placeholder="Name"/>

        <input type="text" id="name" value={phoneNumber} disabled className="w-full justify-center mt-4 px-4 py-2 text-x1
        text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out " placeholder="Phone Number"/>

        <input type="text" id="name" value={email} disabled className="w-full justify-center mt-4 px-4 py-2 text-x1
        text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out " placeholder="Email"/>

        <div className='flex justify-between whitespace-nowrap text-sm sm:text-m mb-4 mt-2'>
          <p className='flex items-center'>
            Do you want to change your name?
          <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>Edit</span>
          </p>
          <p 
          onClick={onLogout}
          className="text-blue-600 hover:text-blue-800 transition duration-200
          ease-in-out cursor-pointer text-sm sm:text-m mb-4">Sign out</p>
        </div>
        </form>
      </div>
    </section>
    </>
  )
}

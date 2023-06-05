import { updateProfile } from "firebase/auth";
import React from 'react'
import { getAuth } from 'firebase/auth'
import { useState } from "react";
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../firebase";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate(); 
  const [changeDetail, setChangeDetail] = useState(false)
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

function onChange(e) {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.id]:e.target.value,
  }));
}

async function onSubmit(){
try {
  if(auth.currentUser.displayName !== name){
    //update displayName in firebase auth
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    // update name in the firestore

    const docRef = doc(db, "users", auth.currentUser.uid)
    await updateDoc(docRef, {
      name,
    })
  }
  toast.success('Profile details updated');
} catch (error) {
  toast.error("Could not update the profile details")
  
}
}

  return (
    <>
    <section className='max-w-6x1 mx-auto flex justify-center items-center flex-col  '>
      <h1 className="text-3x1 text-center mt-6 font-bold">My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
        { /* Name Input */ }

        <input type="text"
        id="name"
        value={name}
        disabled={!changeDetail}
        onChange={onChange}
        className={`w-full px-4 py-2 text-x1 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
          changeDetail && "bg-red-200 focus:bg-red-200"
        }`} placeholder="Name"/>

        <input type="text" id="name" value={phoneNumber} disabled className="w-full justify-center mt-2 px-4 py-2 text-x1
        text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out " placeholder="Phone Number"/>

        <input type="text" id="name" value={email} disabled className="w-full justify-center mt-2 px-4 py-2 text-x1
        text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out " placeholder="Email"/>

        <div className='flex justify-between whitespace-nowrap text-sm sm:text-m mb-4 mt-2'>
          <p className='flex items-center'>
            Do you want to change your name?  
          <span
            onClick={() => { 
            changeDetail && onSubmit();
            setChangeDetail((prevState) => !prevState);
            }}
          className='text-red-600 hover:text-red-700 transition
          ease-in-out duration-200 ml-1 cursor-pointer'>
            { changeDetail ? "Apply change" : "Edit"}
          </span>
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

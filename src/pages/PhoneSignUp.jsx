import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Alert } from 'react-bootstrap'
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useUserAuth } from "../context/UserAuthContext"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PhoneSignUp = () => {
const [number, setNumber] = useState("");
const [otp, setOtp] = useState("");
const [error, setError] = useState("");
const [flag, setFlag] = useState(false);
const [confirmObj, setConfirmObj] = useState("");

const [formData, setFormData] = useState({
  email: "",
  phoneNumber: {number},
  password: "",
});

const { phoneNumber } = formData;

const { setUpRecaptcha } = useUserAuth();
const navigate = useNavigate();

const getOtp = async(e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if(number === "" || number === undefined)
    return setError("Please enter a valid Phone number");
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
    console.log(number);
};

    const verifyOtp = async (e) => {
      e.preventDefault();
      console.log(otp);
      if(otp === "" || otp === null) return;
      try {
        setError("");
        await confirmObj.confirm(otp);
        navigate("/profile");
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          
          phoneNumber,
         
        
          
        );
        updateProfile(auth.currentUser, {
          displayName: "set Name",
          displayPhone: phoneNumber,
        });
        const user = userCredential.user;
        const formDataCopy = { ...formData };
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();
        await setDoc(doc(db, "users", user.uid), formDataCopy)
        
      } catch (err) {
        setError(err.message);
        
        toast.error("Something went wrong with the registration");}
      }
      
      

        
  
        
        // toast.success("Sign up was successful");
        // navigate("/");
      
    

    
  

    return (
        <>
        <section>
       <h1 className="text-3x1 text-center mt-6 font-bold">Sign In</h1>
      
        <div className='flex justify-center flex-wrap items-center mt-4 px-6 py-12 max-w-6x1 mx-[5%]'>

        <div className="md:w-[50%] lg:w-[40%] mb-6 md:mb-6">
          <img src="https://media.istockphoto.com/id/1221462158/photo/key-with-keychain-in-a-house-shape-in-the-door-keyhole-buy-new-home-concept-opened-door-to-a.jpg?s=612x612&w=0&k=20&c=NpDlpVHeDykZ68fLbYz5ki_BGlSaUKc2TrQ-ieY0lRI=" alt="key"
          className="w-full rounded-2xl"/>
        </div>
        
          
          <div className="w-full md:w-[75%] lg:w-[40%] lg:ml-20">
        <h2 className="mb-4 font-bold flex justify-center">Phone Login with SMS</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{display: !flag ? "block" : "none" }}>
          <div className="w-full flex justify-center"><Form.Group className="w-full
          px-4 py-2 text-m text-gray-700 bg-white mb-3 border-gray-800
          rounded transition ease-in-out" controlId="formBasicPhoneNumber">
            <PhoneInput
            defaultCountry=""
            
            id="phone"
            value={number}
            onChange={setNumber}
            
            placeHolder="Enter Phone Number"
            />
            <div id="recaptcha-container" className="mt-1 w-[70%]"/>

          </Form.Group></div>
          <div className='button-right flex justify-center'>
            <Link to="/">
            <Button className="bg-gray-600 text-white px-5 py-2 text-sm font-medium uppercase rounded" variant="secondary">Cancel</Button> &nbsp;
            </Link>
            
            <Button className="bg-blue-900 text-white px-5 py-2 text-sm font-medium uppercase rounded" variant="primary" type="submit">Send OTP</Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
        <div className="w-full flex justify-center"><Form.Group className="w-full px-4 py-2 text-m text-gray-700 bg-white mt-3 border-gray-800 rounded mb-3" controlId="formBasicotp">
            <Form.Control
            type="otp"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            />
            
            <div id="recaptcha-container" className="mt-1 w-[70%]"/>

          </Form.Group></div>
          <div className='button-right flex justify-center'>
            <Link to="/">
            <Button className="bg-gray-600 text-white px-5 py-2 text-sm font-medium uppercase rounded transition ease-in-out" variant="secondary">Cancel</Button> &nbsp;
            </Link>
            
            <Button className="bg-blue-900 text-white px-5 py-2 text-sm font-medium uppercase rounded transition ease-in-out" variant="primary" type="submit">Verify OTP</Button>
          </div>
        </Form>
        <h2 className="w-full mt-1 mb-1 flex justify-center font-bold">or</h2>

        <div className="w-full flex justify-center"><Button className="bg-green-600 text-white w-full px-7 py-3 text-sm mt-1 mb-6 font-medium uppercase rounded " variant="primary" type="submit">Sign with Google</Button></div>

        </div>

                </div>
          
          
        <form >
        </form>      
        
      
    </section>
      
        </>
    );
};

export default PhoneSignUp;

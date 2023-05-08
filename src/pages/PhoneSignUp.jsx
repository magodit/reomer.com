import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Alert } from 'react-bootstrap'
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useUserAuth } from "../context/UserAuthContext"


const PhoneSignUp = () => {
const [number, setNumber] = useState("");
const [otp, setOtp] = useState("");
const [error, setError] = useState("");
const [flag, setFlag] = useState(false);
const [confirmObj, setConfirmObj] = useState("");
const { setUpRecaptcha } = useUserAuth();
const navigate = useNavigate();
const getOtp = async(e) => {
    e.preventDefault();
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
        navigate("/home")
      } catch (err) {
        setError(err.message);
      }
    };

    return (
        <>
        <section>
       <h1 className="text-3x1 text-center mt-6 font-bold">Sign In</h1>
      
        <div className='flex justify-center flex-wrap items-center mt-10 px-6 py-12 max-w-6x1 mx-[5%]'>

        <div className="md:w-[50%] lg:w-[40%] mb-12 md:mb-6">
          <img src="https://media.istockphoto.com/id/1221462158/photo/key-with-keychain-in-a-house-shape-in-the-door-keyhole-buy-new-home-concept-opened-door-to-a.jpg?s=612x612&w=0&k=20&c=NpDlpVHeDykZ68fLbYz5ki_BGlSaUKc2TrQ-ieY0lRI=" alt="key"
          className="w-full rounded-2xl"/>
        </div>
        
          
          <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20  ">
        <h2 className="mb-3 font-bold">Phone Login with SMS</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{display: !flag ? "block" : "none" }}>
          <Form.Group className="w-full px-4 py-2 text-m text-gray-700 bg-white mb-3 border-gray-300 rounded transition ease-in-out" controlId="formBasicPhoneNumber">
            <PhoneInput
            defaultCountry=""
            value={number}
            onChange={setNumber}
            placeHolder="Enter Phone Number"
            />
            <div id="recaptcha-container"/>

          </Form.Group>
          <div className='button-right'>
            <Link to="/">
            <Button className="bg-gray-600 text-white px-7 py-3 text-sm font-medium uppercase" variant="secondary">Cancel</Button> &nbsp;
            </Link>
            
            <Button className="bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase" variant="primary" type="submit">Send OTP</Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp}>
          <Form.Group className="w-full px-4 py-2 text-m text-gray-700 bg-white mt-3 border-gray-300 rounded mb-3 transition ease-in-out" controlId="formBasicotp">
            <Form.Control
            type="otp"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            />
            
            <div id="recaptcha-container"/>

          </Form.Group>
          <div className='button-right'>
            <Link to="/">
            <Button className="bg-gray-600 text-white px-7 py-3 text-sm font-medium uppercase" variant="secondary">Cancel</Button> &nbsp;
            </Link>
            
            <Button className="bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase" variant="primary" type="submit">Verify OTP</Button>
          </div>
        </Form>
        </div>
                </div>
          
          
        <form >
        </form>      
        
      
    </section>
      
        </>
    );
};

export default PhoneSignUp;
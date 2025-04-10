import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailVerify = () => {

  axios.defaults.withCredentials=true;
  const inputRefs = React.useRef([])
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContext);
  
  const navigate = useNavigate();

  const handleInput = (e, index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e,index)=>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index-1].focus();
    }
  }

  const handlePaste = (e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account',{otp});

      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin,userData])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={onSubmitHandler}  className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Email Verification OTP</h1>
        <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your email ID.</p>
        <div className="flex space-x-2 mb-4" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input ref={e => inputRefs.current[index] = e} onInput={(e)=> handleInput(e,index)} onKeyDown={(e)=> handleKeyDown(e,index)}
             type="text" maxLength="1" key={index} required className="w-12 h-12 text-center border rounded-md text-xl"/>
          ))}
        </div>
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;

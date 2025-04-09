import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResetPassword = () => {

const navigate = useNavigate()
const [email, setEmail] = useState('')
const [newPassword, setNewPassword] = useState('')
const [isEmailSent, setIsEmailSent] = useState(false)
const [otp,setOtp] = useState(0)
const [isOtpSubmitted, setOtpSubmitted] = useState(false)

const {backendUrl} = useContext(AppContext);
axios.defaults.withCredentials = true

const inputRefs = React.useRef([])

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

const onSubmitEmail = async (e)=>{

  e.preventDefault();

  try{

    const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp',{email});

    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
    
    data.success && setIsEmailSent (true)

   }catch(error){
    toast.error(error.message)
   }

}

const onSubmitOtp = async (e)=>{
  e.preventDefault();

  const otpArray = inputRefs.current.map(e => e.value)
  setOtp(otpArray.join(''))
  setOtpSubmitted(true)

}

const onSubmitNewPassword = async (e) => {
  e.preventDefault()

  try {
    const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email,otp,newPassword})

    data.success ? toast.success(data.message) : toast.error(data.message)
    data.success && navigate('/login')

  } catch (error) {
    toast.error(error.message)
  }
}

  return (

    
    <div>
      {!isEmailSent && (
  <div>
    <div onClick={() => navigate('/')}>SOMNiA LOGO</div>
    <form onSubmit={onSubmitEmail}> 
      <h1>Reset Password</h1>
      <p>Enter your registered email address</p>
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
)}


        {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOtp} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Reset password OTP</h1>
        <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your email ID.</p>
        <div className="flex space-x-2 mb-4" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input ref={e => inputRefs.current[index] = e} onInput={(e)=> handleInput(e,index)} onKeyDown={(e)=> handleKeyDown(e,index)}
             type="text" maxLength="1" key={index} required className="w-12 h-12 text-center border rounded-md text-xl"/>
          ))}
        </div>
        <button type="submit" className="px-6 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
        )}

 {/*Enter new password*/}
      {isOtpSubmitted && isEmailSent && (
      <form onSubmit={onSubmitNewPassword}>
        <h1>Reset Password</h1>
        <p>Enter your new password</p>
        <div>
          <input type="password" autocomplete="new-password" placeholder="Password" value={newPassword} onChange={e=>setNewPassword (e.target.value)} required/>
          </div>
          <button>Submit</button>
        
        </form>
      )}
    </div>
  )
}

export default ResetPassword
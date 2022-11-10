import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoAlertCircleOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';


export default function ForgotView({handleAlerts, handleLoading}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [confirm, setConfirm] = useState('');
    const [code, setCode] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const [errors, setErrors] = useState([]);


    const forgotPassword = (e) => {
        handleLoading(true);
        e.preventDefault();
        axios.put('https://petflix.herokuapp.com/forgot-password', {
          email: email
        })
        .then(res => {
          setRequestSent(true);
          handleAlerts(res.data.message, res.data.status);
          setErrors([]);
        })
        .catch(err => {
            const errData = err.response.data;
            handleAlerts(errData.message, errData.status);
            setErrors(errData.errors.errors);
        })
        handleLoading(false);
      }

      const resetPassword =(e) => {
        handleLoading(true);
        e.preventDefault();
        axios.put('https://petflix.herokuapp.com/reset-forgot-password', {
          email: email,
          code: code,
          password: password,
          confirm: confirm
        })
        .then(res => {
          navigate('/')
          handleAlerts(res.data.message, res.data.status);
          setErrors([]);
        })
        .catch(err => {
            const errData = err.response.data;
            handleAlerts(errData.message, errData.status);
            setErrors(errData.errors.errors);
        })
        handleLoading(false);
      }

    


    return (
        <div className='page-wrapper'>
            <div className='section-container'>
                <form className='form'>
                    <div>
                    <h1>PetFlix</h1>
                    <h2>Forgot Password</h2>
                    </div>
                
                <div className='inputs_container'>
                    {
                        !requestSent ?
                        <label>
                        <div className='input_container'>
                            <input 
                            name='email' placeholder="Email" type='email' value={email}
                            onChange={(x) => setEmail(x.target.value)}/>
                            {errors.map((err, idx) => {
                                    if (err.param === 'email') {
                                        return (
                                            <div className='error_item' key={idx}>
                                                <IoAlertCircleOutline className='icon'/>
                                                <p>{err.msg}</p>
                                            </div>
                                        )
                                    }
                                })}
                            <span>Email</span>
                        </div>
                    </label> :
                    <>
                    <label>
                        <div className='input_container'>
                            <input disabled 
                            name='email' placeholder="Email" type='email' value={email}/>
                            {errors.map((err, idx) => {
                                    if (err.param === 'email') {
                                        return (
                                            <div className='error_item' key={idx}>
                                                <IoAlertCircleOutline className='icon'/>
                                                <p>{err.msg}</p>
                                            </div>
                                        )
                                    }
                                })}
                            <span>Email</span>
                        </div>
                    </label>
                    <label>
                        <div className='input_container'>
                            <input 
                            name='code' placeholder="Verification Code" type='text' value={code}
                            onChange={(x) => setCode(x.target.value)}/>
                            {errors.map((err, idx) => {
                                    if (err.param === 'code') {
                                        return (
                                            <div className='error_item' key={idx}>
                                                <IoAlertCircleOutline className='icon'/>
                                                <p>{err.msg}</p>
                                            </div>
                                        )
                                    }
                                })}
                            <span>Verification Code</span>
                        </div>
                    </label>
                    <label>
                        <div className='input_container'>
                            <input 
                            name='password' placeholder="Password" type={passwordHidden ? 'password' : 'text'} value={password}
                            onChange={(x) => setPassword(x.target.value)}/>
                            {errors.map((err, idx) => {
                                    if (err.param === 'password') {
                                        return (
                                            <div className='error_item' key={idx}>
                                                <IoAlertCircleOutline className='icon'/>
                                                <p>{err.msg}</p>
                                            </div>
                                        )
                                    }
                                })}
                            <span>Password</span>
                            {
                                passwordHidden ? 
                                <IoEyeOutline onClick={() => setPasswordHidden(false)} className='password_hide'/> :
                                <IoEyeOffOutline onClick={() => setPasswordHidden(true)} className='password_hide'/>
                            }
                        </div>
                    </label>
                    <label>
                        <div className='input_container'>
                            <input 
                            name='confirm' placeholder="Confirm Password" type={passwordHidden ? 'password' : 'text'} value={confirm}
                            onChange={(x) => setConfirm(x.target.value)}/>
                            {errors.map((err, idx) => {
                                    if (err.param === 'confirm') {
                                        return (
                                            <div className='error_item' key={idx}>
                                                <IoAlertCircleOutline className='icon'/>
                                                <p>{err.msg}</p>
                                            </div>
                                        )
                                    }
                                })}
                            <span>Confirm Password</span>
                        </div>
                    </label>
                    </>

                    }
                    </div>
                    <div className='btns_container'>
                        {
                            !requestSent ?
                            <>
                                <button onClick={(e) =>  forgotPassword(e)} className='btn'>
                                    <div className='btn_contents'>
                                    <span>Send Reset Code</span>    
                                    </div>
                                </button>
                                <button  className='btn closed' onClick={() => navigate('/register')}>
                                    <div className='btn_contents'>
                                    <span>Back to Register</span>    
                                    </div>
                                </button>
                                <button  className='btn closed' onClick={() => navigate('/')}>
                                    <div className='btn_contents'>
                                    <span>Back to Sign In</span>    
                                    </div>
                                </button>
                            </> :
                            <>
                                <button onClick={(e) => resetPassword(e)} className='btn'>
                                    <div className='btn_contents'>
                                    <span>Reset Password</span>    
                                    </div>
                                </button>
                                <button  className='btn closed' onClick={(e) =>  forgotPassword(e)}>
                                <div className='btn_contents'>
                                    <span>Resend Code</span>    
                                    </div>
                                </button>
                                <button  className='btn closed' onClick={() => navigate('/register')}>
                                    <div className='btn_contents'>
                                    <span>Back to Register</span>    
                                    </div>
                                </button>
                                <button  className='btn closed' onClick={() => navigate('/')}>
                                    <div className='btn_contents'>
                                    <span>Back to Sign In</span>    
                                    </div>
                                </button>
                            </>
                            

                        }
                    
                    </div>
                </form>
                </div>
        </div>
    )
}
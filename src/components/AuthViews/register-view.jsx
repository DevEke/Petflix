import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoAlertCircleOutline, IoEyeOffOutline, IoEyeOutline  } from 'react-icons/io5';

export default function RegisterView({signIn, handleAlerts, handleLoading}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    function registerAccount(e) {
        handleLoading(true);
        e.preventDefault();
          axios.post('https://petflix.herokuapp.com/register-account', {
            email: email,
            password: password,
            confirm: confirm,
            name: name
          })
          .then(res => {
            signIn(email, password);
            navigate('/switch-accounts')
            handleAlerts(res.data.message, res.data.status)
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
                    <h2>Sign Up</h2>
                    </div>
                
                <div className='inputs_container'>
                    <label>
                        <div className='input_container'>
                            <input 
                                // style={emailErr ? {border: `1px solid rgb(182, 28, 28)`} : null} 
                                name='email' placeholder="Email" value={email}
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
                    </label>
                    <label>
                        <div className='input_container'>
                            <input
                                // style={passwordErr ? {border: `1px solid rgb(182, 28, 28)`} : null}
                                name='password' placeholder="Password"  type={passwordHidden ? 'password' : 'text'}  value={password}
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
                                // style={confirmErr ? {border: `1px solid rgb(182, 28, 28)`} : null} 
                                name='confirm' placeholder="Confirm Password" type={passwordHidden ? 'password' : 'text'}  value={confirm}
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
                    <label>
                        <div className='input_container'>
                            <input
                                // style={nameErr ? {border: `1px solid rgb(182, 28, 28)`} : null}  
                                name='name' placeholder="Whats your Name"  type='text' value={name}
                                onChange={(x) => setName(x.target.value)}/>
                                {errors.map((err, idx) => {
                                    if (err.param === 'name') {
                                        return (
                                            <div className='error_item' key={idx}>
                                                <IoAlertCircleOutline className='icon'/>
                                                <p>{err.msg}</p>
                                            </div>
                                        )
                                    }
                                })}
                            <span>Name</span>
                        </div>
                    </label>
                    </div>
                    <div className='btns_container'>
                    <button className='btn' onClick={(e) => registerAccount(e)}>
                        <div className='btn_contents'>
                        <span>Sign Up</span>    
                        </div>
                    </button>
                    <button  className='btn closed' onClick={() => navigate('/')}>
                    <div className='btn_contents'>
                        <span>Back to Sign In</span>    
                        </div>
                    </button>
                    </div>
                </form>
                </div>
        </div>
    )
}
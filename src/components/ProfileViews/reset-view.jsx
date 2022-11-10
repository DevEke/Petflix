import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';
import { IoAlertCircleOutline, IoEyeOffOutline, IoEyeOutline  } from 'react-icons/io5';

export default function ResetView({handleAlerts, user}) {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState([]);


      const resetPassword =(e) => {
        e.preventDefault();
        axios.put(`https://petflix.herokuapp.com/reset-password/${user._id}`, {
          password: password,
          confirm: confirm
        })
        .then(res => {
          handleAlerts(res.data.message, res.data.status);
          setErrors([]);
          setPassword('');
          setConfirm('');
        })
        .catch(err => {
            const errData = err.response.data;
            handleAlerts(errData.message, errData.status);
            setErrors(errData.errors.errors);
        })
      }

    


    return (
        <div className='reset-wrapper'>
            <div className='reset-container'>
                <form className='form'>
                    <div>
                    <h2>Forgot Password</h2>
                    </div>
                <div className='inputs_container'>
                    <label>
                        <div className='input_container'>
                            <input name='password' placeholder="Password" type={passwordHidden ? 'password' : 'text'} value={password}
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
                    </div>
                    <div className='btns_container'>
                        <button onClick={(e) =>  resetPassword(e)} className='btn'>
                            <div className='btn_contents'>
                            <span>Reset Password</span>    
                            </div>
                        </button>
                    </div>
                </form>
                </div>
        </div>
    )
}
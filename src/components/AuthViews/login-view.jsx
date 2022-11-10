import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoAlertCircleOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

export default function LoginView({handleAlerts, handleLoading, setUser, getUser}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [errors, setErrors] = useState([]);
    const auth = localStorage.getItem('auth');
    const token = localStorage.getItem('token');
    


      const signIn = (e) => {
        e.preventDefault();
        handleLoading(true);
        axios.post('https://petflix.herokuapp.com/sign-in', {
          email: email,
          password: password
        })
        .then(res => {
          const data = res.data;
          setUser(data.user)
          localStorage.setItem('token', data.token);
          localStorage.setItem('auth', JSON.stringify(data.user));
          handleAlerts(data.message, data.status);
          setErrors([]);
          navigate('/switch-accounts');
        })
        .catch(err => {
          const errObj = err.response.data;
          handleAlerts(errObj.message, errObj.status)
          setErrors(errObj.errors.errors);
        })
        handleLoading(false);
      }

      const checkSavedUser = () => {
        if (auth && token) {
          getUser()
        }
      }


      useEffect(() => {
        checkSavedUser();
      }, [])
    


    return (
        <div className='page-wrapper'>
            <div className='section-container'>
                <form className='form'>
                    <div>
                    <h1>PetFlix</h1>
                    <h2>Sign In</h2>
                    </div>
                
                <div className='inputs_container'>
                    <label>
                        <div className='input_container'>
                            <input 
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
                    </div>
                    <div className='btns_container'>
                    <button className="btn" onClick={(e) => signIn(e)}>
                        <div className='btn_contents'>
                        <span>Sign In</span>    
                        </div>
                    </button>
                    <button className="btn open" onClick={() => navigate('/register')}>
                    <div className='btn_contents'>
                        <span>Create Account</span>    
                        </div>
                    </button>
                    </div>
                    <Link className='link' to='/forgot'>Forgot Password?</Link>
                </form>
                </div>
        </div>
    )
}
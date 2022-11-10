import './small-account.scss';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { IoAdd, IoAlertCircleOutline, IoCloseOutline} from 'react-icons/io5';
import SmallAccountItem from './small-account-item';

export default function SmallAccountsView({user, handleAccountSwitch, handleAlerts}) {
    const [name, setName] = useState('');
    const [type, setType] = useState('adult');
    const [errors, setErrors] = useState([]);
    const [addingProfile, setAddingProfile] = useState(false);

    const handleSelectAccount = (x) => {
        handleAccountSwitch(x);
    }

    const handleTypeChange = (x) => {
        x.preventDefault();
        setType(x.target.value)
    }

    const addProfile = (e) => {
        e.preventDefault();
        axios.post(`https://petflix.herokuapp.com/${user._id}/new-account`, {
            name: name,
            type: type
        })
        .then((res) => {
            setAddingProfile(false);
            handleAlerts(res.data.message, res.data.status);
            setErrors([]);
        })
        .catch((err) => {
            const errData = err.response.data;
            handleAlerts(errData.message, errData.status);
            setErrors(errData.errors.errors); 
        })
    }

    const removeProfile = (id) => {
        axios.delete(`https://petflix.herokuapp.com/${user._id}/remove-account/${id}`)
        .then((res) => {
            handleAlerts(res.data.message, res.data.status);
        })
        .catch((err) => {
            const errData = err.response.data;
            handleAlerts(errData.message, errData.status);
        })
    }

    const cancelAddingProfile = (e) => {
        e.preventDefault();
        setAddingProfile(false);
    }

    return (
        <div className='small-accounts-view_wrapper'>
            <div className='scroll_container-2'>
            <div className='small-accounts-view_container'>
                <ul className='ww-grid'>
                    {
                        user?.accounts.map((account, idx) => {
                            return (
                                <li key={idx}>
                                    <SmallAccountItem 
                                        handleSelectAccount={() => handleSelectAccount(account)} 
                                        removeProfile={(x) => removeProfile(x)} 
                                        account={account}
                                    />
                                </li>
                            )
                        })
                    }
                    <li>
                        <div className='small-account-item_wrapper'>
                        <div className="small-account-backdrop" onClick={() => setAddingProfile(!addingProfile)}>
                            {
                                addingProfile ?
                                <IoCloseOutline className='icon'/> :
                                <IoAdd className='icon'/>
                            }
                        </div>
                        </div>
                        {
                            addingProfile ?
                            <form className='profile_form'>
                                <div className='inputs_container_two'>
                            <label>
                            <div className='input_container'>
                            <input
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
                            <div className='select-wrapper'>
                            <select value={type} onChange={(x) => handleTypeChange(x)} className='select' tabIndex={0}>
                            <option value='adult'>Adult</option>
                            <option value='pups'>Pups</option>
                            </select>
                            </div>
                            </div>
                            <div className='btns_container'>
                                <button className='btn' onClick={(e) => addProfile(e)}>
                                    <div className='btn_contents'>
                                    <span>Create Profile</span>    
                                    </div>
                                </button>
                                </div>
                            </form> :
                            null
                        }
                    </li>
                </ul>
                </div>
                </div>
        </div>
    )
}
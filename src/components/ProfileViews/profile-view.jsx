import './profile-view.scss';
import { useEffect, useState } from 'react';
import { format, parseJSON} from 'date-fns';
import Confirm from '../ModalViews/confirm-view';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoExitOutline ,IoBan, IoPersonCircleOutline, IoPersonCircle,IoLockClosedOutline,IoLockClosed, IoStar, IoStarOutline, IoPeopleCircleOutline, IoPeopleCircle } from 'react-icons/io5';
import ResetView from './reset-view';
import FavoritesView from './FavoritesView/favorites-view';
import SmallAccountsView from './SmallAccountView/small-accounts-view';
import MobileProfile from './mobile-profile';
import axios from 'axios';



export default function ProfileView({ loadTrailer, clearAccount, signOut, handleAlerts, user, getUser, account, handleAccountSwitch}) {
    const navigate = useNavigate();
    const [ profileTab, setProfileTab] = useState('favorites');
    const [ confirm, setConfirm] = useState(false);
    const token = localStorage.getItem('token');
    const auth = localStorage.getItem('auth');

    const clearAccounts = () => {
        clearAccount();
        navigate('/switch-accounts');
    }

    const randomColor = () => {
        const color = "#" + (Math.floor(Math.random()*16777215).toString(16));
        return color
    }

    const deleteAccount = () => {
        axios.delete(`https://petflix.herokuapp.com/delete-account/${user._id}`)
        .then((res) => {
            handleAlerts(res.data.message, res.data.status);
            setConfirm(false);
        })
        .catch((err) => {
            const errData = err.response.data;
            handleAlerts(errData.message, errData.status);
        })
    }


    return (
        <div className='section-wrapper profile-view_wrapper'>
            {
                confirm ?
                <div className='modal_container-2'>
                <Confirm 
                    confirmMessage='Are you sure you want to delete this account? This is permanent.' 
                    confirm={() =>  deleteAccount()} 
                    cancel={() => setConfirm(false)}/>
                </div> :
                null
            }
            <div className='profile-view_header'>
                <div className='section-container profile-view_header_contents'>
                    <button onClick={() => navigate('/home')} className='btn'>
                        <div className='btn_contents'>
                        <IoChevronBack className='icon'/>
                            <span>Back to Browse</span>
                        </div>
                    </button>
                </div>
            </div>
            <div className='section-wrapper profile-view-window'>
            <div className='section-container profile-view_container'>
                
                <div className='profile-view_view'>
                    <div className='profile-view_view_side'>
                        <div className='profile-view_list_items_top'>
                        <div className='profile-view_info_container'>
                        <div className='profile-view_img' style={{backgroundColor: randomColor()}}>
                            {
                                account?.type === 'pups' ?
                                <p className="img">Pups</p> :
                                <p className="img initial">{account?.name.split('')[0]}</p> 
                            }
                        </div>
                        <div className='profile-view_info'>
                            <div><span>Email</span><p>{user?.email}</p></div>
                            {user ? <div><span>Joined</span><p>{format(parseJSON(user?.joinedDate), 'PP')}</p></div> : null}
                        </div>
                        </div>
                        <div onClick={() => setProfileTab('profile')} className={`profile-view_list-item ${profileTab === 'profile' ? 'active_item' : null} pro-tab`}>
                        {profileTab === 'profile' ?  <IoPersonCircle className='icon'/> : <IoPersonCircleOutline className='icon'/>  }
                        <p>Profile</p>
                        </div>
                        <div onClick={() => setProfileTab('favorites')} className={`profile-view_list-item ${profileTab === 'favorites' ? 'active_item' : null}`}>
                        {profileTab === 'favorites' ?  <IoStar className='icon'/> : <IoStarOutline className='icon'/>  }   
                        <p>Favorites</p> 
                        </div>
                        <div onClick={() => setProfileTab('reset-password')} className={`profile-view_list-item ${profileTab === 'reset-password' ? 'active_item' : null}`}>
                        {profileTab === 'reset-password' ? <IoLockClosed className='icon'/> : <IoLockClosedOutline className='icon'/>}
                        <p>Reset Password</p> 
                        </div>
                        <div onClick={() => setProfileTab('switch-accounts')} className={`profile-view_list-item ${profileTab === 'switch-accounts' ? 'active_item' : null}`}>
                            {profileTab === 'switch-accounts' ? <IoPeopleCircle className='icon'/> : <IoPeopleCircleOutline className='icon'/>}
                        <p>Switch Profiles</p> 
                        </div>
                        <div className='profile-view_btn_container'>
                        <button onClick={signOut} className='btn'>
                            <div className='btn_contents'>
                                <span>Sign Out</span>
                                <IoExitOutline className='icon'/>
                            </div>
                        </button>
                        </div>
                        </div>
                        <div className='profile-view_btn_container'>
                        <button onClick={() => setConfirm(true)} className='btn cancel_btn'>
                            <div className='btn_contents'>
                                <span>Delete Account</span>
                                <IoBan className='icon'/>
                            </div>
                        </button>
                        </div>
                    </div>
                    <div className='profile-view_main'>
                        {
                            profileTab === 'favorites' ? 
                            <FavoritesView getUser={getUser} loadTrailer={loadTrailer} user={user} account={account}/> :
                            profileTab === 'reset-password' ? 
                            <ResetView user={user} handleAlerts={handleAlerts}/> :
                            profileTab === 'switch-accounts' ?
                            <SmallAccountsView handleAlerts={handleAlerts} handleAccountSwitch={handleAccountSwitch} user={user}/> :
                            <MobileProfile signOut={signOut} setConfirm={() => setConfirm(true)} user={user} account={account}/>
                        }
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}
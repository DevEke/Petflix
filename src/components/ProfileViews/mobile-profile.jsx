import { format, parseJSON} from 'date-fns';
import {IoBan, IoExitOutline} from 'react-icons/io5';

export default function MobileProfile({account, user, signOut, setConfirm}) {

    const randomColor = () => {
        const color = "#" + (Math.floor(Math.random()*16777215).toString(16));
        return color
    }

    return (
        <div className="section-wrapper">
            <div className="section-container mobile-profile-view">
            <div className='mobile-profile-view_img' style={{backgroundColor: randomColor()}}>
                {
                    account?.type === 'pups' ?
                    <p className="img">Pups</p> :
                    <p className="img initial">{account?.name.split('')[0]}</p> 
                }
            </div>
            <div className='mobile-profile-view_info'>
                    <div><span>Email</span><p>{user?.email}</p></div>
                    {user ? <div><span>Joined</span><p>{format(parseJSON(user?.joinedDate), 'PP')}</p></div> : null}
            </div>
            <button onClick={signOut} className='btn'>
                <div className='btn_contents'>
                    <span>Sign Out</span>
                    <IoExitOutline className='icon'/>
                </div>
            </button>
            <button onClick={setConfirm} className='btn cancel_btn'>
                <div className='btn_contents'>
                    <span>Delete Account</span>
                    <IoBan className='icon'/>
                </div>
            </button>
            </div>
        </div>
    )
}
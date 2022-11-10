import { IoTrashBinOutline } from "react-icons/io5";


export default function SmallAccountItem({account, removeProfile, handleSelectAccount}) {

    const randomColor = () => {
        const color = "#" + (Math.floor(Math.random()*16777215).toString(16));
        return color
    }

    

    return (
        <div onClick={() => handleSelectAccount(account)} className="small-account-item_wrapper">
            <div className="small-account-backdrop" style={{backgroundColor: randomColor()}}>
            {
                account.type === 'pups' ?
                <p className="img">Pups</p> :
                <p className="img">{account.name.split('')[0]}</p> 
            }
            </div>
            <h5>{account.name}</h5>
            <p className="sub">{account.type}</p>
            <div className='btns_container'>
                <button className='btn' onClick={() => removeProfile(account._id)}>
                    <div className='btn_contents'>
                    <span>Delete Profile</span> 
                    </div>
                </button>
            </div>
        </div>
    )
}
import './modal-views.scss';
import { IoAlertCircleOutline } from 'react-icons/io5';



export default function Confirm(props) {
    const { confirmMessage, confirm, cancel } = props;

    const handleConfirm = () => {

    }

    return (
        <div className={`confirm_container`}>
            <div className="confirm_content">
                <IoAlertCircleOutline className='icon'/>
                <p>{confirmMessage}</p>
                <div className='btns_container'>
                <button onClick={() =>  handleConfirm()} className='btn cancel_btn'>
                    <div className='btn_contents'>
                    <span>Delete Account</span>    
                    </div>
                </button>
                <button onClick={() => cancel()} className='btn'>
                    <div className='btn_contents'>
                    <span>Cancel</span>    
                    </div>
                </button>
                </div>
            </div>
        </div>
    )
}
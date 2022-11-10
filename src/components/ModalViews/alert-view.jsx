import './modal-views.scss';
import { HiCheckCircle, HiInformationCircle, HiExclamationCircle } from 'react-icons/hi2';
import { HiOutlineX } from 'react-icons/hi';


export default function Alert(props) {
    const { alertMessage, alertType, removeAlert } = props;
    return (
        <div onClick={removeAlert} className={`alert_container ${alertType === 'success' ? 'container_success' : 'container_fail'}`}>
            <div className="alert_content">
                <div className="alert_content">
                    {
                        alertType === 'success' ?
                        <HiCheckCircle className="alert_icon"/>
                        : <HiExclamationCircle  className="alert_icon"/>
                    }
                <p className="alert_message">{alertMessage}</p>
                </div>
            </div>
        </div>
    )
}
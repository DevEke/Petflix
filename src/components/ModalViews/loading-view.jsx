import './modal-views.scss';
import { CgSpinner} from 'react-icons/cg';

export default function LoadingView() {
    return (
        <div className="loading__wrapper flex clm-centered">
            <CgSpinner className='icon'/>
        </div>
    )
}
import './mobile-menu.scss';
import { Link } from 'react-router-dom';
import { IoClose, IoExitOutline} from 'react-icons/io5';

function MobileMenu(props) {
    const {toggleMenu, signOut } = props;
    return (
        <div className="mobile-menu__wrapper">
            <div className="mobile-menu">
                <div className="mobile__header">
                    <p>Petflix</p>
                <div onClick={toggleMenu} className='mobile-menu_close'>
                   <IoClose className='icon'/> 
                </div>
                </div>
                <div className="mobile-menu__links">
                    
                    <div className="mobile-menu__line"/>
                    <button onClick={signOut} className='btn'>
                        <div className='btn_contents'>
                            <span>Sign Out</span>
                            <IoExitOutline className='icon'/>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;
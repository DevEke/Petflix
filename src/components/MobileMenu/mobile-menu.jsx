import './mobile-menu.scss';
import logo from '../../img/petflix-logo.png';
import { Link } from 'react-router-dom';
import { IoClose} from 'react-icons/io5';

function MobileMenu(props) {
    const {toggleMenu } = props;
    return (
        <div className="mobile-menu__wrapper">
            <div className="mobile-menu">
                <div className="mobile__header">
                    <IoClose onClick={toggleMenu} className="icon"/>
                    <img src={logo} className="logo" alt=""/>
                </div>
                <div className="mobile-menu__links">
                    <Link className="mobile-menu__link" onClick={toggleMenu} to="/">Home</Link>
                    <Link className="mobile-menu__link" onClick={toggleMenu} to="/Animation">Animation</Link>
                    <Link className="mobile-menu__link" onClick={toggleMenu} to="/Family">Family</Link>
                    <Link className="mobile-menu__link" onClick={toggleMenu} to="/Drama">Drama</Link>
                    <Link className="mobile-menu__link" onClick={toggleMenu} to="/Action">Action</Link>
                    <Link className="mobile-menu__link" onClick={toggleMenu} to="/Comedy">Comedy</Link>
                    <div className="mobile-menu__line"/>
                    <Link className="mobile-menu__link" onClick={toggleMenu}>Sign Out of Petflix</Link>
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;
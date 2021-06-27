import { useState } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../img/petflix-logo.png';
import { IoSearch, IoCaretDown, IoMenu, IoClose } from 'react-icons/io5';
import './nav-bar.scss';


function NavBar(props) {
    const [searchbar, setSearchbar] = useState(false);
    const { clearUser, handleSearch, query, handleClear, toggleMenu} = props;
    

    function toggleSearch() {
        if (searchbar) {
            setSearchbar(false);
            handleClear();
        } else {
            setSearchbar(true);
        }
    }

    function refresh() {
        window.location.reload();
    }

    

    return (
        <div className="nav-bar__container padding">
            <div className="nav-bar__left-menu">
                <IoMenu onClick={toggleMenu} className="mobile-hamburger__menu"/>
                <Link to="/"><img onClick={refresh} className="petflix-logo" src={logo} alt=""/></Link>
                
            </div>
            <div className="nav-bar__right-menu">
                <div className="nav-bar__search-container">
                    <IoSearch onClick={toggleSearch} className={ searchbar ? "nav-bar__icon open" : "nav-bar__icon"}/>
                    <IoClose onClick={handleClear} className={searchbar ? "clear-search clear-shown" : "clear-search"}/>
                    {searchbar ? <input onChange={handleSearch} value={query} className="nav-bar__search-input" placeholder="Titles" type="text"/> : null}
                </div>
                <div className="nav-bar__profile-dropdown">
                    <div className="nav-bar__profile-square"/>
                    <IoCaretDown className="nav-bar__caret"/>
                    <div className="nav-bar__dropdown-menu">
                        <div className="nav-bar__dropdown-contents">
                            <IoCaretDown className="nav-bar__dropdown-menu-caret"/>
                            <div className="nav-bar__dropdown-pups-profile">
                                <div className="nav-bar__dropdown-pups-profile-pic"/>
                                <p className="text">Pups</p>
                            </div>
                            <div className="nav-bar__dropdown-menu-line"/>
                            <a onClick={clearUser} className="nav-bar__dropdown-menu-link" href>Sign Out of Petflix</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
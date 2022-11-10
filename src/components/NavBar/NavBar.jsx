import { useState, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { TbAB, TbSearch, TbX } from "react-icons/tb";
import './nav-bar.scss';
import { IoMenuOutline } from 'react-icons/io5';


function NavBar(props) {
    const { openMobileMenu, handleSearch, query, handleClear, toggleMenu, account} = props;
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const randomColor = () => {
        const color = "#" + (Math.floor(Math.random()*16777215).toString(16));
        return color
    }

    function refresh() {
        window.location.reload();
    }

    return (
        <div className='section-wrapper navbar-wrapper'>
            <div className='section-container navbar-container'>
                <div className='navbar-logo'>
                   <h5 className='navbar-logo_text'>Petflix</h5> 
                </div>
                <div className='navbar-search'>
                    <TbSearch className='search_icon icon'/>
                    <input onChange={(x) => handleSearch(x)} ref={searchRef} value={query} className='search_input' placeholder='Search Movies' type='text' name='search'/>
                    {
                        query === '' ?
                        null :
                        <TbX className='clear_icon icon' onClick={handleClear}/>
                    }
                </div>
                <div onClick={() => navigate('/dashboard')} className='navbar-profile_icon' style={{backgroundColor: randomColor()}}>
                    {
                        account?.type === 'pups' ?
                        <p className="img">Pups</p> :
                        <p className="img initial">{account?.name.split('')[0]}</p> 
                    }
                </div>
                {/* <div onClick={openMobileMenu} className='navbar-menu'>
                   <IoMenuOutline className='icon'/> 
                </div> */}
            </div>
        </div>
    )
}

export default NavBar;
import { useState, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { TbAB, TbSearch, TbX } from "react-icons/tb";
import './nav-bar.scss';


function Footer(props) {
    const navigate = useNavigate();

    function refresh() {
        window.location.reload();
    }

    return (
        <div className='section-wrapper footer-wrapper'>
            <div className='section-container footer-container'>
                <div className='navbar-logo'>
                   <h5 className='navbar-logo_text'>Petflix</h5> 
                </div>
                <div className='copyright'>
                    <p>Copyright &copy; 2020 chriseke.com</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
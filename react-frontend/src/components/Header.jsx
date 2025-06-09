import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import webtubelogo from '../image/webtubelogo.jfif';

const Header2 = () => {


    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };



    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#006747' }} fixed-top>
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    <img src={webtubelogo} alt="WEBTUBE" className="brand-logo" />
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-expanded={!collapsed ? true : false}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${collapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                    <NavLink className="nav-link" to="/" onClick={() => setCollapsed(true)}> {/* Add this NavLink */}
                        <span className="navbar-title">THE DLSAU WEB-TUBE</span> {/* Use a span element */}
                    </NavLink>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/istorya">ISTORYA</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/aranetalk">AraneTalk</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/animo-spotlight">Animo Spotlight Series</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/balitaraneta">BalitAraneta</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/silid-aralneta">Silid-AralNeta</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/animo-vodcast">Animo VODCAST</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header2;

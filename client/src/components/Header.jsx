import React from 'react';
import logo from './assets/logo.png'

const Header = () => {
    return (
        <nav className={"navbar bg-light mb-4 p-0"}>
            <div className="container">
                <a className={"navbar-brand"} href={"/"}>
                    <span className="d-flex">
                        <img src={logo} alt="logo" className={"mr-2"}/>
                        <div><b>MERN GraphQL</b></div>
                    </span>
                </a>
            </div>
        </nav>
    );
};

export default Header;
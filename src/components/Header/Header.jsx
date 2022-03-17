import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {


    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={`${process.env.PUBLIC_URL}/img/argentBankLogo.png`}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {/* <Link className="main-nav-item" to="/">
            <i className="fa fa-user-circle"></i>
            Tony
          </Link>
          <Link className="main-nav-item" to="/">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link> */}
                <Link className="main-nav-item" to="/sign-in">
                    <i className="fa fa-user-circle"></i> Sign In
                </Link>
            </div>
        </nav>
    )
}

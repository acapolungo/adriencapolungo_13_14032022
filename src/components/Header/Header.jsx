import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from '../../Utils/selectors';
import { logOut } from '../../reducers/loginReducer';

export default function Header() {

    // const dispatch = useDispatch();
    const user = useSelector(selectLogin);
    const dispatch = useDispatch();
    const isResolved = user.status === 'authenticated';
    //console.log(isResolved)

    if (!isResolved) {
        <Navigate to='/' />
    }
    
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
            {isResolved ? (
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>{' '}
                            {user.user.firstName} {user.user.lastName}
                        </Link>
                        <Link className="main-nav-item" to="/" onClick={() => dispatch(logOut())} >
                            <i className="fa fa-sign-out"></i> Sign Out
                        </Link>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}

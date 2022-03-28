import React, {useEffect} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../Utils/selectors';
import { logOut } from '../../reducers/userReducer';
import { fetchUser } from '../../Utils/query';

export default function Header() {

    // const dispatch = useDispatch();
    const profile = useSelector(selectUser);
    const dispatch = useDispatch();
    const isResolved = profile.status === true;
    const JwtLocalToken = localStorage.getItem('jwt');

    useEffect(() => {
        JwtLocalToken && dispatch(fetchUser(JwtLocalToken))
    }, [JwtLocalToken, dispatch]);

    const logOutToken = () => {
        dispatch(logOut())
        localStorage.removeItem('jwt');
    }

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
                            {profile.user.firstName} {profile.user.lastName}
                        </Link>
                        <Link className="main-nav-item" to="/" onClick={logOutToken} >
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

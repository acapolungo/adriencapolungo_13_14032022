import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from '../../Utils/selectors';
import { fetchLogin } from '../../reducers/loginReducer';

export default function Login() {

    const dispatch = useDispatch();
    const login = useSelector(selectLogin);
    console.log(login)

    const [email, setEmailForm] = useState('');
    const [password, setPasswordForm] = useState('');

    console.log(email)
    console.log(password)

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(fetchLogin(email, password));
    };

    // if (freelances.status === 'rejected') {
    //     return <span>Il y a un problème</span>
    //   }
    // const isLoading = login.status === 'void' || login.status === 'pending';
    
    const isResolved = login.status === 'resolved';

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            placeholder="Email"
                            type="text"
                            id="username"
                            onChange={(e) => setEmailForm(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            placeholder="Password"
                            type="password"
                            id="password"
                            onChange={(e) => setPasswordForm(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>

            {isResolved && (
                <Navigate to='/profile' />
            )}
        </main>
    )
}

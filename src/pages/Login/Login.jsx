import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from '../../Utils/selectors';
import { fetchLogin } from '../../reducers/userReducer';
// Component
import Loader from '../../components/Loader/Loader';

export default function Login() {

    const dispatch = useDispatch();
    const login = useSelector(selectLogin);

    const [email, setEmailForm] = useState('');
    const [password, setPasswordForm] = useState('');
    const [error, setError] = useState(null);

    const validate = () => {
        if (!email && password) {
            setError('Merci d\'entrer un Email.')
            return false;
        } else if (!password && email) {
            setError('Merci d\'entrer un Password.')
            return false;
        } else if (!email && !password) {
            setError('Merci d\'entrer un Email et un Password.')
            return false;
        } else if (email && !email.includes('@')) {
            setError('Votre email n\'est pas valide.')
            return false;
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const signInIsValid = validate();
        if (signInIsValid) {
            dispatch(fetchLogin(email, password))
        };
    };

    //const error = login.status === 'unauthenticated';
    //console.log(isLoading)
    const isLoading = login.status === 'pending';
    const isResolved = login.status === 'updating';

    return (
        <>
            {isLoading ?
                <Loader />
                : (
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
                                        // required="required"
                                        id="username"
                                        onChange={(e) => setEmailForm(e.target.value)}
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        // required="required"
                                        id="password"
                                        onChange={(e) => setPasswordForm(e.target.value)}
                                    />
                                </div>
                                {error &&
                                    <div className="error">{error}</div>
                                }
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
                )}
        </>
    )
}

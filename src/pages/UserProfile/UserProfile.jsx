import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin, selectUser } from '../../Utils/selectors';
// import { setFirstName, setLastName } from '../../reducers/userEditReducer';
import { fetchUser } from '../../reducers/userReducer'

export default function UserProfile() {

  const [edit, SetEdit] = useState(false);

  const dispatch = useDispatch();
  const idToken = useSelector(selectLogin).token;
  console.log(idToken)

  const user = useSelector(selectUser);
  const isResolved = user.status === 'resolved';

  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');

  useEffect(() => {
    dispatch(fetchUser(idToken));
  }, [idToken, dispatch])

  console.log(user)

  // const handleSubmitUpdate = (e) => {
  //   e.preventDefault();

  //   // on envoit en dans la payload du state le nouveau nom et prénom
  //   dispatch(fetchUpdateUser());
  // };

  return (
    <main className="main bg-dark">
      <div className="header">
        {edit ? (
          <>
            <h1>Welcome back</h1>
            {/* onSubmit={handleSubmitUpdate} */}
            <form >
              {isResolved &&
                <div className=" input-wrapper input-wrapper--user">
                  <input
                    className="user-input-editor"
                    type="text"
                    id="username"
                    placeholder={user.data.body.firstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                  />
                  <input
                    className="user-input-editor"
                    type="text"
                    id="lastname"
                    placeholder={user.data.body.lastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                  />
                </div>
              }

              <div className="user-button">
                <button className="edit-button" type="submit">
                  Save
                </button>
                <button
                  className="edit-button"
                  onClick={() => SetEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {/* {user.user.firstName} {user.user.lastName} */}
            </h1>
            <button
              className="edit-button"
              onClick={() => SetEdit(true)}
            >
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      {/* {!isResolved && (
        <Navigate to='/' />
      )} */}
    </main>
  )
}

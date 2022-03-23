import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from '../../Utils/selectors';
import { fetchUser, updateUser } from '../../Utils/query';

export default function UserProfile() {
  const [editForm, setEditForm] = useState(false);

  const dispatch = useDispatch();
  const idToken = useSelector(selectLogin).token;
  // console.log(idToken)
  // console.log(user)

  const user = useSelector(selectLogin);
  console.log(user.status)
  const isResolved = user.status === 'authenticated';

  const [editFirstName, setEditFirstName] = useState('');
  // console.log(editFirstName)
  const [editLastName, setEditLastName] = useState('');

  useEffect(() => {
    dispatch(fetchUser(idToken));
  }, [idToken, dispatch])


  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    const loginRegex = /^[a-zA-Z]+[a-zA-Z'-]?[a-zA-Z]+$/;

    const updateValidate = () => {
      if (!loginRegex.test(editFirstName) && editFirstName === user.user.firstName) {
        return false
      }
      if (!loginRegex.test(editLastName) && editLastName === user.user.LastName) {
        return false
      }
      else {
        return true
      }
    }

    const updateIsValid = updateValidate();
    if (updateIsValid) {
      // on envoie dans le state le nouveau nom et prénom et le token
      dispatch(updateUser(idToken, editFirstName, editLastName));
    }
    setEditForm(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {editForm ? (
          <>
            <h1>Welcome back</h1>
            <form onSubmit={handleSubmitUpdate} >
              {isResolved &&
                <div className=" input-wrapper input-wrapper--user">
                  <input
                    placeholder="Prénom"
                    className="user-input-editor"
                    type="text"
                    id="firstName"
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                  />
                  <input
                    placeholder="Nom"
                    className="user-input-editor"
                    type="text"
                    id="lastName"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                  />
                </div>
              }
              <div className="user-button">
                <button className="edit-button edit-button--profile" type="submit">
                  Save
                </button>
                <button
                  className="edit-button"
                  onClick={() => setEditForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {isResolved &&
              <h1>
                Welcome back
                <br />
                {user.user.firstName} {user.user.lastName}
              </h1>
            }
            <button
              className="edit-button"
              onClick={() => setEditForm(true)}
            >
              Edit Profile
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
    </main>
  )
}

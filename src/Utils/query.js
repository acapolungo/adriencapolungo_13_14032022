import { selectLogin } from '../Utils/selectors'
import { loginFetching, loginResolved, loginRejected } from '../reducers/userReducer'
import { userResolved, userRejected } from '../reducers/userReducer'
import { updateFetching, updateResolved, updateRejected } from '../reducers/userReducer'

export function fetchLogin(email, password) {
    return async (dispatch, getState) => {
        const status = selectLogin(getState()).status

        if (!status === false) {
            return
        }
        // on envoie l'action fetching
        dispatch(loginFetching())
        try {
            const response = await fetch(
                `http://localhost:3001/api/v1/user/login`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            )
            const data = await response.json()
            // on envoie l'action qui récupère les datas
            dispatch(loginResolved(data.body.token))
            //console.log("data", data)
        } catch (error) {
            // on envoie l'action error
            console.log(error.message);
            dispatch(loginRejected(error.message))
        }
    }
}

export function fetchUser(idToken) {
    return async (dispatch, getState) => {
        const status = selectLogin(getState()).status

        // le statut n'est pas updating donc le token n'est pas envoyé
        if (!status === 'updating') {
            return
        }

        try {
            const response = await fetch(
                `http://localhost:3001/api/v1/user/profile`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + idToken,
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await response.json()
            // on envoie l'action qui récupère les datas du user
            dispatch(userResolved(data.body))
            //console.log("data", data.body)
        } catch (error) {
            // on envoie l'action error
            dispatch(userRejected(error.message))
        }
    }
}


export function updateUser(idToken, firstName, lastName) {
    return async (dispatch, getState) => {
        const status = selectLogin(getState()).status
        const newFirstName = firstName
        const newLastBame = lastName

        // le statut n'est pas updating donc le token n'est pas envoyé
        if (!status === 'updating') {
            return
        }
        dispatch(updateFetching())
        try {
            const response = await fetch(
                `http://localhost:3001/api/v1/user/profile`,
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + idToken,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: newFirstName,
                        lastName: newLastBame,
                    }),
                }
            )
            const data = await response.json()
            // on envoie l'action pour modifier le state nom et prénom
            dispatch(updateResolved(data.body))
            // console.log("data", data.body)
        } catch (error) {
            // on envoie l'action error
            dispatch(updateRejected(error.message))
        }
    }
}
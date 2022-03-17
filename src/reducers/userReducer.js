// import produce from 'immer';
import { createAction, createReducer } from '@reduxjs/toolkit'
import { selectUser } from '../Utils/selectors'

const initialState = {
    user: {
        email: null,
        id: null,
        firstName: null,
        lastName: null,
    },
    statusUser: 'void',
    error: null,
};

// Fetching action
export const userFetching = createAction('user/fetching')
export const userResolved = createAction('user/resolved')
export const userRejected = createAction('user/rejected')

export function fetchUser(idToken) {
    return async (dispatch, getState) => {
        const status = selectUser(getState()).status

        if (status === 'pending' || status === 'updating') {
            return
        }
        // on envoie l'action fething
        dispatch(userFetching())
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
            // on envoie l'action qui récupère les datas
            dispatch(userResolved(data.body))
            console.log("data", data.body)
        } catch (error) {
            // on envoie l'action error
            dispatch(userRejected(error))
        }
    }
}

export default createReducer(initialState, (builder) => {
    builder
        // faire des changements via immer
        // draft c'est une copie de notre state et action sont les params de l'action

        // si l'action est de type Fetching
        .addCase(userFetching, (draft) => {
            // si le statut est void
            if (draft.statusUser === 'void') {
                // on passe en pending
                draft.statusUser = 'pending'
                return
            }
            // si le statut est rejected
            if (draft.statusUser === 'rejected') {
                // on supprime l'erreur et on passe en pending
                draft.statusUser = null
                draft.statusUser = 'pending'
                return
            }
            // si le statut est resolved
            if (draft.statusUser === 'resolved') {
                // on passe en updating (requête en cours mais des données sont déjà présentes)
                draft.statusUser = 'updating'
                return
            }
            // sinon l'action est ignorée
            return
        })
        // si l'action est de type Resolved
        .addCase(userResolved, (draft, action) => {
            // si la requête est en cours
            if (draft.statusUser === 'pending' || draft.statusUser === 'updating') {
                // on passe en resolved et récupère le payload soit nos données
                const firstName = action.payload.firstName
                draft.user.firstName = firstName
                const lastName = action.payload.lastName
                draft.user.lastName = lastName
                const email = action.payload.email
                draft.user.email = email
                const id = action.payload.id
                draft.user.id = id
                draft.statusUser = 'resolved'
                return
            }
            // sinon l'action est ignorée
            return
        })
        // si l'action est de type Rejected
        .addCase(userRejected, (draft, action) => {
            // si la requête est en cours
            if (draft.status === 'pending' || draft.status === 'updating') {
                // on passe en rejected, on sauvegarde l'erreur et on supprime les données
                draft.error = action.payload
                draft.user.firstName = null
                draft.statusUser = 'rejected'
                return
            }
            // sinon l'action est ignorée
            return
        })
})
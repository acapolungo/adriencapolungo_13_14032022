import { createAction, createReducer } from '@reduxjs/toolkit'

// Le state initial de la feature freelances
const initialState = {
    user: {
        email: null,
        id: null,
        firstName: null,
        lastName: null,
    },
    // le statut permet de suivre l'état de la requête
    status: false,
    // les données lorsque la requête a fonctionné
    token: null,
    // l'erreur lorsque la requête échoue
    errorMessage: null,
}

// Fetching action
export const loginFetching = createAction('login/fetching')
export const loginResolved = createAction('login/resolved')
export const loginRejected = createAction('login/rejected')

export const userResolved = createAction('user/resolved')
export const userRejected = createAction('user/rejected')

export const updateFetching = createAction('update/fetching')
export const updateResolved = createAction('update/resolved')
export const updateRejected = createAction('update/rejected')

export const logOut = createAction('login/logout')

// Reducer
// valeur par defaut du state initialState
export default createReducer(initialState, (builder) =>
    builder
        // faire des changements via immer
        // Draft c'est une copie de notre state et action sont les params de l'action

        // si l'action est de type loginFetching
        .addCase(loginFetching, (draft) => {
            // si le statut est unauthenticated
            if (draft.status === false) {
                // on passe en pending
                draft.status = 'pending'
                return
            }
            // sinon l'action est ignorée
            return
        })
        // si l'action est de type loginResolved
        .addCase(loginResolved, (draft, action) => {
            // si la requête est en cours
            if (draft.status === 'pending') {
                // on passe en updating et récupère le payload token
                draft.token = action.payload
                draft.status = 'updating'
                return
            }
            // sinon l'action est ignorée
            return
        })
        // si l'action est de type loginRejected
        .addCase(loginRejected, (draft, action) => {
            // si la requête est en cours
            if (draft.status === 'pending') {
                // on passe en rejected, on sauvegarde l'erreur et on supprime les données
                draft.errorMessage = action.payload
                draft.token = null
                draft.status = false
                return
            }
            // sinon l'action est ignorée
            return
        })
        // si l'action est de type updating
        .addCase(userResolved, (draft, action) => {
            // si la requête à bien reçu le token
            draft.status = 'updating'
            if (draft.status === 'updating') {
                // on passe en authenticated et récupère le payload soit nos données
                const firstName = action.payload.firstName
                draft.user.firstName = firstName
                const lastName = action.payload.lastName
                draft.user.lastName = lastName
                const email = action.payload.email
                draft.user.email = email
                const id = action.payload.id
                draft.user.id = id
                draft.status = true
                return
            }
            // sinon l'action est ignorée
            return
        })
        // si l'action est de type Rejected
        .addCase(userRejected, (draft, action) => {
            // si la requête est en cours
            if (draft.status === 'updating') {
                // on passe en rejected, on sauvegarde l'erreur et on supprime les données
                draft.errorMessage = action.payload
                draft.user.firstName = null
                draft.user.lastName  = null
                draft.status = 'rejected'
                return
            }
        })
        // si lon est connecté
        .addCase(updateFetching, (draft, action) => {
            if(draft.status === true) {
                draft.status = 'updating'
            }
        })

        // si l'action est de type updating
        .addCase(updateResolved, (draft, action) => {
            if (draft.status === 'updating') {
                // on passe en resolved et récupère le payload soit nos données
                const firstName = action.payload.firstName
                draft.user.firstName = firstName
                const lastName = action.payload.lastName
                draft.user.lastName = lastName
                const email = action.payload.email
                draft.user.email = email
                const id = action.payload.id
                draft.user.id = id
                draft.status = true
                return
            }
            // sinon l'action est ignorée
            return
        })
        // si l'action est de type Rejected
        .addCase(updateRejected, (draft, action) => {
            if (draft.status === 'updating') {
                // on passe en rejected, on sauvegarde l'erreur et on supprime les données
                draft.errorMessage = action.payload
                draft.user.firstName = null
                draft.user.lastName  = null
                draft.status = 'rejected'
                return
            }
        })
        // si l'action est de se déloguer
        .addCase(logOut, (draft) => {
            draft.user.firstName = null;
            draft.user.lastName = null;
            draft.user.email = null;
            draft.user.id = null;
            draft.status = false;
            draft.token = null;
            draft.error = null;
        })

)

// // 3 constantes stockées dans les variables
// const FETCHING = 'freelances/fetching'
// const RESOLVED = 'freelances/resolved'
// const REJECTED = 'freelances/rejected'

// // Créer des actions créator pour chacune des actions
// const freelancesFetching = () => ({ type: FETCHING });
// const freelancesResolved = (data) => ({ type: RESOLVED, payload: data });
// const freelancesRejected = (error) => ({ type: REJECTED, payload: error });

// export async function fetchOrUpdateFreelances(store) {
//     // const status = store.getState().freelances.status
//     // on va utiliser un selector pour accéder au freelances depuis le state
//     // selectFreelances de store.getState()
//     const status = selectFreelances(store.getState()).status
//     if (status === 'pending' || status === 'updating') {
//         // ignorer l'execution de l'action pour éviter d'avoir des doubles requêtes
//         return
//     }
//     // On indique que la requête à demarrée
//     store.dispatch(freelancesFetching())
//     try {
//         const response = await fetch('http://localhost:8000/freelances')
//         const data = await response.json()
//         // on envoie les data au store
//         store.dispatch(freelancesResolved(data))
//     } catch (error) {
//         store.dispatch(freelancesRejected(error))
//     }
// }

// // maintenant on créer le réducer
// export default function freelancesReducers(state = initialState, action) {
//     return produce(state, draft => {
//         switch (action.type) {
//             case FETCHING: {
//                 if (draft.status === 'void') {
//                     draft.status = 'pending'
//                     return;
//                 }
//                 if (draft.status === 'rejected') {
//                     draft.error = null
//                     draft.status = 'pending'
//                     return;
//                 }
//                 if (draft.status === 'resolved') {
//                     draft.error = null
//                     draft.status = 'updating'
//                     return;
//                 }
//                 return
//             }
//             case RESOLVED: {
//                 if (draft.status === 'pending' || draft.status === 'udating') {
//                     draft.data = action.payload
//                     draft.status = 'resolved'
//                     return;
//                 }
//                 return
//             }
//             case REJECTED: {
//                 if (draft.status === 'pending' || draft.status === 'udating') {
//                     draft.data = action.payload
//                     draft.status = 'rejected'
//                     return;
//                 }
//                 return
//             }
//             default:
//                 return;
//         }
//     })
// }

// const loginResolved = createAction(
//     'login/resolved',
//     (data) => ({
//         payload: { data },
//     })
// )

// const loginRejected = createAction(
//     'login/rejected',
//     (error) => ({
//         payload: { error },
//     })
// )
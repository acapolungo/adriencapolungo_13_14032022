// import produce from 'immer';
import { createAction, createReducer } from '@reduxjs/toolkit'
import { selectLogin } from '../Utils/selectors'

// Le state initial de la feature freelances
const initialState = {
    // le statut permet de suivre l'état de la requête
    status: 'void',
    // les données lorsque la requête a fonctionné
    token: null,
    // l'erreur lorsque la requête échoue
    error: null,
}

// Fetching action
const loginFetching = createAction('login/fetching')
const loginResolved = createAction('login/resolved')
const loginRejected = createAction('login/rejected')

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

export function fetchLogin(email, password) {
    return async (dispatch, getState) => {
        const status = selectLogin(getState()).status
        console.log(status)

        if (status === 'pending' || status === 'updating') {
            return
        }
        // on envoie l'action fething
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
            console.log("data", data)
        } catch (error) {
            // on envoie l'action error
            dispatch(loginRejected(error))
        }
    }
}

// Login reducer
// valeur par defaut du state initialState
export default createReducer(initialState, (builder) =>
    builder
        // faire des changements via immer
        // draft c'est une copie de notre state
        // action sont les params de l'action

        // si l'action est de type Fetching
        .addCase(loginFetching, (draft) => {
            // si le statut est void
            if (draft.status === 'void') {
                // on passe en pending
                draft.status = 'pending'
                return
            }
            // si le statut est rejected
            if (draft.status === 'rejected') {
                // on supprime l'erreur et on passe en pending
                draft.error = null
                draft.status = 'pending'
                return
            }
            // si le statut est resolved
            if (draft.status === 'resolved') {
                // on passe en updating (requête en cours mais des données sont déjà présentes)
                draft.status = 'updating'
                return
            }
            // sinon l'action est ignorée
            return
        })
        // si l'action est de type Resolved
        .addCase(loginResolved, (draft, action) => {
            // si la requête est en cours
            if (draft.status === 'pending' || draft.status === 'updating') {
                // on passe en resolved et récupère le payload soit nos données
                draft.token = action.payload
                draft.status = 'resolved'
                return
            }
            // sinon l'action est ignorée
            return
        })
        // si l'action est de type Rejected
        .addCase(loginRejected, (draft, action) => {
            // si la requête est en cours
            if (draft.status === 'pending' || draft.status === 'updating') {
                // on passe en rejected, on sauvegarde l'erreur et on supprime les données
                draft.error = action.payload
                draft.token = null
                draft.status = 'rejected'
                return
            }
            // sinon l'action est ignorée
            return
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
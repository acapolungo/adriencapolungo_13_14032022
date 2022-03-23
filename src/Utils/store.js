import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';

// reduxToolkit fait la connexion aux devTool et la création du store
export const store = configureStore({
  reducer: {
    login: userReducer,
  }
})
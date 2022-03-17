import React from 'react'
import { Routes, Route } from 'react-router-dom';

// système de rooting de base
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import UserProfile from '../pages/UserProfile/UserProfile'

export default function RoutesPath() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/profile" element={<UserProfile />} />
      {/* <Route path="/*" element={<Error404 error="Il y a eu une erreur" />} /> */}
    </Routes>
  )
}
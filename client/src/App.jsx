import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import Templates from './pages/Templates/Templates';
import Favourites from './pages/Favourites/Favourites';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Home from './pages/Home/Home';
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Menubar from './Menubar/Menubar'
import AppContext from './context/AppContext';

const App = () => {
  const location = useLocation();
  const { loggedIn } = useContext(AppContext);

  const ProtectedRoute = ({ children }) => {
    return loggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <Menubar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />}/>
        <Route path="/favourites" element={
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        }/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App;
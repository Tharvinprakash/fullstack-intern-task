import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Menubar.css'
import AppContext from '../context/AppContext';

const Menubar = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setAuthData } = useContext(AppContext);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    setAuthData(null);
    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Menubar useEffect - Token exists:", !!token);
    setLoggedIn(!!token);
    
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [setLoggedIn])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TemplateHub
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className='nav-item'>
              <Link 
                className={`nav-link ${currentPath === '/' ? 'active' : ''}`} 
                to='/'
              >
                Home
              </Link>
            </li>

            {loggedIn && (
              <>
                <li className='nav-item'>
                  <Link 
                    className={`nav-link ${currentPath === '/templates' ? 'active' : ''}`} 
                    to='/templates'
                  >
                    Templates
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link 
                    className={`nav-link ${currentPath === '/favourites' ? 'active' : ''}`} 
                    to='/favourites'
                  >
                    Favourites
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {loggedIn ? (
              <li className='nav-item'>
                <button 
                  className='nav-link btn btn-link text-light p-0' 
                  onClick={logout}
                  style={{ 
                    border: 'none', 
                    background: 'none',
                    textDecoration: 'none'
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <Link 
                    className={`nav-link ${currentPath === '/login' ? 'active' : ''}`} 
                    to='/login'
                  >
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link 
                    className={`nav-link ${currentPath === '/register' ? 'active' : ''}`} 
                    to='/register'
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Menubar;
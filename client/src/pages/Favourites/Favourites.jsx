import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import './Favourites.css';

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      toast.error('Please login to view favorites');
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [loggedIn, navigate]);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/favourites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">My Favorite Templates</h1>
          
          {favorites.length === 0 ? (
            <div className="text-center">
              <p className="text-muted">You haven't added any templates to favorites yet.</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/templates')}
              >
                Browse Templates
              </button>
            </div>
          ) : (
            <div className="row">
              {favorites.map(template => (
                <div key={template.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card template-card h-100">
                    <img
                      src={`http://localhost:5000${template.thumbnail_url}`}
                      className="card-img-top"
                      alt={template.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{template.name}</h5>
                      <p className="card-text flex-grow-1">{template.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-primary">{template.category}</span>
                        <span className="text-success">★ Favorite</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AppContext from '../../context/AppContext';
import './Templates.css';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { loggedIn } = useContext(AppContext);

  const categories = ['All', 'Personal', 'Business', 'Content'];

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchTerm, selectedCategory]);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/templates');
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    setFilteredTemplates(filtered);
  };

  const handleAddToFavorites = async (templateId) => {
    if (!loggedIn) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('No authentication token found');
        return;
      }

      const templateIdNumber = parseInt(templateId);

      await axios.post(
        `http://localhost:5000/api/favourites/${templateIdNumber}`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Added to favorites!');
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login again');
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 404) {
        toast.error('Template not found');
      } else {
        toast.error('Failed to add to favorites');
      }
    }
  };

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
          <h1 className="text-center mb-4">Template Gallery</h1>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            {filteredTemplates.length === 0 ? (
              <div className="col-12 text-center">
                <p className="text-muted">No templates found.</p>
              </div>
            ) : (
              filteredTemplates.map(template => (
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
                        <button
                          className={`btn ${loggedIn ? 'btn-warning' : 'btn-secondary'}`}
                          onClick={() => handleAddToFavorites(template.id)}
                          disabled={!loggedIn}
                        >
                          {loggedIn ? '♥ Add to Favorites' : 'Login to Favorite'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { register } from '../../services/AuthService';
import './Register.css'

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
    if (errors[name]) {
      setErrors((errors) => ({ ...errors, [name]: "" }));
    }
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.name) {
      newErrors.name = "Name is required";
    } else if (data.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (data.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }
    
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      console.log("Sending registration data:", data);
      const response = await register(data);
      console.log("Registration response:", response);
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Register successful");
        navigate("/login");
      }
    } catch (err) {
      console.error("Full registration error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-light d-flex align-items-center justify-content-center vh-100 register-background">
        <div className="card shadow-lg w-100" style={{ maxWidth: '480px' }}>
          <div className="card-body">
            <div className="text-center">
              <h1 className="card-title">Register</h1>
              <p className='card-text text-muted'>
                Register account
              </p>
            </div>
            <div className="mt-4">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label text-muted">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder='yourname'
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                    minLength="2"
                    maxLength="50"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='yourname@example.com'
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={onChangeHandler}
                    value={data.email}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder='********'
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    onChange={onChangeHandler}
                    value={data.password}
                    required
                    minLength="6"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                
                <div className="d-grid">
                  <button type='submit' className="btn btn-dark btn-lg" disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
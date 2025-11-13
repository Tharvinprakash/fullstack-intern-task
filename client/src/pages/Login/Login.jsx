import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { login } from '../../services/AuthService';
import AppContext from '../../context/AppContext';
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setAuthData } = useContext(AppContext);

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
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
      const response = await login(data);
      if (response.status === 200) {
        console.log("Login successful, response:", response.data);
        localStorage.setItem("token", response.data.token);
        setAuthData(response.data.token);
        setLoggedIn(true); 
        toast.success("Login successful");
        navigate("/templates"); 
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Email/Password invalid");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">
        <div className="card shadow-lg w-100" style={{ maxWidth: '480px' }}>
          <div className="card-body">
            <div className="text-center">
              <h1 className="card-title">Log in</h1>
              <p className='card-text text-muted'>
                Login to your account
              </p>
            </div>
            <div className="mt-4">
              <form onSubmit={onSubmitHandler}>
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
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="d-grid">
                  <button type='submit' className="btn btn-dark btn-lg" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
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

export default Login
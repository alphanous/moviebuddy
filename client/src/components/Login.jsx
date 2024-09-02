import React, {useState,useContext} from 'react';
import './css/Login.css'
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
const initialValues = {
  email: "",
  password: ""
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState(initialValues)
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleData = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!data.email) {
      newErrors.email = "!Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      newErrors.email = "!Invalid email address.";
    }

    if (!data.password) {
      newErrors.password = "!Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          login(result.user);
          setIsLoggedIn(true);
        } else {
          console.log(result)
          setServerError(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div className='login_form'>
      <div className="form_container">
        <h1>Login</h1>
        <form className='mylform' onSubmit={submitData}>
          <div className="input_field">
            <label htmlFor="email"><MdEmail /></label>
            <input type="email" name='email' placeholder='enter email...' value={data.email} onChange={handleData}/>
            <span>{errors.email}</span>
          </div>
          <div className="input_field">
            <label htmlFor=""><FaKey /></label>
            <input type="password" name='password' placeholder='enter password...' onChange={handleData} value={data.password}/>
            <span>{errors.password || serverError}</span>
          </div>
          <a href="/signup">Don't have an Account? Click Here</a>
          <button className='lbtn' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
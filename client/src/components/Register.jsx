import React, { useState } from 'react';
import './css/Register.css';
import { Navigate } from 'react-router-dom';
import { FaUser, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const Register = () => {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [uniqueError, setUniqueError] = useState('');

  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = async () => {
    const newErrors = {};

    if (!data.name) {
      newErrors.name = "!Name is required.";
    }

    if (!data.email) {
      newErrors.email = "!Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      newErrors.email = "!Invalid email address.";
    }

    if (!data.password) {
      newErrors.password = "!Password is required.";
    } else if (data.password.length < 6) {
      newErrors.password = "!Password must be at least 6 characters long.";
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "!Passwords must match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      try {
        const response = await fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          setIsRegistered(true);
        } else {
          setUniqueError(result.message);
        }

      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isRegistered) {
    return <Navigate to='/login' replace={true} />;
  }

  return (
    <div className="register">
      <div className="main_content">
        <h1>Register</h1>
        <form className='myform' onSubmit={submitData}>
          <div className="input_field">
            <label htmlFor="name"><FaUser /></label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder='Name..'
              value={data.name}
              onChange={handleData}
            />
            <span><p>{errors.name}</p></span>
          </div>
          <div className="input_field">
            <label htmlFor="email"><MdEmail /></label>
            <input
              type="email"
              name='email'
              id='email'
              placeholder='Email..'
              value={data.email}
              onChange={handleData}
            />
            <span><p>{errors.email || uniqueError}</p></span>
          </div>
          <div className="input_field">
            <label htmlFor="password"><FaKey /></label>
            <input
              type="password"
              name='password'
              id='password'
              placeholder='Password..'
              value={data.password}
              onChange={handleData}
            />
            <span><p>{errors.password}</p></span>
          </div>
          <div className="input_field">
            <label htmlFor="confirmPassword"><FaKey /></label>
            <input
              type="password"
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Confirm Password..'
              value={data.confirmPassword}
              onChange={handleData}
            />
            <span><p>{errors.confirmPassword}</p></span>
          </div>
          <a href="/login">Already Registered? Click Here</a>
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

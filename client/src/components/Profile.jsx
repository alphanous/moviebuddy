import React, { useContext } from 'react';
import './css/Profile.css';
import { ImCross } from "react-icons/im";
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = ({ onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="Profile">
      <button className='close' onClick={onClose}><ImCross/></button>
      <img src='https://cdn-icons-png.freepik.com/512/806/806141.png' alt="User" className="ProfilePhoto" />
      {user ? (
        <div className="ProfileHeader">
          <h2>Name: {user.name}</h2>
          <h2>Email: {user.email}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default Profile;

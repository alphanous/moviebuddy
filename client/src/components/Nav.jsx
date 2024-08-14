import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import './css/Nav.css'
import Profile from './Profile';
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from './AuthContext';

const Nav = () => {
    const [showProfile, setShowProfile] = useState(false);
    const {user} = useContext(AuthContext);
    var showMenu= ()=>{
        var bar=document.getElementsByClassName("bar");
        var ham=document.getElementsByClassName("NavbarLinks");
        bar[0].classList.toggle("barOne");
        bar[1].classList.toggle("barTwo");
        bar[2].classList.toggle("barThree");

        ham[0].classList.toggle("showNavbar");
    }

    var hideMenu = ()=>{
        var bar=document.getElementsByClassName("bar");
        var ham=document.getElementsByClassName("NavbarLinks");
        bar[0].classList.remove("barOne");
        bar[1].classList.remove("barTwo");
        bar[2].classList.remove("barThree");
        ham[0].classList.remove("showNavbar");
    }
    
  return (
    <nav className='Navbar'> 
 
        <h1 title='Reload' onClick={()=>window.location.reload(true)} className='Logo'>Moviebuddy</h1>

        <div className='Hamburger' onClick={showMenu}>
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
        </div>

        <ul className='NavbarLinks'>
            <li onClick={hideMenu}><Link to="/" className='nav-link'> Home</Link></li>
            <li onClick={hideMenu}><Link to="/ticket" className='nav-link'>Book Ticket</Link></li>
            <li onClick={hideMenu}><Link to="/services" className='nav-link'>Services</Link></li>
            <li><a onClick={() => setShowProfile(true)} className='pbtn'><FaUserCircle/>{user?`${user.name.substring(0,3)}...`:'Login'}</a></li>
        </ul>
        {showProfile && <div className="overlay" onClick={() => setShowProfile(false)}></div>}
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </nav>
  )
}

export default Nav
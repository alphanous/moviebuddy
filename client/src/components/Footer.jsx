import React from 'react'
import { FaFacebook,FaLinkedin,FaInstagramSquare } from "react-icons/fa";
import './css/Footer.css'

const Footer = () => {
  return (
    <div className='foo'>
        <p>&copy; 2024 Moviebuddy. All rights reserved.</p>
        <p>Follow me on Social Media</p>
        <div className="social_media">
            <div className="icon"><FaFacebook/></div>
            <div className="icon"><FaLinkedin/></div>
            <div className="icon"><FaInstagramSquare/></div>
        </div>
    </div>
  )
}

export default Footer
import React, { useContext, useState,useEffect } from 'react';
import './css/Ticket.css';
import Nav from './Nav';
import { AuthContext } from './AuthContext';
import MovieData from './MovieList';
import img1 from '../images/oops.png';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";

const Ticket = () => {
    const [step, setStep] = useState(1);
    const [movie, setMovie] = useState('');
    const [showtime, setShowtime] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Delay the appearance slightly to ensure the animation works smoothly on load
        const timer = setTimeout(() => {
          setVisible(true);
        }, 100); // Adjust delay if needed
    
        return () => clearTimeout(timer); // Cleanup the timer on unmount
      }, []);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login', { replace: true });
      };

    // Proceed to next step
    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    // Go to previous step (if needed)
    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    // Handle movie and showtime selection
    const handleSelection = (e) => {
        const { name, value } = e.target;
        if (name === 'movie') setMovie(value);
        if (name === 'showtime') setShowtime(value);
    };


    // Submit user details (simulating email sending)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can integrate with a backend service to send the confirmation email
        nextStep();
    };

    return (
        <div className="ticket_page">
            <Nav />
            <div className="main_conatiner">
                {user ? (
                    <div className="booking-ticket">
                        {step === 1 && (
                            <div className="step-1">
                                <h2>Select Movie and Showtime</h2>
                                <div>
                                    <label>Movie: </label>
                                    <select name="movie" value={movie} onChange={handleSelection}>
                                        <option value="selct movie">Select Movie</option>
                                        {MovieData.map((value) => (
                                            <option key={value.id} value={value.title}>
                                                {value.title}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <div>
                                    <label>Showtime: </label>
                                    <select name="showtime" value={showtime} onChange={handleSelection}>
                                        <option value="">Select Showtime</option>
                                        <option value="12:00PM">12:00 PM</option>
                                        <option value="3:00PM">3:00 PM</option>
                                        {/* Add more showtimes as needed */}
                                    </select>
                                </div>
                                <button onClick={nextStep} disabled={!movie || !showtime}>
                                    Proceed
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="step-2">
                                <h2>Check-in</h2>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label>Name: </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Email: </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            required
                                        />
                                    </div>
                                    <button onClick={nextStep}>Confirm Check-in</button>
                                    <button type="button" onClick={prevStep}>Back</button>
                                </form>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="step-3">
                                <h2>Booking Confirmation</h2>
                                <div className="confirmation">
                                    <span className="checkmark">✔</span>
                                    <p>Your booking is confirmed!</p>
                                </div>
                                <button onClick={() => setStep(1)}>Book Another Ticket</button>
                            </div>
                        )}
                    </div>

                ) : (
                    <div className='not_login'>
                        <div className={`upper_message ${visible ? 'show' : 'hide'}`}>
                        <button className='close_message'><ImCross/></button>
                            <h3>You Have to Login first</h3>
                        </div>
                        <div className="not_image">
                            <Player
                                src='https://lottie.host/474c70bb-2f66-4eb3-9fb2-dcccd1cdc7fe/vzb6bF3LzO.json'
                                className="player"
                                loop
                                autoplay
                            />
                        </div>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ticket;

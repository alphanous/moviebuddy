import React, { useContext, useState, useEffect } from 'react';
import './css/Ticket.css';
import Nav from './Nav';
import { AuthContext } from './AuthContext';
import MovieData from './MovieList';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
// import { ImCross } from "react-icons/im";
import Footer from './Footer';

const initialSeatData = [
    {
        id: 0,
        title: 'KALKI 2898 AD',
        price:150,
        booked: {
            "9 AM": ['A1', 'B1', 'C3'],
            "1 PM": ['C1', 'D1'],
            "6 PM": ['E1', 'F1'],
            "9 PM": ['G1', 'H1', 'G3', 'G4', 'G5', 'G6', 'G8', 'G9', 'D4', 'D7', 'D8', 'D9', 'A6', 'A7', 'A9', 'A10',
                'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10']
        }
    },
    {
        id: 1,
        title: 'GODZILLA X KONG : THE ...',
        price:200,
        booked: {
            "9 AM": ['A2', 'B2'],
            "1 PM": ['C2', 'D2'],
            "6 PM": ['E2', 'F2'],
            "9 PM": ['G2', 'H2']
        }
    }
];

const Ticket = () => {
    const [seatData, setSeatData] = useState(initialSeatData);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setisLoading] = useState(true);



    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setisLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    const handleLogin = () => {
        navigate('/login', { replace: true });
    };

    const handleMovieChange = (e) => setSelectedMovie(e.target.value);
    const handleTimeChange = (e) => setSelectedTime(e.target.value);

    const getBookedSeats = () => {
        const movie = seatData.find((m) => m.title === selectedMovie);
        return movie ? movie.booked[selectedTime] || [] : [];
    };

    const bookedSeats = getBookedSeats();

    const bookSeat = (seatId) => {
        if (!bookedSeats.includes(seatId)) {
            setSelectedSeats([...selectedSeats, seatId]);
            setSeatData((prevSeatData) =>
                prevSeatData.map((movie) =>
                    movie.title === selectedMovie
                        ? {
                            ...movie,
                            booked: {
                                ...movie.booked,
                                [selectedTime]: [...movie.booked[selectedTime], seatId],
                            },
                        }
                        : movie
                )
            );
            setCount(count + 1);
        }
    };

    const renderSeat = (seatId) => {
        const isBooked = bookedSeats.includes(seatId);
        return (
            <div
                key={seatId}
                className={`seat ${isBooked ? 'booked' : 'available'}`}
                id={seatId}
                onClick={() => bookSeat(seatId)}
            ></div>
        );
    };

    // const amount_to_pay = () =>{
    //    const index = initialSeatData.find((x)=> x===selectedMovie);
    //    let total = initialSeatData[index].price;
    //    return total*count
    // }

    return (
        <>
            <div className="ticket_page">
                <Nav />
                <div className="main_conatiner">
                    {user ? (
                        <>
                            <div className="booking-ticket">
                                <h1>Book Your Ticket</h1>
                                <div className="selection">
                                    <div className="time_sel">
                                        <select name="time" id="time" value={selectedTime} onChange={handleTimeChange}>
                                            <option value="" disabled>Select Time</option>
                                            <option value="9 AM">9 AM</option>
                                            <option value="1 PM">1 PM</option>
                                            <option value="6 PM">6 PM</option>
                                            <option value="9 PM">9 PM</option>
                                        </select>
                                    </div>
                                    <div className="movie_sel">
                                        <select name="movie" id="movie" value={selectedMovie} onChange={handleMovieChange}>
                                            <option value="" disabled>Select Movie</option>
                                            {MovieData.map((data, id) => (
                                                <option value={data.title} key={id}>{data.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="seat_selection">
                                    {selectedMovie && selectedTime ? (
                                        <>
                                        <div className="row_A">
                                        {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'].map(renderSeat)}
                                    </div>
                                    <div className="row_B">
                                        {['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'].map(renderSeat)}
                                    </div>
                                    <div className="row_C">
                                        {['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'].map(renderSeat)}
                                    </div>
                                    <div className="row_D">
                                        {['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'].map(renderSeat)}
                                    </div>
                                    <div className="row_E">
                                        {['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'].map(renderSeat)}
                                    </div>
                                    <div className="row_F">
                                        {['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'].map(renderSeat)}
                                    </div>
                                    <div className="row_G">
                                        {['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10'].map(renderSeat)}
                                    </div>
                                    <div className="row_I">
                                        {['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10'].map(renderSeat)}
                                    </div>
                                        </>):(
                                            <h1>Select Movie and Time</h1>
                                        )}
                                </div>
                                <div className="info">
                                    <h1>Available Seats: {100 - bookedSeats.length}</h1>
                                    <h1>You Selected: {count}</h1>
                                </div>
                            </div>
                            <div className="poll"></div>
                            <div className="booking_summary">
                                {selectedMovie ? (
                                    isLoading ? (
                                        <div className="loader">
                                            <div className="loader_area">
                                                <Player
                                                    src='https://lottie.host/3d2e66d9-437f-427a-8271-d3fce8f0ec6d/a79HVXVCtJ.json'
                                                    className="player1"
                                                    loop
                                                    autoplay
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h1>Booking-Summary</h1>
                                            <div className="summary_info">
                                                <h3>Selected Movie: {selectedMovie}</h3>
                                                <h3>Selected Time: {selectedTime}</h3>
                                                <h3>Selected Seats: {selectedSeats.join(', ')}</h3>
                                                {/* <h3>Total Amount to Pay: {amount_to_pay}</h3> */}
                                                <button>check-out</button>
                                            </div>
                                        </>
                                    )
                                ) : (
                                    <h1>No movie selected</h1>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className='not_login'>
                            {/* <div className={`upper_message ${visible ? 'show' : 'hide'}`}>
                                <button className='close_message'><ImCross /></button>
                                <h3>You Have to Login first</h3>
                            </div> */}
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
            <Footer />
        </>
    );
};

export default Ticket;

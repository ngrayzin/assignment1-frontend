import React, { useState, useEffect } from 'react';
import getTrips from '../api/trips/getTrips';
import enrollTrip from '../api/trips/enrollTrip'
import Settings from '../settings/settings';
import { toast } from 'react-toastify';

const Trips = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [trips, setTrips] = useState([]);
    const settings = new Settings();
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState(1);

    useEffect(() => {
        const parsedUserInfo = JSON.parse(settings.user);;
        setUserInfo(parsedUserInfo);
        const fetchData = async (id) => {
        try {
            const fetchTrips = await getTrips(id);
            if (fetchTrips) {
                setTrips(fetchTrips);
            }
        } catch (error) {
            // Handle error if any
            console.error("Error fetching data:", error);
        }
        };

        if(parsedUserInfo && parsedUserInfo?.userID > 0){
            fetchData(parsedUserInfo?.userID); // Call the async function to fetch data}
        }
    }, []);  

    const handleConfirmEnrollment = async (tripID) => {
        const data = {
            availableSeats: selectedSeats
        }
        const res = await enrollTrip(data, tripID, userInfo?.userID);
        if(res.ok){
            toast.success("Enrolled into trip")
            const updatedTrips = await getTrips(userInfo?.userID);
            setTrips(updatedTrips);
        }
        else if(res.status === 409){
            toast.error("Enrollment Conflict! You have a current trip that is either 30 minutes before or after this enrolled trip");
        }
        else {
            toast.error("Something went wrong");
        }
    };

    const handleOpenModal = (index) => {
        setOpenModalIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedSeats(1);
        setOpenModalIndex(null);
    };

    const handleChange = (e) => {
        const inputValue = parseInt(e.target.value);
        if (!isNaN(inputValue) && inputValue <= maxSeats && inputValue >= 1) {
            setSelectedSeats(inputValue);
        }
    };

    const getMinMaxSeats = (trips) => {
        const seats = trips.map((trip) => trip.availableSeats);
        return {
        minSeats: Math.min(...seats),
        maxSeats: Math.max(...seats),
        };
    };

    const formatDateTime = (stringDate) => {
        const date = new Date(stringDate);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC', // Set the desired time zone here
        };
    
        const formattedDateTime = new Intl.DateTimeFormat('en-GB', options).format(date);
        const [formattedDate, formattedTime] = formattedDateTime.split(', ');
        return [formattedDate, formattedTime];
    };

    const filteredTrips = trips.filter(trip => trip.pickupLoc || trip.altPickupLoc.String || trip.destinationAddress);
    const { minSeats, maxSeats } = getMinMaxSeats(filteredTrips);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const Modal = ({ isOpen, onClose, onConfirm, maxSeats, tripID, pickupLoc, altPickupLoc, destinationAddress }) => {

        const handleConfirm = () => {
          onConfirm(tripID);
          onClose();
        };
      
        return (
            <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="bg-white rounded-lg p-8 z-10 relative">
                <span className="absolute top-0 right-0 mt-3 mr-4 text-2xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-2xl font-bold mb-4">Confirm Enrollment</h2>
                <p>Select the number of seats (max {maxSeats}):</p>
                <p>{pickupLoc} {altPickupLoc===""?"":"/ "+altPickupLoc} to {destinationAddress}</p>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max={maxSeats} // Set the maximum value to the passed maxSeats
                    value={selectedSeats}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md mr-4"
                  />
                  <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded-md">Confirm</button>
                  <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        );
    };

    return (
        <div className="container mx-10 mt-8">
            <div className='flex items-center mb-12'>
                <svg className="h-16 w-16 text-black mr-4" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="7" cy="17" r="2"/>
                    <circle cx="17" cy="17" r="2"/>
                    <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"/>
                </svg>
                <div>
                    <h3 className="text-3xl font-bold mb-1" style={{color: '#0a74fd'}}>Find your ride</h3>
                    <h3 className="text-sm text-gray-500 font-semibold">Where would you like to go</h3>
                </div>
            </div>
            <div className="w-full">
            <input
                type="text"
                placeholder="Search..."
                className="w-1000 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                onKeyUp={handleSearch}
            />
            </div>
            <br></br>
            <div className="space-y-4">
                {Array.isArray(trips) && trips.length > 0 ? (
                    trips
                    .filter(trip => trip.isActive && !trip.isStarted && !trip.isCancelled && trip.availableSeats > 0)
                    .map((trip, index) => (
                        <div key={trip.tripID} className="bg-white p-4 rounded-xl shadow-sm w-full">
                            <div className='flex items-center mb-1'>
                                <svg className="h-7 w-7 text-black mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <p className='text-2xl'>{formatDateTime(trip.startTravelTime)[1]}</p>
                                <div className='ml-auto flex items-end text-green-600'> 
                                    <svg className="h-6 w-6 text-green-600 mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                                    </svg>
                                    <h2 className="text-md font-bold">Available Seats: {trip.availableSeats}</h2>
                                </div>
                            </div>
                            <p className='text-lg font-bold mb-6'>{formatDateTime(trip.startTravelTime)[0]}</p>
                            <div className='mb-6 flex'>
                                <div className="timeline">
                                    <div className="point">
                                        <p className="point-text">{trip.pickupLoc}{trip.altPickupLoc.String !== "" ? "/" + trip.altPickupLoc.String : ""}</p>
                                    </div>
                                    <div className="timeline-line"></div>
                                    <p>to</p>
                                    <div className="timeline-line"></div>
                                    <div className="point">
                                        <p className="point-text">{trip.destinationAddress}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center mb-1'>
                                <div className='flex'>
                                    <svg class="h-6 w-6 text-black mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx="12" cy="7" r="4" />
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    </svg>
                                    <h2 className="text-md font-bold">{trip.firstName + " " + trip.lastName}</h2>
                                </div>
                                {trip.isEnrolled ? (
                                    <button
                                        className="ml-auto items-end bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                        disabled
                                    >
                                        Enrolled
                                    </button>
                                    ) : (
                                    <button
                                        onClick={() => handleOpenModal(index)}
                                        className="ml-auto items-end bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded-full"
                                    >
                                        Enroll for this trip
                                    </button>
                                )}
                            </div>
                            {/* <p>{trip.isActive ? 'Active' : 'Inactive'}</p> */}
                            {/* Other trip details */}
                            <Modal 
                                key={`modal-${index}`} // Ensure each modal has a unique key
                                isOpen={openModalIndex === index}
                                onClose={handleCloseModal} 
                                onConfirm={handleConfirmEnrollment} 
                                maxSeats={trip.availableSeats} 
                                tripID={trip.tripID}
                                pickupLoc={trip.pickupLoc}
                                altPickupLoc={trip.altPickupLoc.String}
                                destinationAddress={trip.destinationAddress}
                             />
                        </div>
                    ))
                ) : (
                    <p>No ride available</p>
                )}
            </div>
        </div>
    );
    };

export default Trips;

import React, { useState, useEffect } from 'react';
import Settings from '../settings/settings';
import getPublishedTrips from '../api/trips/getPublishedTrips';
import updatePublishTrip from '../api/trips/updatePublishedTrips';
import { toast } from 'react-toastify';

const PublishTrips = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [trips, setTrips] = useState([]);
    const settings = new Settings();
    const [openStartModalIndex, setStartOpenModalIndex] = useState(null);
    const [openCancelModalIndex, setCancelOpenModalIndex] = useState(null);
    const [openEndModalIndex, setEndOpenModalIndex] = useState(null);

    useEffect(() => {
        const parsedUserInfo = JSON.parse(settings.user);;
        setUserInfo(parsedUserInfo);
        const fetchData = async (id) => {
        try {
            const fetchTrips = await getPublishedTrips(id);
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

    const handleStartOpenModal = (index) => {
        setStartOpenModalIndex(index);
    };

    const handleCancelOpenModal = (index) => {
        setCancelOpenModalIndex(index);
    };

    const handleEndOpenModal = (index) => {
        setEndOpenModalIndex(index);
    };

    const handleStartCloseModal = () => {
        setStartOpenModalIndex(null);
    };

    const handleCancelCloseModal = () => {
        setCancelOpenModalIndex(null);
    };

    const handleEndCloseModal = () => {
        setEndOpenModalIndex(null);
    };

    const handleStartConfirmEnrollment = async (tripID) => {
        const data = {
            isStarted: true
        }
        const res = await updatePublishTrip(data, tripID);
        if(res.ok){
            toast.success("Trip Started")
            const updatedTrips = await getPublishedTrips(userInfo?.userID);
            setTrips(updatedTrips);
        }
        else {
            toast.error("Something went wrong!");
        }
    };

    const handleCancelConfirmEnrollment = async (tripID) => {
        const data = {
            isCancelled: true
        }
        const res = await updatePublishTrip(data, tripID);
        if(res.ok){
            toast.info("Trip Cancelled")
            const updatedTrips = await getPublishedTrips(userInfo?.userID);
            setTrips(updatedTrips);
        }
        else {
            toast.error("Something went wrong!");
        }
    };

    const handleEndConfirmEnrollment = async (tripID) => {
        const endTime = new Date();
        const isoString = endTime.toISOString().slice(0, -1);
        
        const data = {
            tripEndTime: isoString
        }

        const res = await updatePublishTrip(data, tripID);
        if(res.ok){
            toast.info("Trip Ended")
            const updatedTrips = await getPublishedTrips(userInfo?.userID);
            setTrips(updatedTrips);
        }
        else {
            toast.error("Something went wrong!");
        }
    };


    const StartModal = ({ isOpen, onClose, onConfirm, tripID, pickupLoc, altPickupLoc, destinationAddress }) => {

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
                        <h2 className="text-2xl font-bold mb-4">Start Trip Confirmation</h2>
                        <p>{pickupLoc} {altPickupLoc === "" ? "" : "/ " + altPickupLoc} to {destinationAddress}</p>
                        <div className="flex items-center mt-4">
                            <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded-md mr-4">Start</button>
                            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const CancelModal = ({ isOpen, onClose, onConfirm, tripID, pickupLoc, altPickupLoc, destinationAddress }) => {

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
                        <h2 className="text-2xl font-bold mb-4">Cancel Trip Confirmation</h2>
                        <p>{pickupLoc} {altPickupLoc === "" ? "" : "/ " + altPickupLoc} to {destinationAddress}</p>
                        <div className="flex items-center mt-4">
                            <button onClick={handleConfirm} className="bg-red-500 text-white px-4 py-2 rounded-md mr-4">Cancel</button>
                            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const EndModal = ({ isOpen, onClose, onConfirm, tripID, pickupLoc, altPickupLoc, destinationAddress }) => {

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
                        <h2 className="text-2xl font-bold mb-4">End Trip Confirmation</h2>
                        <p>{pickupLoc} {altPickupLoc === "" ? "" : "/ " + altPickupLoc} to {destinationAddress}</p>
                        <div className="flex items-center mt-4">
                            <button onClick={handleConfirm} className="bg-red-500 text-white px-4 py-2 rounded-md mr-4">End</button>
                            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
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

    const parseDateTime = (formattedDateTimeString) => {
        const [datePart, timePart] = formattedDateTimeString.split(', '); // Splitting date and time
        const [day, month, year] = datePart.split('/').map(Number); // Extracting date components
        const [hours, minutes] = timePart.split(':').map(Number); // Extracting time components
    
        // Creating the Date object manually with the specified format
        return new Date(year, month - 1, day, hours, minutes); // Months are zero-based in JavaScript Dates (January is 0)
    };

    const isThirtyMinutes = (stringDate) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Singapore', // Set the desired time zone here
        };

        const options1 = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC', // Set the desired time zone here
        };


        const date = new Date(stringDate);
        const currentDate = new Date();
        const formattedDateTime = new Intl.DateTimeFormat('en-GB', options1).format(date);
        const formattedDateTime1 = new Intl.DateTimeFormat('en-SG', options).format(currentDate);

        const dateObj = parseDateTime(formattedDateTime);
        const currentDateObj = parseDateTime(formattedDateTime1);

        const differenceInMinutes = (currentDateObj - dateObj) / (1000 * 60);

        if(differenceInMinutes >= -30){
            return true;
        } else if(differenceInMinutes >= 0){
            return true;
        } else{
            return false;
        }
    }

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
                    <h3 className="text-3xl font-bold mb-1" style={{color: '#0a74fd'}}>Published Trips</h3>
                    <h3 className="text-sm text-gray-500 font-semibold">Find all of your listings here</h3>
                </div>
            </div>
            <div className="space-y-4">
                {Array.isArray(trips) && trips.length > 0 ? (
                    trips
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
                            <div className='flex items-center mb-1 mt-2'>
                                {trip.tripEndTime.String === "" ? ( 
                                    <>
                                        {trip.isCancelled ? ( 
                                            <div className="w-full">
                                                <button
                                                    className="w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                                >
                                                    Trip Cancelled
                                                </button>
                                            </div>
                                            ) : (
                                                <>
                                                     {trip.isStarted ? ( 
                                                        <button
                                                            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                                            disabled
                                                        >
                                                            Trip Ongoing
                                                        </button>
                                                        ) : (
                                                            <>
                                                            {isThirtyMinutes(trip.startTravelTime) ? ( //calculation for 30min
                                                                <button
                                                                    onClick={() => handleStartOpenModal(index)}
                                                                    className="bg-transparent hover:bg-green-600 text-green-600 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded-full"
                                                                    >
                                                                    Start this trip
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                                                    disabled
                                                                >
                                                                    Too soon to start
                                                                </button>
                                                            )}
                                                        </>  
                                                    )}
                                                    {trip.isStarted ? ( 
                                                        <button
                                                            className="ml-auto items-end bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                                            disabled
                                                        >
                                                            Cancel this trip
                                                        </button>
                                                        ) : (
                                                            <>
                                                                {isThirtyMinutes(trip.startTravelTime) ? ( //calculation for 30min
                                                                    <button
                                                                        onClick={() => handleCancelOpenModal(index)}
                                                                        className="ml-auto items-end bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded-full"
                                                                        >
                                                                        Cancel this trip
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="ml-auto items-end bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                                                        disabled
                                                                    >
                                                                        Too soon to cancel
                                                                    </button>
                                                                )}
                                                            </>                                     
                                                    )}
                                                    {!trip.isStarted && trip.tripEndTime.String === "" ? ( 
                                                        <button
                                                            className="ml-auto items-end bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                                        >
                                                            End this trip
                                                        </button>
                                                        ) : (
                                                        <button
                                                            onClick={() => handleEndOpenModal(index)}
                                                            className="ml-auto items-end bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded-full"
                                                        >
                                                            End this trip
                                                        </button>
                                                    )}
                                                </>  
                                        )}
                                       
                                    </>
                                    ) : (
                                    <div className="w-full">
                                        <button
                                            className="w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                        >
                                           Trip Ended
                                        </button>
                                    </div>
                                )}
                                
                            </div>
                            {/* <p>{trip.isActive ? 'Active' : 'Inactive'}</p> */}
                            {/* Other trip details */}
                            <StartModal 
                                key={`start-modal-${index}`} // Ensure each modal has a unique key
                                isOpen={openStartModalIndex === index}
                                onClose={handleStartCloseModal} 
                                onConfirm={handleStartConfirmEnrollment} 
                                maxSeats={trip.availableSeats} 
                                tripID={trip.tripID}
                                pickupLoc={trip.pickupLoc}
                                altPickupLoc={trip.altPickupLoc.String}
                                destinationAddress={trip.destinationAddress}
                             />
                             <CancelModal 
                                key={`cancel-modal-${index}`} // Ensure each modal has a unique key
                                isOpen={openCancelModalIndex === index}
                                onClose={handleCancelCloseModal} 
                                onConfirm={handleCancelConfirmEnrollment} 
                                maxSeats={trip.availableSeats} 
                                tripID={trip.tripID}
                                pickupLoc={trip.pickupLoc}
                                altPickupLoc={trip.altPickupLoc.String}
                                destinationAddress={trip.destinationAddress}
                             />
                             <EndModal 
                                key={`end-modal-${index}`} // Ensure each modal has a unique key
                                isOpen={openEndModalIndex === index}
                                onClose={handleEndCloseModal} 
                                onConfirm={handleEndConfirmEnrollment} 
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
export default PublishTrips;
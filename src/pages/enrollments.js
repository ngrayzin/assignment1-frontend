import React, { useState, useEffect } from 'react';
import Settings from '../settings/settings';
import getEnrolledTrips from '../api/trips/getEnrollment';

const MyEnrollmentsPage = ({}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [trips, setTrips] = useState([]);
    const settings = new Settings();

    useEffect(() => {
        const parsedUserInfo = JSON.parse(settings.user);;
        setUserInfo(parsedUserInfo);
        const fetchData = async (id) => {
        try {
            const fetchTrips = await getEnrolledTrips(id);
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

    return (
        <div className="container mx-10 mt-8">
            <div className='flex items-center mb-12'>
            <svg class="h-16 w-16 text-black mr-3"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="11" y1="15" x2="12" y2="15" />  <line x1="12" y1="15" x2="12" y2="18" /></svg>
                <div>
                    <h3 className="text-3xl font-bold mb-1" style={{color: '#0a74fd'}}>My Enrollments</h3>
                    <h3 className="text-sm text-gray-500 font-semibold">Find all your enrollments here</h3>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-bold mb-1 text-green-700">On going Enrollments</h3>
                {Array.isArray(trips) && trips.length > 0 ? (
                    <>
                        {trips
                        .filter((trip) => trip.isStarted && trip.tripEndTime.String === "")
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
                                    <h2 className="text-md font-bold">Number of Passengers: {trip.numberOfSeats}</h2>
                                </div>
                            </div>
                            <p className='text-lg font-bold mb-6'>{formatDateTime(trip.startTravelTime)[0]}</p>
                            <div className='mb-6 flex'>
                                <div className="timeline">
                                    <div className="point">
                                        <p className="point-text">{trip.pickupLocation}{trip.altPickupLocation.String !== "" ? "/" + trip.altPickupLocation.String : ""}</p>
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
                                <button
                                    className="ml-auto items-end bg-green-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                    disabled
                                >
                                    DRIVING TO DESTINATION...
                                </button>
                            </div>
                            {/* <p>{trip.isActive ? 'Active' : 'Inactive'}</p> */}
                        </div>
                        ))}
                    </>
                ) : (
                    <div>
                        <h1>fww</h1>
                        <p>No ride available</p>
                    </div>
                )}
                <h3 className="text-xl font-bold mb-1 text-orange-500" >My Enrollments</h3>
                {Array.isArray(trips) && trips.length > 0 ? (
                    trips
                    .filter((trip) => !trip.isStarted && !trip.isCancelled)
                    .reverse()
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
                                    <h2 className="text-md font-bold">Number of Passengers: {trip.numberOfSeats}</h2>
                                </div>
                            </div>
                            <p className='text-lg font-bold mb-6'>{formatDateTime(trip.startTravelTime)[0]}</p>
                            <div className='mb-6 flex'>
                                <div className="timeline">
                                    <div className="point">
                                        <p className="point-text">{trip.pickupLocation}{trip.altPickupLocation.String !== "" ? "/" + trip.altPickupLocation.String : ""}</p>
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
                                <button
                                    className="ml-auto items-end bg-orange-500 text-white font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                    disabled
                                >
                                    Waiting for trip to start...
                                </button>
                            </div>
                            {/* <p>{trip.isActive ? 'Active' : 'Inactive'}</p> */}
                        </div>
                    ))
                ) : (
                    <p>No ride available</p>
                )}
                 <h3 className="text-xl font-bold mb-1" style={{color: 'red'}}>Cancelled Enrollment</h3>
                {Array.isArray(trips) && trips.length > 0 ? (
                    trips
                    .filter((trip) => trip.isCancelled)
                    .reverse()
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
                                    <h2 className="text-md font-bold">Number of Passengers: {trip.numberOfSeats}</h2>
                                </div>
                            </div>
                            <p className='text-lg font-bold mb-6'>{formatDateTime(trip.startTravelTime)[0]}</p>
                            <div className='mb-6 flex'>
                                <div className="timeline">
                                    <div className="point">
                                        <p className="point-text">{trip.pickupLocation}{trip.altPickupLocation.String !== "" ? "/" + trip.altPickupLocation.String : ""}</p>
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
                                <button
                                    className="ml-auto items-end bg-red-600 text-white font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                    disabled
                                >
                                    Cancelled
                                </button>
                            </div>
                            {/* <p>{trip.isActive ? 'Active' : 'Inactive'}</p> */}
                        </div>
                    ))
                ) : (
                    <p>No ride available</p>
                )}
                 <h3 className="text-xl font-bold mb-1" style={{color: '#0a74fd'}}>Completed Enrollments</h3>
                {Array.isArray(trips) && trips.length > 0 ? (
                    trips
                    .filter((trip) => trip.tripEndTime.String !== "")
                    .reverse()
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
                                    <h2 className="text-md font-bold">Number of Passengers: {trip.numberOfSeats}</h2>
                                </div>
                            </div>
                            <p className='text-lg font-bold mb-6'>{formatDateTime(trip.startTravelTime)[0]}</p>
                            <div className='mb-6 flex'>
                                <div className="timeline">
                                    <div className="point">
                                        <p className="point-text">{trip.pickupLocation}{trip.altPickupLocation.String !== "" ? "/" + trip.altPickupLocation.String : ""}</p>
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
                                <button
                                    className="ml-auto items-end bg-red-600 text-white font-semibold py-2 px-4 border border-gray-300 rounded-full cursor-not-allowed"
                                    disabled
                                >
                                    Trip Ended
                                </button>
                            </div>
                            {/* <p>{trip.isActive ? 'Active' : 'Inactive'}</p> */}
                        </div>
                    ))
                ) : (
                    <p>No ride available</p>
                )}
            </div>
        </div>
      );

};
export default MyEnrollmentsPage
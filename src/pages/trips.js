import React, { useState, useEffect } from 'react';
import getTrips from '../api/trips/getTrips';
import Settings from '../settings/settings';

const Trips = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [trips, setTrips] = useState([]);
    const settings = new Settings();

  // Assume you fetch the list of trips from an API or a data source
  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedUserInfo = JSON.parse(settings.user);
        setUserInfo(parsedUserInfo);
  
        const fetchTrips = await getTrips();
        if (fetchTrips) {
            console.log(fetchTrips);
          setTrips(fetchTrips);
        }
      } catch (error) {
        // Handle error if any
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // Call the async function to fetch data
  }, []);  

  const getUniqueLocations = (trips, locationType) => {
    const locations = trips.reduce((acc, trip) => {
      const location = trip[locationType];
      if (typeof location === 'string' && location.trim() !== '' && !acc.includes(location.trim())) {
        acc.push(location.trim());
      }
      return acc;
    }, []);
    return locations;
  };
  
  const getMinMaxSeats = (trips) => {
    const seats = trips.map((trip) => trip.availableSeats);
    return {
      minSeats: Math.min(...seats),
      maxSeats: Math.max(...seats),
    };
  };

  const LocationDropdown = ({ locations }) => {
    return (
      <select className="bg-gray-200 rounded-md px-3 py-1">
        {locations.map((location, index) => (
          <option key={index} value={location}>{location}</option>
        ))}
      </select>
    );
  };
  const formatDateTime = (stringDate) => {
    const timeOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      const date = new Date(stringDate);
      const formattedDateTime = date.toLocaleDateString('en-GB', timeOptions);
      const [formattedDate, formattedTime] = formattedDateTime.split(', ');
      return [formattedDate, formattedTime];
  }
    const filteredTrips = trips.filter(trip => trip.pickupLoc || trip.altPickupLoc.String || trip.destinationAddress);
    const uniquePickupLocations = getUniqueLocations(filteredTrips, 'pickupLoc');
    const uniqueAltPickupLocations = getUniqueLocations(filteredTrips, 'altPickupLoc');
    const uniqueDestinationLocations = getUniqueLocations(filteredTrips, 'destinationAddress');
    const { minSeats, maxSeats } = getMinMaxSeats(filteredTrips);

  return (
    <div className="container mt-8">
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
        <div className="w-half">
        <input
            type="text"
            placeholder="Search..."
            className="w-1000 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        </div>
        <br></br>
        <div className="flex space-x-2 mb-4">
            {/* Other filters */}
            <LocationDropdown locations={uniquePickupLocations} />
            <LocationDropdown locations={uniqueAltPickupLocations} />
            <LocationDropdown locations={uniqueDestinationLocations} />
        </div>
        <div className="space-y-4">
            {Array.isArray(trips) && trips.length > 0 ? (
                trips.map(trip => (
                    <div key={trip.tripID} className="bg-white p-4 rounded-xl shadow-sm w-full">
                        <div className='flex items-center mb-6'>
                            <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="12" cy="7" r="4" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                            <h2 className="text-xl font-bold mb-2">User {trip.ownerUserID}</h2>
                        </div>
                        <div className='mb-6'>
                            <div className="timeline">
                            <p>{trip.pickupLoc}{trip.altPickupLoc.String !== "" ? "/" + trip.altPickupLoc.String : ""} </p>
                            <div className="timeline-point start-point"></div>
                            <div className="timeline-line"></div>
                            <p>{trip.destinationAddress}</p>
                            <div className="timeline-point end-point"></div>
                            </div>
                        </div>
                        <p className='text-lg font-bold mb-2'>{formatDateTime(trip.startTravelTime)[0]}</p>
                        <p className='text-lg font-bold mb-2'>{formatDateTime(trip.startTravelTime)[1]}</p>
                        <p>{trip.isActive ? 'Active' : 'Inactive'}</p>
                        {/* Other trip details */}
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

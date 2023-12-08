import React, { useState, useEffect } from 'react';
import Settings from '../settings/settings';
import publishTrip from '../api/trips/publishTrips';
import { toast } from 'react-toastify';

const PublishTripPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [pickupLoc, setPickupLoc] = useState('');
    const [altPickupLoc, setAltPickupLoc] = useState('');
    const [destinationOfArrival, setDestinationOfArrival] = useState('');
    const [startTravelTime, setStartTravelTime] = useState('');
    const [availableSeats, setAvailableSeats] = useState(1);
    const settings = new Settings();

    useEffect(() => {
        const parsedUserInfo = JSON.parse(settings.user);
        setUserInfo(parsedUserInfo);
      }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to the server)
        const data = {
            ownerUserID: userInfo?.userID,
            pickupLoc: pickupLoc,
            altPickupLoc: altPickupLoc,
            destinationAddress: destinationOfArrival,
            startTravelTime: startTravelTime,
            availableSeats: availableSeats,
        }

        const res = await publishTrip(data);
        if(res.ok){
            toast.success("Trip Published!");
            setPickupLoc('');
            setAltPickupLoc('');
            setDestinationOfArrival('');
            setStartTravelTime('');
            setAvailableSeats(1);
        } else{
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Publish Trip</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
                Pickup Location:
            </label>
            <input
                id="pickupLocation"
                type="text"
                value={pickupLoc}
                onChange={(e) => setPickupLoc(e.target.value)}
                className="w-full border-gray-300 rounded-md mt-1 p-2 focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="altPickupLocation" className="block text-sm font-medium text-gray-700">
                Alt Pickup Location (optional):
            </label>
            <input
                id="altPickupLocation"
                type="text"
                value={altPickupLoc}
                onChange={(e) => setAltPickupLoc(e.target.value)}
                className="w-full border-gray-300 rounded-md mt-1 p-2 focus:outline-none focus:border-blue-500"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="destinationOfArrival" className="block text-sm font-medium text-gray-700">
                Destination of Arrival:
            </label>
            <input
                id="destinationOfArrival"
                type="text"
                value={destinationOfArrival}
                onChange={(e) => setDestinationOfArrival(e.target.value)}
                className="w-full border-gray-300 rounded-md mt-1 p-2 focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="startTravelTime" className="block text-sm font-medium text-gray-700">
                Start Travel Time:
            </label>
            <input
                id="startTravelTime"
                type="datetime-local"
                value={startTravelTime}
                onChange={(e) => setStartTravelTime(e.target.value)}
                className="w-full border-gray-300 rounded-md mt-1 p-2 focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">
                Available Seats:
            </label>
            <input
                id="availableSeats"
                type="number"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(parseInt(e.target.value))}
                className="w-full border-gray-300 rounded-md mt-1 p-2 focus:outline-none focus:border-blue-500"
                min="1"
                required
            />
            </div>
            <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
            Publish
            </button>
        </form>
        </div>
    );
};

export default PublishTripPage;

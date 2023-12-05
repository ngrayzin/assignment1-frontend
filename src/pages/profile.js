import React, { useState, useEffect } from 'react';
import Settings from '../settings/settings';


const Profile = ( ) => {
    const settings = new Settings();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const parsedUserInfo = JSON.parse(settings.user);
        console.log(parsedUserInfo);
        setUserInfo(parsedUserInfo);
    }, []);
    
  const initialUserData = {
    accountCreationDate: "2023-12-02T06:38:58Z",
    carPlateNumber: 'ABC123',
    driverLicenseNumber: 'DL1234',
    email: 'test@gmail.com',
    firstName: 'Alice',
    isCarOwner: true,
    lastName: 'Smith',
    lastUpdated: '2023-12-02T06:38:58Z',
    number: 123456789,
    password: '123456',
    userID: 1,
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Function to update the user's information
  const handleUpdate = () => {
    // Implement logic to update user data (e.g., send a request to update the user's info)
    // Example: updateUserData(userData);
    console.log('Updated user data:', userData);
    setIsEditing(false);
  };

  // Function to delete the account
  const handleDelete = () => {
    // Implement logic to delete the account
    // Example: deleteUserAccount(userData.userID);
    console.log('Account deleted');
  };

  const isMoreThanAYear = () => {
    const today = new Date();
    const creationDate = new Date(userData.accountCreationDate);
    const diff = today - creationDate;
    const diffInYears = diff / (1000 * 3600 * 24 * 365); // Convert diff to years

    return diffInYears >= 1;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-32">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userInfo?.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border rounded-md px-2 py-1 w-64"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userInfo?.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border rounded-md px-2 py-1 w-64"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">email:</label>
          <input
            type="text"
            name="email"
            value={userInfo?.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border rounded-md px-2 py-1 w-64"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">password:</label>
          <input
            type={isEditing ? "text" : "password"}
            name="password"
            value={userInfo?.password}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border rounded-md px-2 py-1 w-64"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">number:</label>
          <input
            type="text"
            name="number"
            value={userInfo?.number}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border rounded-md px-2 py-1 w-64"
          />
        </div>
        {/* Add other fields similarly */}
        {userInfo?.isCarOwner ? (
          <>
            <div className="flex items-center">
              <label className="w-32">Car Plate Number:</label>
              <input
                type="text"
                name="carPlateNumber"
                value={userInfo?.carPlateNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border rounded-md px-2 py-1 w-64"
              />
            </div>
            <div className="flex items-center">
              <label className="w-32">Driver License Number:</label>
              <input
                type="text"
                name="driverLicenseNumber"
                value={userInfo?.driverLicenseNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border rounded-md px-2 py-1 w-64"
              />
            </div>
            {/* Add other car owner fields */}
          </>
        ) : (
          <>
            {/* Show fields for non-car owners */}
            <div className="flex items-center">
              <label className="w-32">Do you have a car?</label>
              <input
                type="checkbox"
                name="hasCar"
                checked={userInfo?.isCarOwner}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mx-2"
              />
            </div>
            {/* Add fields for license and plate number for non-car owners */}
          </>
        )}
        <div className="flex items-center">
          <label className="w-32">Account Creation Date:</label>
          <input
            type="text"
            name="accountCreationDate"
            value={userInfo?.accountCreationDate}
            onChange={handleInputChange}
            disabled={true}
            className="border rounded-md px-2 py-1 w-64"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">User ID:</label>
          <input
            type="text"
            name="userID"
            value={userInfo?.userID}
            onChange={handleInputChange}
            disabled={true}
            className="border rounded-md px-2 py-1 w-64"
          />
        </div>
        {isEditing ? (
          <div className="flex">
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
            {isMoreThanAYear() ? (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Delete Account
              </button>
            ) : (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                disabled
              >
                Delete Account
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

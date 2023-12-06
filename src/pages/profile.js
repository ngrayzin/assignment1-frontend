import React, { useState, useEffect } from 'react';
import Settings from '../settings/settings';
import isEqual from 'lodash/isEqual';
import updateUserProfile from '../api/users/updateUserProfile';
import { toast } from 'react-toastify';


const Profile = ({ updateSession }) => {
    const settings = new Settings();
    const [userInfo, setUserInfo] = useState(null);
    const [normalProfile, setNormalProfile] = useState(null);
    const [initalNormalProfile, setInitalNormalProfile] = useState(null);
    const [carProfile, setCarProfile] = useState(null);
    const [initalCarProfile, setInitalCarProfile] = useState(null);

    useEffect(() => {
        const parsedUserInfo = JSON.parse(settings.user);;
        setUserInfo(parsedUserInfo);
        setNormalProfile({
          firstName: parsedUserInfo.firstName,
          lastName: parsedUserInfo.lastName,
          email: parsedUserInfo.email,
          password: parsedUserInfo.password,
          mobileNumber: parsedUserInfo.number,
        });
        setInitalNormalProfile({
          firstName: parsedUserInfo.firstName,
          lastName: parsedUserInfo.lastName,
          email: parsedUserInfo.email,
          password: parsedUserInfo.password,
          mobileNumber: parsedUserInfo.number,
        });
        setCarProfile({isCarOwner: parsedUserInfo.isCarOwner, driverLicenseNumber: parsedUserInfo.driverLicenseNumber, carPlateNumber: parsedUserInfo.carPlateNumber});
        setInitalCarProfile({isCarOwner: parsedUserInfo.isCarOwner, driverLicenseNumber: parsedUserInfo.driverLicenseNumber, carPlateNumber: parsedUserInfo.carPlateNumber});
    }, []);
    
  const [isEditing, setIsEditing] = useState(false);
  const [isCarEditing, setIsCarEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber') {
      const phoneNumber = value.replace(/\D/g, ''); 
      if (phoneNumber.length <= 8) {
        setNormalProfile({ ...normalProfile, [name]: parseInt(phoneNumber, 10) || '' });
      }
    } else {
      setNormalProfile((prevNormalProfile) => ({ ...prevNormalProfile, [name]: value }));
    }
  };

  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setCarProfile((prevCarProfile) => ({ ...prevCarProfile, [name]: value }));
  }

  const handleUpdate = async () => {
    const isAnyFieldEmpty = Object.values(normalProfile).some(value => value === '' || value === null);

    if (isAnyFieldEmpty) {
      toast.error("Please fill out all required fields")
      return;
    }
  
    if (isEqual(normalProfile, initalNormalProfile)) {
      setIsEditing(false);
      return;
    }
  
    const res = await updateUserProfile(normalProfile, userInfo?.userID);

    if (res) {
      // Update userInfo state
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        firstName: normalProfile.firstName,
        lastName: normalProfile.lastName,
        email: normalProfile.email,
        password: normalProfile.password,
        number: normalProfile.mobileNumber,
      }));
      console.log(userInfo);
      toast.success("Updated profile!");
    }
    setIsEditing(false);
  };

  const handleCarUpdate = async () => {
    if (!carProfile?.isCarOwner) {
      const hasEmptyField = Object.values(carProfile).some(value => value === '' || value === null);

      if (hasEmptyField) {
        toast.error("Please fill out all required fields");
        return;
      }

      const res = await updateUserProfile({ ...carProfile, isCarOwner: true }, userInfo?.userID);

      if (res) {
        setUserInfo(prevInfo => ({
          ...prevInfo,
          isCarOwner: true,
          driverLicenseNumber: carProfile.driverLicenseNumber,
          carPlateNumber: carProfile.carPlateNumber,
        }));
        setCarProfile(prevInfo => ({
          ...prevInfo,
          isCarOwner: true
        }))
        setIsCarEditing(false); // Exit editing mode after verification
        updateSession(JSON.stringify(userInfo));
        toast.success("Verified car profile!");
      }
    } else {
      const hasEmptyField = Object.values(carProfile).some(value => value === '' || value === null);

      if (hasEmptyField) {
        toast.error("Please fill out all required fields");
        return;
      }

      const res = await updateUserProfile(carProfile, userInfo?.userID);

      if (res) {
        setUserInfo(prevInfo => ({
          ...prevInfo,
          isCarOwner: true,
          driverLicenseNumber: carProfile.driverLicenseNumber,
          carPlateNumber: carProfile.carPlateNumber,
        }));
        toast.success("Updated car profile!");
        setIsCarEditing(false); // Exit editing mode after update
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      updateSession(JSON.stringify(userInfo));
    }
  }, [userInfo]);  

  const handleCancel = () =>{
    setNormalProfile(initalNormalProfile);
    setIsEditing(false);
  }

  const handleCarCancel = () => {
    setCarProfile({isCarOwner: userInfo.isCarOwner, carPlateNumber: userInfo.carPlateNumber, driverLicenseNumber: userInfo.driverLicenseNumber});
    setIsCarEditing(false);
  }
  const handleDelete = () => {
    console.log('Account deleted');
  };

  const isMoreThanAYear = () => {
    const today = new Date();
    const creationDate = new Date(normalProfile?.accountCreationDate);
    const diff = today - creationDate;
    const diffInYears = diff / (1000 * 3600 * 24 * 365); // Convert diff to years

    return diffInYears >= 1;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-gray-200 p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-32">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={normalProfile?.firstName}
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
              value={normalProfile?.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="border rounded-md px-2 py-1 w-64"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">email:</label>
            <input
              type="email"
              name="email"
              value={normalProfile?.email}
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
              value={normalProfile?.password}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="border rounded-md px-2 py-1 w-64"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">number:</label>
            <input
              type="text"
              name="mobileNumber"
              value={normalProfile?.mobileNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="border rounded-md px-2 py-1 w-64"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">Account Creation Date:</label>
            <input
              type="text"
              name="accountCreationDate"
              value={userInfo?.accountCreationDate}
              disabled={true}
              readOnly
              className="border rounded-md px-2 py-1 w-64"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">User ID:</label>
            <input
              type="text"
              name="userID"
              value={userInfo?.userID}
              disabled={true}
              readOnly
              className="border rounded-md px-2 py-1 w-64"
            />
          </div>
        </div>
        {isEditing ? (
          <div className="flex">
            <button type="submit" onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
              Save
            </button>
            <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
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
      <div className="bg-gray-200 p-8 rounded shadow-md mt-12">
        {carProfile?.isCarOwner ? (
        <>
          <h2 className="text-3xl font-bold mb-4">Car Info</h2>
          <div className="flex items-center">
            <label className="w-32">Car Plate Number:</label>
            <input
              type="text"
              name="carPlateNumber"
              value={carProfile?.carPlateNumber}
              onChange={handleCarInputChange}
              disabled={!isCarEditing}
              required
              className="border rounded-md px-2 py-1 w-64"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">Driver License Number:</label>
            <input
              type="text"
              name="driverLicenseNumber"
              value={carProfile?.driverLicenseNumber}
              onChange={handleCarInputChange}
              disabled={!isCarEditing}
              required
              className="border rounded-md px-2 py-1 w-64"
            />
          </div>
          {isCarEditing ? (
          <div className="flex">
            <button type="submit" onClick={handleCarUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
              Save
            </button>
            <button onClick={handleCarCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsCarEditing(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
          </div>
        )}
        </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Have a car?</h2>
              <p className="text-3l mb-4">Verify it to become a car owner!</p>
              <div className="flex items-center">
                <label className="w-35 pr-3">Car Plate Number:</label>
                <input
                  type="text"
                  name="carPlateNumber"
                  onChange={handleCarInputChange}
                  required
                  className="border rounded-md px-2 py-1 w-64"
                />
              </div>
              <div className="flex items-center">
                <label className="w-35 pr-3">Driver License Number:</label>
                <input
                  type="text"
                  name="driverLicenseNumber"
                  onChange={handleCarInputChange}
                  required
                  className="border rounded-md px-2 py-1 w-64"
                />
              </div>
              <button onClick={handleCarUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                Verify
            </button>
            </>
          )}
      </div>
    </div>
  );
};

export default Profile;
import React, { useEffect, useState } from 'react';
import Settings from '../settings/settings';

const Home = ( ) => {
  const settings = new Settings();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const parsedUserInfo = JSON.parse(settings.user);
    console.log(parsedUserInfo);
    setUserInfo(parsedUserInfo);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className='flex h-screen'> 
      {userInfo && (
        <>
          <div className="container mx-12 mt-8">
            <h1 className="text-3xl text-black font-bold mb-4">Welcome {userInfo.firstName}</h1>
            <p className="text-lg text-black mb-4">This is your home page content.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

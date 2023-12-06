import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import Settings from '../settings/settings';

const AppSidebar = ({ logout, isCarOwner }) => {
  const settings = new Settings();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const parsedUserInfo = JSON.parse(settings.user);
    setUserInfo(parsedUserInfo);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('home');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <Sidebar 
      collapsed={!isOpen}
      width='185px'
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: '#2749f1',
          color: '#ebedfb',
        },
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                backgroundColor: active ? '#2142db' : undefined,
                '&:hover': {
                  backgroundColor: '#2142db',
                },
              };
          },
        }}
      >
      {/* Logo and App Name */}
      {isOpen ? (
         <MenuItem 
          icon={<svg class="h-12 w-12 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="7" cy="17" r="2" />  <circle cx="17" cy="17" r="2" />  <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /></svg>} 
          onClick={toggleSidebar}
        >
         <h3>
          <b>Ainori</b>
         </h3>
       </MenuItem>
      ) : (
        <MenuItem 
          icon={<svg class="h-6 w-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 16 16 12 12 8" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>}
          onClick={() => handleMenuItemClick()}
        >
        </MenuItem>
      )}

        <MenuItem
          icon={<svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>}
          onClick={() => setSelected('home')} 
          component={<Link to="/home" />}
          active={selected === 'home'}
        >
          Home
        </MenuItem>

        {isCarOwner ? (
          <>
            <MenuItem 
              icon={<svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />  <polyline points="7 9 12 4 17 9" />  <line x1="12" y1="4" x2="12" y2="16" /></svg>}
              onClick={() => setSelected('post-trips')} 
              component={<Link to="/post-trips" />}
              active={selected === 'post-trips'}
            >
              Post Trips
            </MenuItem>
            <MenuItem 
              icon={<svg class="h-6 w-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
              onClick={() => setSelected('current-trips')} 
              component={<Link to="/current-trips" />}
              active={selected === 'current-trips'}
            >
              Current Trips
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem 
              icon={<svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>}
              onClick={() => setSelected('trips')} 
              component={<Link to="/trips" />}
              active={selected === 'trips'}
            >
              Trips
            </MenuItem>
            <MenuItem 
              icon={<svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="11" y1="15" x2="12" y2="15" />  <line x1="12" y1="15" x2="12" y2="18" /></svg>}
              onClick={() => setSelected('enrollment')} 
              component={<Link to="/enrollments" />}
              active={selected === 'enrollment'}
            >
              Enrolments
            </MenuItem>
          </>
        )}
        
        <MenuItem
          icon={<svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>}
          onClick={() => setSelected('profile')} 
          component={<Link to="/profile" />}
          active={selected === 'profile'}
        >
          Profile
        </MenuItem>
        <MenuItem
          icon={<svg class="h-6 w-6 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
        </svg>
        }
          onClick={()=>{logout()}}
          component={<Link to="/" />}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default AppSidebar;

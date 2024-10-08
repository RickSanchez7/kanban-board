import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaBars, FaColumns, FaCog } from 'react-icons/fa';
import './Sidebar.scss';

const Dashboard = () => import('./../../pages/Board');
const Settings = () => import('./../../pages/Settings');

export const Sidebar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const handleClick = () => {
    setIsHidden(prev => !prev);
  };
  return (
    <div className={`sidebar ${isHidden ? 'isHidden' : ''}`}>
      <div>
        <h1>
          {IconTitle()}
          {!isHidden && <span>kanban</span>}
        </h1>
        <h2 className='sidebar-title'>All Boards</h2>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'active' : ''} sidebar-link`
          }
          to='dashboard'
          onMouseEnter={Dashboard}
          onFocus={Dashboard}
        >
          <FaColumns /> {!isHidden && 'Dashboard'}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'active' : ''} sidebar-link`
          }
          to='settings'
          onMouseEnter={Settings}
          onFocus={Settings}
        >
          <FaCog /> {!isHidden && 'Settings'}
        </NavLink>
      </div>
      <button className='sidebar-button' onClick={handleClick}>
        {isHidden ? (
          <FaEye />
        ) : (
          <>
            <FaEyeSlash /> <span>Hide SideBar</span>
          </>
        )}
      </button>
    </div>
  );
};

function IconTitle() {
  return (
    <>
      <svg width='0' height='0'>
        <linearGradient
          id='icon-gradient-title'
          x1='100%'
          y1='100%'
          x2='0%'
          y2='0%'
        >
          <stop stopColor='#645fc6' offset='20%' />
          <stop stopColor='#301592' offset='80%' />
        </linearGradient>
      </svg>
      <FaBars style={{ fill: 'url(#icon-gradient-title)' }} />
    </>
  );
}

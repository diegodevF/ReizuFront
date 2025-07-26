import React, { useState } from 'react';
import './navBarConvo.css';
import useTheme from '../hooks/useTheme';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const navItems = [
  { name: 'INFORMACIÓN', id: '' },
  { name: 'REGLAS', id: 'reglas' },
  { name: 'FORMULARIO', id: 'formulario' },
  { name: 'TOP 10', id: 'top10' },
  { name: 'GANADORES', id: 'ganadores' },
];

const NavBarConvo = () => {

  const routeName = useLocation().pathname

  const { isDark } = useTheme();



  return (

    <>


     <div >
      <div
      className='mx-auto'
      style={{
        minHeight:"492px",
        maxWidth:"1226px",
        backgroundColor: isDark ? '#1b1a1aff' : '#c6c7c7',
      }}
      ></div>
    <nav className="navBarConvo">
      <ul>
        {navItems.map(({ name, id }) => (
          <li key={id}>
            <Link
              to={`/convocatoria/${id}`}
              className={routeName === `/convocatoria/${id}` ? 'active' : ''}
              style={{ color: isDark ? '#fff' : '#000' }}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    </div>
    </>
  );
};

export default NavBarConvo;

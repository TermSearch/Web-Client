import React from 'react';
import logoImage from '../assets/images/TERM-SEARCH-LOGO.png';

function Logo() {
  return (
    <span>
      <a href="/">
        <img src={logoImage} className="logo-image" alt="Logo Term Search"/>
      </a>
    </span>
  );
}

export default Logo;

import React from 'react';
import logoImage from '../assets/images/logo.png';

function Logo() {
  return (
    <span className="input-group-btn logo-container">
      <a href="/">
        <img src={logoImage} className="logo-image" alt="Logo Term Search"/>
      </a>
    </span>
  );
}

export default Logo;

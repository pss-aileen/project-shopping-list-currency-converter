import React from 'react';
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="site-title">
        <span>
          Currency Converter
        </span>
        <span className='site-title__small'>
          with Shopping List
        </span>
      </h1>
      <p className='site-lead'>This web app help to manage your travel money.</p>
    </header>
  )
}

export default Header
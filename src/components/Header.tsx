// src/components/Header.tsx
import React from 'react'
import './Header.css' // We'll create a small CSS file for the header styling

const Header: React.FC = () => {
  return (
    <nav className="main-header">
      <div className="logo-area">
        {/* If your SVG is in public/stackline-logo.svg, you can do: */}
        <img src="`${process.env.PUBLIC_URL}/stackline_logo (1).svg`" alt="Stackline Logo" className="header-logo" />
        {/* Or if it's a React component import: <StacklineLogo /> */}
      </div>
      {/* Optionally, you can add more header items or nav links here */}
    </nav>
  )
}

export default Header

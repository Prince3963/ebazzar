import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <img src="https://via.placeholder.com/40" alt="User" className="user-img" />
            <span className="username">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

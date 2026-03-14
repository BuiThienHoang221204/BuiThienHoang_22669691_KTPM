import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header>
            <h1>CMS</h1>
            {user && (
                <div>
                    <span>Welcome, {user.username}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </header>
    );
};

export default Header;

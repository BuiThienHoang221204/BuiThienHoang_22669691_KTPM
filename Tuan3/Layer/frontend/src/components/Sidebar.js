import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <aside>
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    {user && user.role === 'admin' && (
                        <>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/menus">Menus</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

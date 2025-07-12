import React from 'react';
import { Link } from 'react-router-dom';


export default function NavBar({ role, navigations, title ,isLoggedIn}) {
    return (
        <nav className="w-full bg-gray-800 text-white shadow-md sticky top-0 z-50 rounded-b-sm">
            <div className=" mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-wide">{title || role}</h1>
                <ul className="flex flex-1 justify-end space-x-6">
                    {navigations.map((nav, idx) => (
                        <li key={idx}>
                            <Link 
                                to={nav.route} 
                                className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors duration-200"
                            >
                                {nav.icon && <span className="text-xl">{nav.icon}</span>}
                                <span className="text-base">{nav.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

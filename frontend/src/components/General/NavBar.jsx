import React, { use } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function NavBar({ role, navigations, title , showuserimg}) {
    const nav = useNavigate();
    return (
        <nav className="w-full  bg-gray-800 text-white shadow-md sticky top-0 z-50 space-x-3 rounded-b-sm">
            <div className="mx-auto px-4 py-3 flex items-center justify-between space-x-4 flex-col md:flex-row">
                <h1 className="text-2xl font-semibold tracking-wide ">{title || role}</h1>
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
                <div className='flex items-center space-x-2'>
                    {showuserimg && (
                        <img
                            src={typeof showuserimg === 'string' ? showuserimg : '/default-user.png'}
                            alt="User"
                            className="w-10 h-10  rounded-full object-cover border-2 border-cyan-400"
                            onClick={() => {nav(`${role==='admin'? "/admin": ""}/profile`)}}
                        />
                    )}
                </div>
            </div>
        </nav>
    );
}

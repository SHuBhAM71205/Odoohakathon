import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {
               
        setUser,
        setToken,
        setIsLoggedIn,
    } = useAppContext();
    const [curentUser, setCurrentUser] = useState("user");
    const [islogin, setisLogin] = useState(true);
    const [username, setUsername] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (islogin) {
            handleLogin();
        } else {
            handelSignup();
        }
    }
    // In AppContext.js
    const loginUser = async ({ email, password, role }) => {
        try {
            const res = await fetch(`http://localhost:3000/api/${role}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Login failed");
            }

            const data = await res.json();
            const userData = { id: data.id, name: data.username, email: data.email, role };

            setUser(userData);
            setToken(data.token || "sample_token"); // Use real token if available
            setIsLoggedIn(true);

            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", data.token || "sample_token");

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const signupUser = async ({ email, password, username, role }) => {
        try {
            const res = await fetch(`http://localhost:3000/api/${role}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, username }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Signup failed");
            }

            const data = await res.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };


    return (

        <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="flex-grow flex items-center bg-blue-100 justify-center px-4">
                <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-3xl shadow-md w-full max-w-md space-y-6">
                    <div className="flex justify-between bg-white p-1 rounded-full shadow-inner">
                        <button
                            type="button"
                            className={`w-1/2 py-2 rounded-full font-semibold ${islogin ? 'bg-slate-800 text-white' : 'text-gray-600'}`}
                            onClick={() => setisLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={`w-1/2 py-2 rounded-full font-semibold ${!islogin ? 'bg-slate-800 text-white' : 'text-gray-600'}`}
                            onClick={() => {
                                setisLogin(false);
                                setCurrentUser("user");
                            }}
                        >
                            Signup
                        </button>
                    </div>

                    {islogin ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

                            <div>
                                <label className="block text-gray-700 mb-2">User Role</label>
                                <select
                                    value={curentUser}
                                    onChange={(e) => setCurrentUser(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="user">USER</option>
                                    <option value="admin">ADMIN</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 text-center">Signup</h2>

                            <div>
                                <label className="block text-gray-700 mb-2">User Role</label>
                                <select
                                    value={curentUser}
                                    onChange={(e) => setCurrentUser(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="user">USER</option>
                                    <option value="admin">ADMIN</option>

                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>



                            <button type="submit" className="w-full px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                                Signup
                            </button>
                        </>
                    )}
                </form>
            </main>
        </div>
    );
}

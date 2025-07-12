import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
 const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [currentUser, setCurrentUser] = useState("user"); // "user" or "admin"
    const [isLogin, setIsLogin] = useState(true);

    const {
        login,
        logout,
        setRole, // optional if not using inside login()
    } = useAppContext();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        isLogin ? handleLogin() : handleSignup();
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/${currentUser}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login({
                    id: data.user.id,
                    name: data.user.name,
                    token: data.token,
                    role: currentUser,
                });

                navigate(currentUser === "admin" ? "/admin/dashboard" : "/user/home");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login Error:", err);
            alert("An error occurred during login.");
        }
    };

    const handleSignup = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/${currentUser}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login({
                    id: data.user.id,
                    name: data.user.name,
                    token: data.token,
                    role: currentUser,
                });

                navigate(currentUser === "admin" ? "/admin/dashboard" : "/user/home");
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup Error:", err);
            alert("An error occurred during signup.");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="flex-grow flex items-center bg-blue-100 justify-center px-4">
                <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-3xl shadow-md w-full max-w-md space-y-6">
                    <div className="flex justify-between bg-white p-1 rounded-full shadow-inner">
                        <button
                            type="button"
                            className={`w-1/2 py-2 rounded-full font-semibold ${isLogin ? 'bg-slate-800 text-white' : 'text-gray-600'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={`w-1/2 py-2 rounded-full font-semibold ${!isLogin ? 'bg-slate-800 text-white' : 'text-gray-600'}`}
                            onClick={() => {
                                setIsLogin(false);
                                setCurrentUser("user");
                            }}
                        >
                            Signup
                        </button>
                    </div>

                    {isLogin ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

                            <div>
                                <label className="block text-gray-700 mb-2">User Role</label>
                                <select
                                    value={currentUser}
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
                                    value={currentUser}
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

import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {
        loggedInUser,
        setLoggedInUser,
        admins,
        drivers,
        users,
        setUsers,
        setDrivers,
    } = useAppContext();
    const [curentUser, setCurrentUser] = useState("user");
    const [islogin, setisLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [vehicle, setVehicle] = useState("Bus");

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(islogin){
            handleLogin();
        }else{
            handelSignup();
        }
    }

    const handleLogin = (e) => {

        if (!email || !password) {
            alert("No input field should be empty");
            return false;
        }

        if (loggedInUser) {
            localStorage.removeItem("loggedInUser");
        }

        const user = {
            role: curentUser,
            email: email,
            password: password,
        };

        let tempUser;
        if (curentUser === "admin") {
            tempUser = admins.find((u) => u.email === user.email);
        } else if (curentUser === "user") {
            tempUser = users.find((u) => u.email === user.email);
        } else {
            tempUser = drivers.find((u) => u.email === user.email);
        }

        if (!tempUser) {
            alert("No such Admin exist!");
            return false;
        } else if (tempUser.password != user.password) {
            alert("Oops!, Wrong Password");
            return false;
        }

        setLoggedInUser(user);

        setEmail("");
        setPassword("");

        navigate(`/${curentUser}/dashboard`);
    };

    const handelSignup = () => {

        if (!username) {
            alert("No input field should be empty");
            return false;
        }

        if (
            (curentUser === "user" && users.some((u) => u.email === email)) ||
            (curentUser === "driver" && drivers.some((u) => u.email === email))
        ) {
            alert("Email already exists!");
            return;
        }

        let user;

        if (curentUser === "user") {
            user = {
                email: email,
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                password: password,
                username: username,
            };
            setUsers((prev) => [...prev, user]);
        } else {
            user = {
                email: email,
                id: drivers.length > 0 ? drivers[drivers.length - 1].id + 1 : 1,
                password: password,
                username: username,
                vehicleType: vehicle,
            };

            setDrivers((prev) => [...prev, user]);
        }

        alert("Successfully Signup, redirecting to Login Page");

        navigate("/login");
    };

    return (
        <div className="mx-0 w-screen min-h-screen bg-gray-300 flex flex-col md:flex-row justify-items-start box-border">
            <div className="flex-1/5 md:flex-1 bg-white bg-[url('/Login.jpg')] bg-no-repeat bg-center bg-fit">
                <button
                    className="m-5 p-3 px-5 bg-slate-900/75 rounded-2xl text-slate-50"
                    onClick={() => navigate("/")}
                >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
            </div>
            <div className="flex-4/5 md:flex-1 p-5 flex flex-col gap-2 md:gap-0">
                <div className="flex flex-col md:flex-row w-full gap-2 md:gap-0 ">
                    <button
                        className={`${
                            islogin
                                ? "bg-slate-800 text-white"
                                : "bg-slate-400 text-black"
                        } flex-1 p-4 rounded-2xl md:rounded-none md:rounded-tl-2xl transition-all duration-200 ease-linear`}
                        onClick={() => setisLogin(true)}
                    >
                        Login
                    </button>

                    <button
                        className={`${
                            islogin
                                ? "bg-slate-400 text-black"
                                : "bg-slate-800  text-white"
                        } flex-1 p-4 rounded-2xl md:rounded-none md:rounded-tr-2xl transition-all duration-200 ease-linear`}
                        onClick={() => {
                            setisLogin(false);
                            setCurrentUser("user");
                        }}
                    >
                        Signup
                    </button>
                </div>

                <div className="bg-slate-800 p-5 flex-1 rounded-2xl md:rounded-none md:rounded-b-2xl">
                    <form onSubmit={handleSubmit}>
                        {islogin ? (
                            <div className="login width-[100%] flex flex-col justify-center">
                                <div className="mb-2 flex flex-col md:flex-row">
                                    <label
                                        htmlFor="user"
                                        className="text-white p-1 text-lg flex-1 md:flex-1/4"
                                    >
                                        User:{" "}
                                    </label>
                                    <select
                                        className="bg-white p-2 mx-2 rounded-xl flex-1 md:flex-3/4"
                                        type="user"
                                        name="user"
                                        id="user"
                                        placeholder="Enter email"
                                        value={curentUser}
                                        onChange={(e) =>
                                            setCurrentUser(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="user"> USER </option>
                                        <option value="admin"> ADMIN </option>
                                        <option value="driver"> DRIVER </option>
                                    </select>
                                </div>

                                <div className="mb-2 flex flex-col md:flex-row">
                                    <label
                                        htmlFor="email"
                                        className="text-white p-1 text-lg flex-1 md:flex-1/4"
                                    >
                                        Email:{" "}
                                    </label>
                                    <input
                                        className="bg-white p-2 mx-2 rounded-xl flex-1 md:flex-3/4"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-2 flex flex-col md:flex-row">
                                    <label
                                        htmlFor="password"
                                        className="text-white p-1 text-lg flex-1 md:flex-1/4"
                                    >
                                        Password:{" "}
                                    </label>
                                    <input
                                        className="bg-white p-2 mx-2 rounded-xl flex-1 md:flex-3/4"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    className="bg-gray-300 text-black p-1 px-4 text-md md:text-xl !rounded-2xl"
                                    type="submit"
                                >
                                    Login
                                </button>

                                {curentUser === "admin" && (
                                    <div className="border rounded-xl text-slate-50 p-5 mt-3">
                                        <h3 className="font-semibold text-xl underline pb-6">
                                            Dummy Credentials:
                                        </h3>
                                        <p>Email: admin@example.com </p>
                                        <p>Password : Admin@123</p>
                                    </div>
                                )}

                                {curentUser === "user" && (
                                    <div className="border rounded-2xl text-slate-50 p-5 mt-3">
                                        <h3 className="font-semibold text-xl underline pb-6">
                                            Dummy Credentials:
                                        </h3>
                                        <p className="mt-1">Email: Alice@example.com </p>
                                        <p className="mb-1">Password : Alice@123</p>
                                        <hr />
                                        <p className="mt-1">Email: Bob@example.com</p>
                                        <p className="mb-1">Password: Bob@123</p>
                                    </div>
                                )}

                                {curentUser === "driver" && (
                                    <div className="border rounded-2xl text-slate-50 p-3 mt-3">
                                        <h3 className="font-semibold text-xl underline pb-3">
                                            Dummy Credentials:
                                        </h3>
                                        <p className="mt-1">
                                            Email: A@example.com{" "}
                                        </p>
                                        <p>Password : Aaa@123</p>
                                        <p className="mb-1">Vehicle: Car</p>
                                        <hr />
                                        <p className="mt-1">
                                            Email: B@example.com{" "}
                                        </p>
                                        <p>Password : Bbb@456</p>
                                        <p className="mb-1">Vehicle: Van</p>
                                        <hr />
                                        <p className="mt-1">
                                            Email: A@example.com{" "}
                                        </p>
                                        <p>Password : Ccc@789</p>
                                        <p className="mb-1">Vehicle: bus</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="signup width-[100%] flex flex-col justify-center">
                                <div className="mb-2 flex flex-col md:flex-row">
                                    <label
                                        htmlFor="user"
                                        className="text-white p-1 text-lg flex-1 md:flex-1/4"
                                    >
                                        User:{" "}
                                    </label>
                                    <select
                                        className="bg-white p-2 mx-2 rounded-xl flex-1 md:flex-3/4"
                                        type="user"
                                        name="user"
                                        id="user"
                                        placeholder="Enter email"
                                        value={curentUser}
                                        onChange={(e) =>
                                            setCurrentUser(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="user"> USER </option>
                                        <option value="driver"> DRIVER </option>
                                    </select>
                                </div>

                                <div className="mb-2 flex flex-col md:flex-row">
                                    <label
                                        htmlFor="username"
                                        className="text-white p-1 text-lg flex-1 md:flex-1/4"
                                    >
                                        Username:{" "}
                                    </label>
                                    <input
                                        className="bg-white p-2 mx-2 rounded-xl flex-1 md:flex-3/4"
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-2 flex flex-col md:flex-row">
                                    <label
                                        htmlFor="email"
                                        className="text-white p-1 text-lg flex-1 md:flex-1/4"
                                    >
                                        Email:{" "}
                                    </label>
                                    <input
                                        className="bg-white p-2 mx-2 rounded-xl flex-1 md:flex-3/4"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-2 flex flex-col md:flex-row">
                                    <label
                                        htmlFor="password"
                                        className="text-white p-1 text-lg flex-1 md:flex-1/4"
                                    >
                                        Password:{" "}
                                    </label>
                                    <input
                                        className="bg-white p-2 mx-2 rounded-xl flex-1 md:flex-3/4"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {curentUser === "driver" && (
                                    <div className="mb-2 flex flex-col md:flex-row">
                                        <label
                                            htmlFor="password"
                                            className="text-white p-1 text-lg flex-1 md:flex-1/4"
                                        >
                                            Vehicle:{" "}
                                        </label>
                                        <select
                                            name="vehicle"
                                            id="vehicle"
                                            value={vehicle}
                                            onChange={(e) =>
                                                setVehicle(e.target.value)
                                            }
                                            className="bg-white p-2 mx-2 rounded-xl flex-1 md:flex-3/4"
                                        >
                                            <option value="Bus">Bus</option>
                                            <option value="Car">Car</option>
                                            <option value="Van">Van</option>
                                        </select>
                                    </div>
                                )}

                                <button
                                    className="bg-slate-300 text-black p-1 px-4 text-md md:text-lg !rounded-2xl"
                                    type="submit"
                                >
                                    Signup
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx"


export default function AppRouter() {
    const {loggedInUser} = useAppContext();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} 
        />           
        </Routes>
    );
}

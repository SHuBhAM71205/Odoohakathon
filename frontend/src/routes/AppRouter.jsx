import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import Request from "../components/User/Request.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx"
import Profile from "../components/General/Profile.jsx";

export default function AppRouter() {
    const {loggedInUser} = useAppContext();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/requests" element={<Request />}/>  
            <Route path="/profile" element={<Profile/>}/>        
        </Routes>
    );
}

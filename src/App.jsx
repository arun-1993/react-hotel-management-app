import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Navigate replace to="dashboard" />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="bookings/:bookingId" element={<Booking />} />
                    <Route path="checkin/:bookingId" element={<CheckIn />} />
                    <Route path="cabins" element={<Cabins />} />
                    <Route path="users" element={<Users />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="account" element={<Account />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

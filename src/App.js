import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import DataVisualization from './components/DataVisualization';
import CalendarView from "./components/CalendarView";
import HomeScreen from "./components/HomeScreen";
import Layout from './components/Layout';
import LogForm from "./components/DailyForm/LogForm";
import LogResults from "./components/LogResults";
import './App.css';

const PrivateRoute = ({ element }) => {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? element : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/log" element={<PrivateRoute element={<Layout><LogForm /></Layout>} />} />
                    <Route path="/calendar" element={<PrivateRoute element={<Layout><CalendarView /></Layout>} />} />
                    <Route path="/visualization" element={<PrivateRoute element={<Layout><DataVisualization /></Layout>} />} />
                    <Route path="/home" element={<PrivateRoute element={<Layout><HomeScreen /></Layout>} />} />
                    <Route path="/results" element={<PrivateRoute element={<Layout><LogResults /></Layout>} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;

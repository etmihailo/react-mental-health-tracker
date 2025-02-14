import React, {useContext} from 'react';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import {AuthContext} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {currentUser ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
};

export default Logout;

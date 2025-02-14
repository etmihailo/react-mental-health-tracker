import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import {AuthContext} from '../context/AuthContext';

const useLogout = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);

    const logout = async () => {
        if (currentUser) {
            try {
                await signOut(auth);
                navigate('/');
            } catch (error) {
                console.error('Error logging out:', error);
            }
        }
    };

    return logout;
};

export default useLogout;

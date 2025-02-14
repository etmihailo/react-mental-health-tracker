import React, {useContext, useEffect} from 'react';
import {auth, googleProvider} from '../firebase';
import {signInWithPopup} from 'firebase/auth';
import {AuthContext} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {Container, Typography, Button, CircularProgress} from '@mui/material';

const Login = () => {
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/home');
        }
    }, [currentUser, navigate]);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            {currentUser ? (
                <>
                    <Typography variant="body1" gutterBottom>
                        Redirecting...
                    </Typography>
                    <CircularProgress/>
                </>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{mt: 2}}
                >
                    Login with Google
                </Button>
            )}
        </Container>
    );
};

export default Login;

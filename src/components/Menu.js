import React from 'react';
import {AppBar, Toolbar, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Menu = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={() => navigate('/log')}>Daily Log</Button>
                <Button color="inherit" onClick={() => navigate('/calendar')}>Calendar</Button>
                <Button color="inherit" onClick={() => navigate('/visualization')}>Trends</Button>
                <Button sx={{ml: 'auto'}} color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Menu;

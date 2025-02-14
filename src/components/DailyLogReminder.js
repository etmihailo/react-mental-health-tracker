import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {DateTime} from 'luxon';


const DailyLogReminder = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogExists = async () => {
            try {
                const today = DateTime.local().toISODate();
                const response = await axios.get('http://localhost:5001/api/log-by-date', {
                    params: {date: today},
                });
                setOpen(!response.data);
            } catch (error) {
                console.error('Error checking log existence:', error);
            }
        };

        checkLogExists();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleFillLog = () => {
        navigate('/log');
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Daily Log Reminder</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You haven't filled out the daily log for today. Would you like to fill it out now?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Not Now
                </Button>
                <Button onClick={handleFillLog} color="primary">
                    Fill Log
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DailyLogReminder;

import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';
import axios from 'axios';
import {DateTime} from 'luxon';
import {useNavigate} from 'react-router-dom';

const DailyLogAlert = ({onEdit, onCreateNew}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogExists = async () => {
            try {
                const today = DateTime.local().toISODate();
                const response = await axios.get('http://localhost:5001/api/log-by-date', {
                    params: {date: today},
                });
                setOpen(!!response.data);
            } catch (error) {
                console.error('Error checking log existence:', error);
            }
        };

        checkLogExists();
    }, []);

    const handleClose = () => {
        setOpen(false);
        navigate('/home');
    };

    const handleEditLog = () => {
        onEdit();
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Daily Log Alert</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You have already filled out the daily log for today. Would you like to edit it?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleEditLog} color="primary">
                    Edit Log
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DailyLogAlert;

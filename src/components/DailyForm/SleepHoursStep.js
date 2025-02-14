import React from 'react';
import {FormControl, FormLabel, Slider, Typography} from '@mui/material';

const SleepHoursStep = ({formData, setFormData}) => {
    const handleSleepHoursChange = (event, newValue) => {
        setFormData({...formData, sleepHours: newValue});
    };

    return (
        <FormControl>
            <FormLabel sx={{marginBottom: '16px'}}>Sleep Hours</FormLabel>
            <Slider
                value={formData.sleepHours}
                onChange={handleSleepHoursChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={10}
                sx={{width: '100%', marginTop: '20px'}}
            />
            <Typography variant="body1" sx={{textAlign: 'center', marginTop: '20px'}}>
                {formData.sleepHours === 10 ? '10+' : formData.sleepHours} hours
            </Typography>
        </FormControl>
    );
};

export default SleepHoursStep;

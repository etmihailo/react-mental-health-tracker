import React from 'react';
import {FormControl, FormLabel, Slider, Typography} from '@mui/material';

const sleepQualityMarks = [
    {value: 0, label: 'Bad'},
    {value: 60, label: 'Fair'},
    {value: 70, label: 'Good'},
    {value: 85, label: 'Optimal'},
];

const SleepQualityStep = ({formData, setFormData}) => {
    const handleSleepQualityChange = (event, newValue) => {
        setFormData({...formData, sleepQuality: newValue});
    };

    return (
        <FormControl>
            <FormLabel sx={{marginBottom: '16px'}}>Sleep Quality</FormLabel>
            <Slider
                value={formData.sleepQuality}
                onChange={handleSleepQualityChange}
                valueLabelDisplay="auto"
                step={1}
                marks={sleepQualityMarks}
                min={0}
                max={100}
                sx={{width: '100%', marginTop: '20px'}}
            />
            <Typography variant="body1" sx={{textAlign: 'center', marginTop: '20px', whiteSpace: 'nowrap'}}>
                {formData.sleepQuality >= 0 && formData.sleepQuality < 60
                    ? 'Bad'
                    : formData.sleepQuality >= 60 && formData.sleepQuality < 70
                        ? 'Fair'
                        : formData.sleepQuality >= 70 && formData.sleepQuality < 85
                            ? 'Good'
                            : 'Optimal'}
            </Typography>
        </FormControl>
    );
};

export default SleepQualityStep;

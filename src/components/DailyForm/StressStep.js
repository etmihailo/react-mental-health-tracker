import React from 'react';
import {FormControl, FormLabel, Slider, Typography} from '@mui/material';

const stressLevels = [
    {value: 0, label: 'Low', color: 'blue'},
    {value: 1, label: 'Optimal', color: '#66BB6A'},
    {value: 2, label: 'Moderate', color: 'yellow'},
    {value: 3, label: 'High', color: 'orange'},
    {value: 4, label: 'Too High', color: 'red'}
];

const StressStep = ({formData, setFormData}) => {
    return (
        <FormControl>
            <FormLabel sx={{marginBottom: '16px'}}>Stress</FormLabel>
            <Slider
                value={formData.stress}
                onChange={(event, newValue) => setFormData({...formData, stress: newValue})}
                valueLabelDisplay="auto"
                step={1}
                marks={stressLevels.map((level) => ({value: level.value, label: level.label}))}
                min={0}
                max={4}
                sx={{
                    width: '100%',
                    marginTop: '20px',
                    color: stressLevels[formData.stress].color,
                    '& .MuiSlider-track': {
                        backgroundColor: stressLevels[formData.stress].color,
                    },
                    '& .MuiSlider-thumb': {
                        borderColor: stressLevels[formData.stress].color,
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#d8d8d8',
                    },
                }}
            />
            <Typography variant="body1" sx={{textAlign: 'center', marginTop: '20px'}}>
                {stressLevels[formData.stress].label}
            </Typography>
        </FormControl>
    );
};

export default StressStep;

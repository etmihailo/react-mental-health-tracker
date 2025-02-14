import React from 'react';
import {FormControl, FormLabel, TextField} from '@mui/material';

const SymptomsStep = ({formData, setFormData}) => {
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <FormControl fullWidth>
            <FormLabel sx={{marginBottom: '16px'}}>Symptoms</FormLabel>
            <TextField
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                placeholder="Describe any symptoms you are experiencing..."
            />
        </FormControl>
    );
};

export default SymptomsStep;

import React from 'react';
import {FormControl, FormLabel, Grid, Stack, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const socialInteractionFrequency = [
    {icon: <PersonIcon/>, value: 'not_often', label: 'Not Often'},
    {icon: <PeopleIcon/>, value: 'fairly_often', label: 'Fairly Often'},
    {icon: <Diversity3Icon/>, value: 'very_often', label: 'Very Often'}
];

const SocialInteractionsStep = ({formData, setFormData}) => {
    return (
        <FormControl>
            <FormLabel sx={{marginBottom: '16px'}}>Social Interactions</FormLabel>
            <Grid container spacing={2} justifyContent="center">
                {socialInteractionFrequency.map((emoji, index) => (
                    <Grid item xs={4} key={index}>
                        <Stack alignItems="center">
                            <Stack
                                sx={{
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    backgroundColor: '#ffffff',
                                    border: emoji.value === formData.socialInteractions ? '2px solid #000' : '1px solid #e0e0e0',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.2)',
                                    },
                                }}
                                onClick={() => setFormData({...formData, socialInteractions: emoji.value})}
                            >
                                {emoji.icon}
                            </Stack>
                            <Typography variant="caption" sx={{textAlign: 'center', mt: 1}}>
                                {emoji.label}
                            </Typography>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </FormControl>
    );
};

export default SocialInteractionsStep;

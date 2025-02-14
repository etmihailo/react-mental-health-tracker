import React from 'react';
import {FormControl, FormLabel, Grid, Stack, Typography} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const moodEmojis = [
    {icon: <SentimentVeryDissatisfiedIcon/>, value: 'very_sad', label: 'Very Sad', color: '#FF0000'},
    {icon: <SentimentDissatisfiedIcon/>, value: 'sad', label: 'Sad', color: '#FFA500'},
    {icon: <SentimentSatisfiedIcon/>, value: 'neutral', label: 'Neutral', color: '#FFFF00'},
    {icon: <SentimentSatisfiedAltIcon/>, value: 'happy', label: 'Happy', color: '#00FF00'},
    {icon: <SentimentVerySatisfiedIcon/>, value: 'very_happy', label: 'Very Happy', color: '#008000'}
];

const MoodStep = ({formData, setFormData, selectedMood, setSelectedMood}) => {
    const handleMoodClick = (value) => {
        setFormData({...formData, mood: value});
        setSelectedMood(value);
    };

    return (
        <FormControl>
            <FormLabel sx={{marginBottom: '16px'}}>Mood</FormLabel>
            <Grid container spacing={2} justifyContent="center">
                {moodEmojis.map((emoji, index) => (
                    <Grid item xs={2.4} key={index}>
                        <Stack alignItems="center">
                            <Stack
                                sx={{
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    backgroundColor: emoji.color,
                                    border: emoji.value === selectedMood ? '2px solid #000' : 'none',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.2)',
                                    },
                                }}
                                onClick={() => handleMoodClick(emoji.value)}
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

export default MoodStep;

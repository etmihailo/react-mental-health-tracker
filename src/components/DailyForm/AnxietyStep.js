import React from 'react';
import {FormControl, FormLabel, Grid, Stack, Typography} from '@mui/material';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const anxietyEmojis = [
    {icon: <MoodBadIcon/>, value: 'very_anxious', label: 'Very Anxious', color: '#FF0000'},
    {icon: <SentimentDissatisfiedIcon/>, value: 'anxious', label: 'Anxious', color: '#FFA500'},
    {icon: <SentimentNeutralIcon/>, value: 'neutral', label: 'Neutral', color: '#FFFF00'},
    {icon: <SentimentSatisfiedAltOutlinedIcon/>, value: 'calm', label: 'Calm', color: '#00FF00'},
    {icon: <SentimentVerySatisfiedIcon/>, value: 'very_calm', label: 'Very Calm', color: '#008000'}
];

const AnxietyStep = ({formData, setFormData, selectedAnxiety, setSelectedAnxiety}) => {
    const handleAnxietyClick = (value) => {
        setFormData({...formData, anxiety: value});
        setSelectedAnxiety(value);
    };

    return (
        <FormControl>
            <FormLabel sx={{marginBottom: '16px'}}>Anxiety</FormLabel>
            <Grid container spacing={2} justifyContent="center">
                {anxietyEmojis.map((emoji, index) => (
                    <Grid item xs={2.4} key={index}>
                        <Stack alignItems="center">
                            <Stack
                                sx={{
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    backgroundColor: emoji.color,
                                    border: emoji.value === selectedAnxiety ? '2px solid #000' : 'none',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.2)',
                                    },
                                }}
                                onClick={() => handleAnxietyClick(emoji.value)}
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

export default AnxietyStep;

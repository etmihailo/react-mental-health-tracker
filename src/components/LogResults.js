import React from 'react';
import {useLocation} from 'react-router-dom';
import {Container, Typography, List, ListItem, ListItemText} from '@mui/material';
import {DateTime} from 'luxon';

const moodLabels = {
    very_sad: 'Very Sad',
    sad: 'Sad',
    neutral: 'Neutral',
    happy: 'Happy',
    very_happy: 'Very Happy'
};

const anxietyLabels = {
    very_anxious: 'Very Anxious',
    anxious: 'Anxious',
    neutral: 'Neutral',
    calm: 'Calm',
    very_calm: 'Very Calm'
};

const socialInteractionLabels = {
    not_often: 'Not Often',
    fairly_often: 'Fairly Often',
    very_often: 'Very Often'
};

const getSleepQualityLabel = (value) => {
    if (value >= 0 && value < 60) {
        return value + ' - Bad';
    } else if (value >= 60 && value < 70) {
        return value + ' - Fair';
    } else if (value >= 70 && value < 85) {
        return value + ' - Good';
    } else {
        return value + ' - Optimal';
    }
};

const getStressLevelLabel = (value) => {
    switch (value) {
        case '0':
            return value + ' - Low';
        case '1':
            return value + ' - Optimal';
        case '2':
            return value + ' - Moderate';
        case '3':
            return value + ' - High';
        case '4':
            return value + ' - Too High';
        default:
            return '';
    }
};

const LogResults = () => {
    const location = useLocation();
    const {logData} = location.state || {};

    if (!logData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Log Results for {DateTime.fromISO(logData.date).toLocaleString(DateTime.DATE_FULL)}
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Mood" secondary={moodLabels[logData.mood]}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Anxiety" secondary={anxietyLabels[logData.anxiety]}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Sleep Hours" secondary={logData.sleepHours}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Sleep Quality" secondary={getSleepQualityLabel(logData.sleepQuality)}/>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Physical Activities"
                        secondary={logData.physicalActivities.map((activity, index) => (
                            <div key={index}>
                                {activity.activity}: {activity.hours}h {activity.minutes}m
                            </div>
                        ))}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Social Interactions"
                                  secondary={socialInteractionLabels[logData.socialInteractions]}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Stress" secondary={getStressLevelLabel(logData.stress)}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Symptoms" secondary={logData.symptoms}/>
                </ListItem>
            </List>
        </Container>
    );
};

export default LogResults;

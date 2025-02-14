import React from 'react';
import {FormControl, FormLabel, Grid, Select, MenuItem, IconButton, Stack, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const physicalActivities = [
    'Running',
    'Cycling',
    'Swimming',
    'Yoga',
    'Weightlifting',
    'Walking',
    'Other'
];

const hours = Array.from({length: 25}, (_, i) => `${i}`);
const minutes = Array.from({length: 60}, (_, i) => `${i.toString().padStart(2, '0')}`);

const PhysicalActivitiesStep = ({formData, setFormData}) => {

    const handleActivityChange = (index, event) => {
        const newActivities = [...formData.physicalActivities];
        newActivities[index] = {...newActivities[index], activity: event.target.value};
        setFormData({...formData, physicalActivities: newActivities});
    };

    const handleHoursChange = (index, event) => {
        const newActivities = [...formData.physicalActivities];
        newActivities[index] = {...newActivities[index], hours: event.target.value};
        setFormData({...formData, physicalActivities: newActivities});
    };

    const handleMinutesChange = (index, event) => {
        const newActivities = [...formData.physicalActivities];
        newActivities[index] = {...newActivities[index], minutes: event.target.value};
        setFormData({...formData, physicalActivities: newActivities});
    };

    const addActivity = () => {
        setFormData({
            ...formData,
            physicalActivities: [...formData.physicalActivities, {activity: '', hours: '', minutes: ''}]
        });
    };

    const removeActivity = (index) => {
        const newActivities = formData.physicalActivities.filter((_, i) => i !== index);
        setFormData({...formData, physicalActivities: newActivities});
    };

    return (
        <FormControl>
            <FormLabel sx={{marginBottom: '16px'}}>Physical Activities</FormLabel>
            {formData.physicalActivities.map((activity, index) => (
                <Grid container spacing={2} alignItems="center" key={index} marginBottom="20px">
                    <Grid item xs={4} sm={4} md={4}>
                        <Select
                            value={activity.activity}
                            onChange={(event) => handleActivityChange(index, event)}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="" disabled>
                                Select Activity
                            </MenuItem>
                            {physicalActivities.map((type, i) => (
                                <MenuItem key={i} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={3} sm={2} md={2}>
                        <Select
                            value={activity.hours}
                            onChange={(event) => handleHoursChange(index, event)}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="" disabled>
                                Hrs
                            </MenuItem>
                            {hours.map((hour, i) => (
                                <MenuItem key={i} value={hour}>
                                    {hour}H
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={3} sm={2} md={2}>
                        <Select
                            value={activity.minutes}
                            onChange={(event) => handleMinutesChange(index, event)}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="" disabled>
                                Min
                            </MenuItem>
                            {minutes.map((minute, i) => (
                                <MenuItem key={i} value={minute}>
                                    {minute}M
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1}
                          sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginLeft: '16px'}}>
                        <IconButton onClick={() => removeActivity(index)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            <Stack direction="row" justifyContent="flex-start" spacing={2} sx={{marginTop: '10px'}}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon/>}
                    onClick={addActivity}
                >
                    Add Activity
                </Button>
            </Stack>
        </FormControl>
    );
};

export default PhysicalActivitiesStep;

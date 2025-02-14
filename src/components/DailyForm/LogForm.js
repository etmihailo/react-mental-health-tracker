import React, {useState, useEffect} from 'react';
import {Container, Stack, Button} from '@mui/material';
import MoodStep from './MoodStep';
import AnxietyStep from './AnxietyStep';
import SleepHoursStep from './SleepHoursStep';
import SleepQualityStep from './SleepQualityStep';
import PhysicalActivitiesStep from './PhysicalActivitiesStep';
import SocialInteractionsStep from './SocialInteractionsStep';
import StressStep from './StressStep';
import SymptomsStep from './SymptomsStep';
import axios from 'axios';
import DailyLogAlert from './DailyLogAlert';
import {DateTime} from 'luxon';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import {useNavigate} from 'react-router-dom';


const LogForm = ({initialEditMode = false}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mood: '',
        anxiety: '',
        sleepHours: 0,
        sleepQuality: 0,
        physicalActivities: [{activity: '', hours: '', minutes: ''}],
        socialInteractions: '',
        stress: 0,
        symptoms: ''
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedMood, setSelectedMood] = useState(null);
    const [selectedAnxiety, setSelectedAnxiety] = useState(null);
    const [isEditMode, setIsEditMode] = useState(initialEditMode);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            const fetchTodayLog = async () => {
                try {
                    const today = DateTime.local().toISODate();
                    const response = await axios.get('http://localhost:5001/api/log-by-date', {
                        params: {date: today},
                    });
                    if (response.data) {
                        const data = response.data;
                        setFormData(data);
                        setSelectedMood(data.mood);
                        setSelectedAnxiety(data.anxiety);
                    }
                } catch (error) {
                    console.error('Error fetching today\'s log:', error);
                }
            };

            fetchTodayLog();
        }
    }, [isEditMode]);


    const handleNext = () => {
        if (currentStep === 4) {
            const allActivitiesValid = formData.physicalActivities.every(activity =>
                activity.activity && activity.hours !== '' && activity.minutes !== ''
            );
            if (!allActivitiesValid && formData.physicalActivities.length > 0) {
                return;
            }
        }
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await axios.put('http://localhost:5001/api/log', formData);
            } else {
                await axios.post('http://localhost:5001/api/log', formData);
            }
            setDialogOpen(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate('/home');
    };


    const isNextDisabled = () => {
        if (currentStep === 4) {
            if (formData.physicalActivities?.length === 0) {
                return false;
            }
            return !formData.physicalActivities?.every(activity =>
                activity.activity && activity.hours !== '' && activity.minutes !== ''
            );
        }
        if (currentStep === 5) {
            return !formData.socialInteractions;
        }
        return (currentStep === 0 && !selectedMood) || (currentStep === 1 && !selectedAnxiety);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <MoodStep formData={formData} setFormData={setFormData} selectedMood={selectedMood}
                                 setSelectedMood={setSelectedMood}/>;
            case 1:
                return <AnxietyStep formData={formData} setFormData={setFormData} selectedAnxiety={selectedAnxiety}
                                    setSelectedAnxiety={setSelectedAnxiety}/>;
            case 2:
                return <SleepHoursStep formData={formData} setFormData={setFormData}/>;
            case 3:
                return <SleepQualityStep formData={formData} setFormData={setFormData}/>;
            case 4:
                return <PhysicalActivitiesStep formData={formData} setFormData={setFormData}/>;
            case 5:
                return <SocialInteractionsStep formData={formData} setFormData={setFormData}/>;
            case 6:
                return <StressStep formData={formData} setFormData={setFormData}/>;
            case 7:
                return <SymptomsStep formData={formData} setFormData={setFormData}/>;
            default:
                return null;
        }
    };

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleCreateNew = () => {
        setIsEditMode(false);
    };

    return (

        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '20px',
            }}
        >
            <DailyLogAlert onEdit={handleEdit} onCreateNew={handleCreateNew}/>
            <Stack
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                {renderStep()}
                <Stack direction="row" justifyContent={currentStep === 0 ? 'flex-end' : 'space-between'} mt={2}>
                    {currentStep > 0 && (
                        <Button type="button" variant="contained" color="secondary" onClick={handlePrev}>
                            Previous
                        </Button>
                    )}
                    {currentStep < 7 && (
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={isNextDisabled()}
                        >
                            Next
                        </Button>
                    )}
                    {currentStep === 7 && (
                        <Button type="submit" variant="contained" color="primary">
                            {isEditMode ? 'Update' : 'Submit'}
                        </Button>
                    )}
                </Stack>
            </Stack>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <DialogTitle>Submission Successful</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your log has been successfully submitted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default LogForm;

import * as React from 'react';
import {
    Box,
    Step,
    Button,
    Stepper,
    StepLabel
} from '@mui/material';
import PaxList from './StepperSteps/PaxList';
import Summary from './StepperSteps/Summary';
import { TourLeader } from './StepperSteps/TourLeader';
import { useNavigate } from 'react-router-dom';
import { PersonalPreferences } from './StepperSteps/PersonalPreferences';
import { AccommodationPreferences } from './StepperSteps/AccommodationPreferences';
import { observer } from 'mobx-react';
import store from '../store';
import { FormApi } from '../API/api';

const steps = [
    { label: 'הרשמה', component: <TourLeader /> },
    { label: 'פרטי נוסעים', component: <PaxList /> },
    { label: 'העדפות אישיות', component: <PersonalPreferences /> },
    { label: 'בחירת מקומות לינה ', component: <AccommodationPreferences /> },
    { label: 'סיום', component: <Summary /> },
];

const StepperPage = observer(() => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep < 4) {
                return prevActiveStep + 1;
            }

            try {
                FormApi.submitForm();
                navigate('/ThankYou');
            } catch (error) {
                console.error('Error:', error);
            }

        });
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className="App">
            <Stepper sx={{ padding: '10px' }} activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{
                margin: '0 50px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                pt: 2,
            }}>
                <Button
                    sx={{ color: 'black' }}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant='outlined'
                >
                    קודם
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={
                        store.tourLeader.name === undefined
                        && store.tourLeader.email === undefined
                        && store.tourLeader.phone === undefined
                    }
                    onClick={handleNext}
                >
                    {activeStep === steps.length - 1 ? 'סיום' : 'הבא'}
                </Button>
            </Box>
            <div>
                <header className="App-header">
                    <div style={{ height: '18cm' }}>
                        {steps[activeStep].component}
                    </div>
                </header>
            </div>
        </div >
    );
});

export default StepperPage;


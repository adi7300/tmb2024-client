
import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    TextField,
    Typography
} from '@mui/material';
import store from '../../store';

export function TourLeader() {
    const [formData, setFormData] = useState({
        name: store.tourLeader.name || '',
        email: store.tourLeader.email || '',
        phone: store.tourLeader.phone || '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = () => {
        store.saveFormRegisterDetails(formData)
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': {
                        width: '700px',
                        height: '100px',
                        fontSize: '20px',
                        marginTop: '50px',
                        direction: 'rtl',
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography sx={{ color: 'black' }}>יש למלא את ההסכם המצורף עם פרטי כל הנוסעים.
                    לאחר שליחת הטופס נעבור על הפרטים לבדוק אם יש נושאים לא ברורים או שאלות וניצור קשר בהתאם.
                    לאחר תחילת הטיפול בסגירת הלינות ישלח קישור  שיאפשר מעקב בכל זמן אחרי ההתקדמות.</Typography>
                <Typography style={{ paddingTop: '12px' }}><strong>מאוד חשוב שבטופס זה יצויין כל דבר שרלוונטי לנסיעה שלכם על מנת שיהיה ניתן לתת להכול מענה כמה שניתן כבר מהשלבים הראשונים.</strong></Typography>
            </Box >
            <FormControl>
                <TextField
                    id="full-name"
                    required
                    label="שם מלא בעברית של ממלא הטופס "
                    value={formData.name}
                    name="name"
                    variant="outlined"
                    sx={{ width: 300, marginBottom: '12px' }}
                    onChange={handleInputChange}
                />
                <TextField
                    id="email"
                    required
                    label="אימייל"
                    name="email"
                    variant="outlined"
                    value={formData.email}
                    sx={{ width: 300, marginBottom: '12px' }}
                    onChange={handleInputChange}
                />
                <TextField
                    id="phone"
                    required
                    label="מספר טלפון"
                    value={formData.phone}
                    name="phone"
                    variant="outlined"
                    sx={{ width: 300, marginBottom: '12px' }}
                    onChange={handleInputChange}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                    <Button
                        variant='contained'
                        type='submit'
                        onClick={handleSubmit}
                        sx={{ width: '100px', marginTop: '10px' }}
                    >
                        שמור
                    </Button>
                </div>
            </FormControl >
        </>
    )
}
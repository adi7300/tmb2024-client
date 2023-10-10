import React, { useState } from 'react';
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    FormControlLabel,
    Button,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import store from '../../store';
import '../../App.css';


export function PersonalPreferences() {
    const [formData, setFormData] = useState({
        roomType: 'dormitory',
        bedType: '',
        flightBooked: false,
        startingDate: '',
        endingDate: '',
        level: '',
    });

    const handleInputChange = (event) => {
        const { name, value, checked } = event.target;

        if (name === 'flightBooked') {
            setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
        } else setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const setStartingDate = (newValue) => {
        setFormData((prevFormData) => ({ ...prevFormData, startingDate: newValue.$d }));
    }

    const setEndingDate = (newValue) => {
        setFormData((prevFormData) => ({ ...prevFormData, endingDate: newValue.$d }));
    }

    const handleSubmit = () => {
        store.setPersonalPreferencesDetails(formData)
    };

    return (
        <div style={{ display: 'flex', direction: 'rtl' }}>
            <FormControl>
                <FormControlLabel
                    control={<Checkbox sx={{ marginLeft: 0 }} />}
                    label="הוזמנו טיסות"
                    labelPlacement="start"
                    name="flightBooked"
                    onChange={handleInputChange}
                    sx={{ display: 'flex', direction: 'ltr' }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            format='DD/MM/YYYY'
                            label="תאריך התחלה"
                            name="startingDate"
                            onChange={(newValue) => setStartingDate(newValue)}
                            sx={{
                                marginTop: '12px',
                                width: '350px',
                                display: 'flex',
                                direction: 'ltr'
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            format='DD/MM/YYYY'
                            label="תאריך סיום"
                            name="endingDate"
                            onChange={(newValue) => setEndingDate(newValue)}
                            sx={{
                                marginTop: '12px',
                                width: '350px',
                                display: 'flex',
                                direction: 'ltr'
                            }} />
                    </DemoContainer>
                </LocalizationProvider>
                <FormControl fullWidth sx={{ marginTop: '12px', width: '350px' }}>
                    <InputLabel id="roomType-label">סוג חדר</InputLabel>
                    <Select
                        fullWidth
                        labelId="roomType-label"
                        value={formData.roomType}
                        defaultValue={'dormitory'}
                        onChange={handleInputChange}
                        name="roomType"
                        margin="dense"
                        style={{ display: 'flex', direction: 'rtl', color: '#4b4f58' }}
                    >
                        <MenuItem value="dormitory">דורמיטורי (חדרים משותפים)</MenuItem>
                        <MenuItem value="private-only">חדרים פרטיים בלבד</MenuItem>
                        <MenuItem value="private-and-dormitory">שילוב של דורמיטורי וחדרים פרטיים</MenuItem>
                    </Select>
                </FormControl>
                {(formData.roomType !== 'dormitory') && <FormControl fullWidth sx={{ marginTop: '12px', width: '350px' }}>
                    <InputLabel id="bedType-label">סוג מיטה</InputLabel>
                    <Select
                        fullWidth
                        labelId="bedType-label"
                        value={formData.bedType}
                        onChange={handleInputChange}
                        name="bedType"
                        margin="dense"
                        style={{ display: 'flex', direction: 'rtl' }}
                    >
                        <MenuItem value="double-bed">מיטה זוגית</MenuItem>
                        <MenuItem value="twin-bed">מיטות נפרדות</MenuItem>
                    </Select>
                </FormControl>}
                <FormControl fullWidth sx={{ marginTop: '12px', width: '350px' }}>
                    <InputLabel id="level-label">רמה</InputLabel>
                    <Select
                        fullWidth
                        labelId="level-label"
                        value={formData.level}
                        defaultValue={''}
                        onChange={handleInputChange}
                        name="level"
                        margin="dense"
                        style={{ display: 'flex', direction: 'rtl', color: '#4b4f58' }}
                    >
                        <MenuItem value="Level-1">Level 1 - 110€ - 150€ לאדם ללילה</MenuItem>
                        <MenuItem value="Level-2">Level 2 - 70€ - 110€ לאדם ללילה</MenuItem>
                        <MenuItem value="Level-3">Level 3 - 45€ - 70€ לאדם ללילה</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    inputProps={{ style: { textAlign: 'right', width: '400px' } }}
                    fullWidth
                    multiline
                    rows={4}
                    label="הערות כגון: גמישות בתאריכים, אילוצים, רצונות או כל דבר אחר"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    sx={{ display: 'flex', direction: 'rtl', marginTop: '12px' }}
                    margin="dense"
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
            </FormControl>
        </div>
    );
};







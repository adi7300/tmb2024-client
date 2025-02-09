import React, { useState } from 'react';
import dayjs from 'dayjs';
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
        roomType: store.groupPreferences.roomType || 'dormitory',
        bedType: store.groupPreferences.bedType || '',
        flightBooked: store.groupPreferences.flightBooked || false,
        startingDate: store.groupPreferences.startingDate || '',
        endingDate: store.groupPreferences.endingDate || '',
        level: store.groupPreferences.level || '',
        remarks: store.groupPreferences.remarks || ''
    });

    const handleInputChange = (event) => {
        const { name, value, checked } = event.target;

        if (name === 'flightBooked') {
            setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
        } else setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const setStartingDate = (newValue) => {
        // Ensure we're setting the date at noon to avoid timezone issues
        const date = newValue ? newValue.hour(12).minute(0).second(0).millisecond(0) : null;
        setFormData((prevFormData) => ({ ...prevFormData, startingDate: date }));
    };

    const setEndingDate = (newValue) => {
        // Ensure we're setting the date at noon to avoid timezone issues
        const date = newValue ? newValue.hour(12).minute(0).second(0).millisecond(0) : null;
        setFormData((prevFormData) => ({ ...prevFormData, endingDate: date }));
    };

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
                            minDate={dayjs('2025-06-01')}
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
                            minDate={dayjs('2025-06-01')}
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
                        <MenuItem value="private-and-dormitory">שילוב של דורמיטורי וחדרים פרטיים</MenuItem>
                        <MenuItem value="private-only">חדרים פרטיים בלבד</MenuItem>
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
                        <MenuItem value="Level-1">Level 1 - 130€ - 170€ לאדם ללילה</MenuItem>
                        <MenuItem value="Level-2">Level 2 - 95€ - 130€ לאדם ללילה</MenuItem>
                        <MenuItem value="Level-3">Level 3 - 60€ - 95€ לאדם ללילה</MenuItem>
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







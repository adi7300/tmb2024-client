import React, { useState } from 'react';
import dayjs from '../../config/dayjs';
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    FormControlLabel,
    Button,
    Box,
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
        departureFlightNo: store.groupPreferences.departureFlightNo || '',
        returnFlightNo: store.groupPreferences.returnFlightNo || '',
        startingDate: store.groupPreferences.startingDate || '',
        endingDate: store.groupPreferences.endingDate || '',
        level: store.groupPreferences.level || '',
        remarks: store.groupPreferences.remarks || '',
        bookingEmail: store.bookingEmail || ''
    });

    const handleInputChange = (event) => {
        const { name, value, checked } = event.target;

        if (name === 'flightBooked') {
            setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
        } else {
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

            // Update store for bookingEmail immediately
            if (name === 'bookingEmail') {
                store.setBookingEmail(value);
            }
        }
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
                {formData.flightBooked && (
                    <Box sx={{ display: 'flex', gap: 2, marginTop: '12px' }}>

                        <TextField
                            fullWidth
                            label="מספר טיסת הלוך"
                            name="departureFlightNo"
                            value={formData.departureFlightNo}
                            onChange={handleInputChange}
                            margin="dense"
                            sx={{
                                width: '168px',
                                '& .MuiOutlinedInput-root': {
                                    direction: 'ltr',
                                    borderRadius: '4px'
                                },
                                '& .MuiInputLabel-root': {
                                    right: '24px',
                                    left: 'auto',
                                    transformOrigin: 'top right'
                                },
                                '& .MuiFormHelperText-root': {
                                    paddingRight: '10px',
                                    textAlign: 'right'
                                }
                            }} />
                        <TextField
                            fullWidth
                            label="מספר טיסת חזור"
                            name="returnFlightNo"
                            value={formData.returnFlightNo}
                            onChange={handleInputChange}
                            margin="dense"
                            sx={{
                                width: '168px',
                                '& .MuiOutlinedInput-root': {
                                    direction: 'ltr',
                                    borderRadius: '4px'
                                },
                                '& .MuiInputLabel-root': {
                                    right: '24px',
                                    left: 'auto',
                                    transformOrigin: 'top right'
                                },
                                '& .MuiFormHelperText-root': {
                                    paddingRight: '10px',
                                    textAlign: 'right'
                                }
                            }} />
                    </Box>
                )}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            format='DD/MM/YYYY'
                            label="תאריך התחלה"
                            name="startingDate"
                            minDate={dayjs('2026-06-01')}
                            onChange={(newValue) => setStartingDate(newValue)}
                            sx={{
                                width: '350px',
                                marginTop: '12px',
                                '& .MuiOutlinedInput-root': {
                                    direction: 'ltr',
                                    borderRadius: '4px'
                                },
                                '& .MuiInputLabel-root': {
                                    right: '54px',
                                    left: 'auto',
                                    transformOrigin: 'top right'
                                },
                                '& .MuiFormHelperText-root': {
                                    paddingRight: '10px',
                                    textAlign: 'right'
                                }
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            format='DD/MM/YYYY'
                            minDate={dayjs('2026-06-01')}
                            label="תאריך סיום"
                            name="endingDate"
                            onChange={(newValue) => setEndingDate(newValue)}
                            sx={{
                                width: '350px',
                                marginTop: '12px',
                                '& .MuiOutlinedInput-root': {
                                    direction: 'ltr',
                                    borderRadius: '4px'
                                },
                                '& .MuiInputLabel-root': {
                                    right: '54px',
                                    left: 'auto',
                                    transformOrigin: 'top right'
                                },
                                '& .MuiFormHelperText-root': {
                                    paddingRight: '10px',
                                    textAlign: 'right'
                                }
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <FormControl fullWidth sx={{
                    marginTop: '12px',
                    width: '350px',
                    '& .MuiInputLabel-root': {
                        right: '24px',
                        left: 'auto',
                        transformOrigin: 'top right'
                    }
                }}>
                    <InputLabel id="roomType-label">סוג חדר</InputLabel>
                    <Select
                        fullWidth
                        labelId="roomType-label"
                        value={formData.roomType}
                        defaultValue={'dormitory'}
                        onChange={handleInputChange}
                        name="roomType"
                        sx={{
                            direction: 'rtl',
                            color: '#4b4f58',
                            '& .MuiSelect-select': {
                                textAlign: 'right',
                                direction: 'rtl'
                            }
                        }}
                    >
                        <MenuItem value="dormitory" sx={{ direction: 'rtl', justifyContent: 'flex-start' }}>דורמיטורי (חדרים משותפים)</MenuItem>
                        <MenuItem value="private-and-dormitory" sx={{ direction: 'rtl', justifyContent: 'flex-start' }}>שילוב של דורמיטורי וחדרים פרטיים</MenuItem>
                        <MenuItem value="private-only" sx={{ direction: 'rtl', justifyContent: 'flex-start' }}>חדרים פרטיים בלבד</MenuItem>
                    </Select>
                </FormControl>
                {(formData.roomType !== 'dormitory') && <FormControl fullWidth sx={{
                    marginTop: '12px',
                    width: '350px',
                    '& .MuiInputLabel-root': {
                        right: '44px',
                        left: 'auto',
                        transformOrigin: 'top right'
                    }

                }}>
                    <InputLabel id="bedType-label" >סוג מיטה</InputLabel>
                    <Select
                        fullWidth
                        labelId="bedType-label"
                        value={formData.bedType}
                        defaultValue={'dormitory'}
                        onChange={handleInputChange}
                        name="bedType"
                        sx={{
                            direction: 'rtl',
                            color: '#4b4f58',
                            '& .MuiSelect-select': {
                                textAlign: 'right',
                                direction: 'rtl'
                            }
                        }}
                    >
                        <MenuItem value="double-bed" sx={{ direction: 'rtl', justifyContent: 'flex-start' }}>מיטה זוגית</MenuItem>
                        <MenuItem value="twin-bed" sx={{ direction: 'rtl', justifyContent: 'flex-start' }}>מיטות נפרדות</MenuItem>
                    </Select>
                </FormControl>}
                <FormControl fullWidth sx={{
                    marginTop: '12px',
                    width: '350px',
                    '& .MuiInputLabel-root': {
                        right: '24px',
                        left: 'auto',
                        transformOrigin: 'top right'
                    }
                }}>
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
                        <MenuItem value="Level-1" sx={{ direction: 'rtl', justifyContent: 'flex-start' }}>
                            Level 1 - לאדם ללילה 170€ - 130€
                        </MenuItem>
                        <MenuItem value="Level-2" sx={{ direction: 'rtl', justifyContent: 'flex-start' }}>
                            Level 2 - לאדם ללילה 130€ - 95€
                        </MenuItem>
                        <MenuItem value="Level-3" sx={{ direction: 'rtl', justifyContent: 'flex-start' }}>
                            Level 3 - לאדם ללילה 95€ - 60€
                        </MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{
                    marginTop: '12px',
                    width: '350px',
                    '& .MuiInputLabel-root': {
                        right: '24px',
                        left: 'auto',
                        transformOrigin: 'top right'
                    }
                }}>
                    <TextField
                        fullWidth
                        label="מייל Booking.com לשיוך ההזמנות (אופציונלי)"
                        name="bookingEmail"
                        type="email"
                        value={formData.bookingEmail}
                        onChange={handleInputChange}
                        sx={{
                            width: '350px',
                            marginTop: '12px',
                            '& .MuiOutlinedInput-root': {
                                direction: 'ltr',
                                borderRadius: '4px'
                            },
                            '& .MuiInputLabel-root': {
                                right: '34px',
                                left: 'auto',
                                transformOrigin: 'top right'
                            },
                            '& .MuiFormHelperText-root': {
                                paddingRight: '0px',
                                textAlign: 'right'
                            }
                        }}
                        placeholder="example@email.com"
                        variant="outlined"
                        margin="dense"
                    />
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
                    sx={{
                        width: '350px',
                        marginTop: '12px',
                        '& .MuiOutlinedInput-root': {
                            direction: 'ltr',
                            borderRadius: '4px'
                        },
                        '& .MuiInputLabel-root': {
                            right: '24px',
                            left: 'auto',
                            transformOrigin: 'top right'
                        },
                        '& .MuiFormHelperText-root': {
                            paddingRight: '0px',
                            textAlign: 'right'
                        }
                    }} margin="dense"
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







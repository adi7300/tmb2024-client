import React from 'react';
import { observer } from 'mobx-react';
import { Box, TextField, Typography, Checkbox } from '@mui/material';
import store from '../../store';

const Summary = observer(() => {
    const handleInputChange = (event) => {
        const { value } = event.target;
        store.setGeneralComment(value);
    };


    const handleTermsChange = (event) => {
        const { checked } = event.target;
        store.setTermsAccepted(checked);
    };

    return (
        <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '10px', direction: 'rtl' }}>
            <Box sx={{ marginBottom: '16px', padding: '12px 0' }}>
                <Typography
                    sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginBottom: '6px',
                        color: '#d32f2f'
                    }}
                >
                    מאוד חשוב לפני שליחת הטופס לוודא את כל הפרטים שנשלחים
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#666', fontStyle: 'italic', marginBottom: '15px' }}>
                    (ניתן ללחוץ על הקודם והבא בכל שלב, הפרטים נשמרים)
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="במידה וישנן הערות נוספות שחשוב שנדע לפני סגירת הלינות יש להזין אותן כאן"
                    name="comments"
                    value={store.generalComments}
                    onChange={handleInputChange}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            direction: 'rtl',
                            borderRadius: '8px'
                        },
                        '& .MuiInputLabel-root': {
                            right: '34px',
                            left: 'auto',
                            transformOrigin: 'top right'
                        }
                    }}
                    variant="outlined"
                />
            </Box>

            {/* Terms and Conditions Section */}
            <Box sx={{ padding: '8px 0', backgroundColor: 'transparent' }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '12px',
                        color: '#1976d2',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        // paddingX: '12px'
                    }}
                >
                    תנאי התקשרות
                </Typography>

                <Box sx={{ direction: 'rtl' }}>
                    <Typography sx={{
                        marginBottom: '8px',
                        lineHeight: 1.6,
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                        direction: 'rtl',
                        textAlign: 'right'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>•
                            פרטי האשראי אשר יתקבלו טלפונית לפני תחילת הטיפול בלינות ישמרו באופן מאובטח עד לסיום הטיול, וישמשו להבטיח את התשלומים למלונות ונותני השירות השונים.
                        </span>
                    </Typography>
                    <Typography sx={{
                        marginBottom: '8px',
                        lineHeight: 1.6,
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                        direction: 'rtl',
                        textAlign: 'right'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>•
                            הלקוח מתחייב לעדכן באשר לשינויים בכרטיס האשראי (החלפה, חסימה, ביטול וכדו׳'). הזמנות שיבוטלו כתוצאה מבעיה בכרטיס האשראי הם באחריות הלקוח.
                        </span>
                    </Typography>
                    <Typography sx={{
                        marginBottom: '8px',
                        lineHeight: 1.6,
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                        direction: 'rtl',
                        textAlign: 'right'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>•
                            עלות השירות כולל הזמנה וביטול של מקומות הלינה. שינוי מלא של התאריכים יחויב בעלות נוספת ומלאה.
                        </span>
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                        direction: 'rtl',
                        width: '100%'
                    }}>
                        <Checkbox
                            checked={store.termsAccepted || false}
                            onChange={handleTermsChange}
                            required
                            sx={{
                                padding: 0,
                                '& .MuiSvgIcon-root': {
                                    fontSize: 20,
                                    color: store.termsAccepted ? '#4caf50' : '#ff9800'
                                },
                            }}
                        />
                        <Typography sx={{
                            fontSize: '14px',
                            fontWeight: store.termsAccepted ? 'bold' : 'normal',
                            color: store.termsAccepted ? '#2e7d2e' : '#e65100',
                            flex: 1,
                            textAlign: 'right',
                            lineHeight: '20px'
                        }}>
                            <span style={{ color: '#d32f2f', marginLeft: '4px' }}>*</span>
                            אני מאשר/ת שקראתי והבנתי את תנאי ההתקשרות ואני מסכים/ה אליהם
                        </Typography>

                    </Box>

                </Box>

            </Box>
        </Box >
    );
});

export default Summary;
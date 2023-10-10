
import React from 'react';
import { observer } from 'mobx-react';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import store from '../../store';

const Summary = observer(() => {
    const handleInputChange = (event) => {
        const { value } = event.target;
        store.setGeneralComment(value);
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': {
                        width: '700px',
                        height: '20px',
                        fontSize: '20px',
                        margin: '20px',
                        direction: 'rtl',
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography sx={{ fontSize: '23px', marginTop: '25px' }}><strong>מאוד חשוב לפני שליחת הטופס לוודא את כל הפרטים שנשלחים</strong></Typography >
                <Typography>(ניתן ללחוץ על הקודם והבא בכל שלב, הפרטים נשמרים)</Typography>
                <Typography sx={{ color: 'black' }}>במידה וישנן הערות נוספות יש להזין אותן כאן</Typography>
            </Box>
            <FormControl>
                <TextField
                    inputProps={{ style: { width: '400px', direction: 'rtl' } }}
                    fullWidth
                    multiline
                    rows={4}
                    label="כל דבר שחשוב שנדע לפני תחילת התהליך"
                    name="comments"
                    value={store.generalComments}
                    onChange={handleInputChange}
                    sx={{ display: 'flex', direction: 'rtl', marginTop: '12px' }}
                    margin="dense"
                />
            </FormControl>
        </>
    )

});

export default Summary;
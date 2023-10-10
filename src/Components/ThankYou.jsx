import * as React from 'react';
import { Typography } from "@mui/material"

export function ThankYou() {

    return (
        <div className="App">
            <header className="App-header">
                <div style={{ marginTop: '50px' }}>
                    <Typography sx={{ fontSize: '20px' }}>תודה על שליחת הטופס</Typography>
                    <Typography>אנחנו נעבור עליו וניצור איתכם קשר בהקדם</Typography>
                </div>
            </header >
        </div >
    )
}
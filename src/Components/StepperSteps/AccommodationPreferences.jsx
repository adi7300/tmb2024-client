import React, { useState } from 'react';
import {
    TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, TableCell,
    TableRow, TableHead, Table, TableContainer, TableBody, Paper, Autocomplete
} from '@mui/material';
import store from '../../store';
import { observer } from 'mobx-react';
import '../../App.css';

const names = [
    'Chamonix',
    'Miage',
    'Les Contamines',
    'Bonhomme - Les Chapieux',
    'Motetts',
    'val Veni',
    'Courmayeur',
    'val Ferret',
    'la Fouly',
    'Champex',
    'Forclaz - Trient',
    'Tre le Champ',
    'Argentiere',
    'Lac Blanc',
    'Flegere',
    'Geneva',
];

export function AccommodationPreferences() {
    return (
        <>
            <AccommodationPreferencesForm />
            <PreferredAccommodationListObserver />
        </>
    )
}

const PreferredAccommodationListObserver = observer(PreferredAccommodationList);

function PreferredAccommodationList() {
    return (
        <TableContainer
            sx={{
                width: '35em',
                marginTop: 5,
                overflowY: 'auto',
                height: '90%',
                overflow: 'scroll'
            }}
            component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell align="right"></TableCell>
                        <TableCell key='remarks' style={{ fontWeight: 'bold' }} align="right">הערות</TableCell>
                        <TableCell key='thirdOption' style={{ fontWeight: 'bold' }} align="right">העדפה שלישית</TableCell>
                        <TableCell key='secondOption' style={{ fontWeight: 'bold' }} align="right">העדפה שניה</TableCell>
                        <TableCell key='firstOption' style={{ fontWeight: 'bold' }} align="right">העדפה ראשונה</TableCell>
                        <TableCell key='location' style={{ fontWeight: 'bold' }} align="right">מיקום</TableCell>
                        <TableCell key='nightNo' style={{ fontWeight: 'bold' }} align="right">מספר לילה</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {store.preferredAccommodationList.map((row) => (
                        <TableRow
                            key={row.nightNo}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <Button
                                    sx={{ paddingTop: 1.5 }}
                                    variant='text'
                                    onClick={() => store.removeAccommodationPreference(row.location)}
                                >הסר
                                </Button>
                            </TableCell>
                            <TableCell align="right">{row.remarks}</TableCell>
                            <TableCell align="right">{row.thirdOption}</TableCell>
                            <TableCell align="right">{row.secondOption}</TableCell>
                            <TableCell align="right">{row.firstOption}</TableCell>
                            <TableCell align="right">{row.location}</TableCell>
                            <TableCell align="right" component="th" scope="row">{row.nightNo}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


const AccommodationPreferencesForm = () => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        location: '',
        firstOption: '',
        secondOption: '',
        thirdOption: '',
        remarks: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
        setFormData((prevFormData) => ({ ...prevFormData, nightNo: store.preferredAccommodationList.length + 1 }));
    };

    const handleLocationChange = (location) => {
        setFormData((prevFormData) => ({ ...prevFormData, location }));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = () => {
        store.addAccommodationPreference(formData);
        formData.location = '';
        formData.firstOption = '';
        formData.secondOption = '';
        formData.thirdOption = '';
        formData.remarks = '';

        onClose();
    };

    const onClose = () => {
        setOpen(false);
    }
    return (
        <>
            <Button
                sx={{
                    color: '#cd5c5c',
                    borderColor: "#cd5c5c"
                }}
                variant="outlined"
                onClick={handleClickOpen}
            >הוספת לילה
            </Button>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{ direction: 'rtl' }}>העדפות לינה - לילה {store.preferredAccommodationList.length + 1}
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        disablePortal
                        autoFocus
                        fullWidth
                        id="location"
                        name="location"
                        value={formData.location}
                        options={names}
                        sx={{ width: 550 }}
                        onChange={(ev, newLocation) => handleLocationChange(newLocation)}
                        renderInput={(params) => <TextField {...params} label="מקום לינה * " />}
                        margin="dense"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="העדפה ראשונה"
                        name="firstOption"
                        value={formData.firstOption}
                        onChange={handleInputChange}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="העדפה שניה"
                        name="secondOption"
                        value={formData.secondOption}
                        onChange={handleInputChange}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="העדפה שלישית"
                        name="thirdOption"
                        value={formData.thirdOption}
                        onChange={handleInputChange}
                        margin="dense"
                    />
                    <TextField
                        inputProps={{ style: { textAlign: 'right' } }}
                        fullWidth
                        multiline
                        rows={4}
                        label="הערות"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions sx={{ margin: 2 }}>
                    <Button onClick={onClose}>ביטול</Button>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        color="primary"
                    >הוספה</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}
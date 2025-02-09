import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TableCell, TableRow, TableHead, Table, TableContainer, TableBody, Paper, Autocomplete
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import store from '../../store';
import '../../App.css';

const names = [
    'Chamonix',
    'Miage',
    'Les Contamines',
    'La Balme',
    'Bonhomme - Les Chapieux',
    'Motetts',
    'Elisabetta / Combal',
    'Courmayeur',
    'Bonatti / Arnuva / Elena',
    'la Fouly',
    'Champex',
    'Forclaz - Trient',
    'Tre le Champ',
    'Argentiere',
    'Lac Blanc',
    'Flegere',
    'Geneva',
];

const SortableItem = ({ id, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: isDragging ? '#f5f5f5' : undefined,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell {...attributes} {...listeners} style={{ cursor: 'grab', width: '40px' }}>
                ⋮⋮
            </TableCell>
            {children}
        </TableRow>
    );
};

export const AccommodationPreferences = observer(() => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        nightNo: store.newAccPreference.nightNo || 0,
        location: store.newAccPreference.location || '',
        firstOption: store.newAccPreference.firstOption || '',
        secondOption: store.newAccPreference.secondOption || '',
        thirdOption: store.newAccPreference.thirdOption || '',
        remarks: store.newAccPreference.remarks || ''
    });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10, // Minimum distance for drag activation
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (store.editingAccommodation) {
            setFormData({
                nightNo: store.editingAccommodation.nightNo,
                location: store.editingAccommodation.location,
                firstOption: store.editingAccommodation.firstOption,
                secondOption: store.editingAccommodation.secondOption,
                thirdOption: store.editingAccommodation.thirdOption,
                remarks: store.editingAccommodation.remarks
            });
            setOpen(true);
        }
    }, [store.editingAccommodation]);

    const handleClickOpen = () => {
        setOpen(true);
        setFormData(prev => ({ ...prev, nightNo: store.preferredAccommodationList.length + 1 }));
    };

    const handleLocationChange = (event, newLocation) => {
        setFormData(prev => ({ ...prev, location: newLocation || '' }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (store.editingAccommodation) {
            store.updateAccommodationPreference(formData);
        } else {
            store.addAccommodationPreference(formData);
        }
        onClose();
    };

    const onClose = () => {
        setOpen(false);
        store.cancelEditingAccommodation();
        setFormData({
            nightNo: 0,
            location: '',
            firstOption: '',
            secondOption: '',
            thirdOption: '',
            remarks: ''
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!active || !over) return;  // Guard clause for null values

        if (active.id !== over.id) {
            const oldIndex = store.preferredAccommodationList.findIndex((item) => item.nightNo === active.id);
            const newIndex = store.preferredAccommodationList.findIndex((item) => item.nightNo === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {  // Additional check to ensure valid indices
                store.reorderAccommodationPreferences(oldIndex, newIndex);
            }
        }
    };

    return (
        <>
            <Button
                sx={{
                    color: '#cd5c5c',
                    borderColor: "#cd5c5c"
                }}
                variant="outlined"
                onClick={handleClickOpen}
            >
                הוספת לילה
            </Button>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{ direction: 'rtl' }}>
                    {store.editingAccommodation ? 'עריכת העדפות לינה' : `העדפות לינה - לילה ${formData.nightNo}`}
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        disablePortal
                        autoFocus
                        fullWidth
                        id="location"
                        options={names}
                        value={formData.location}
                        onChange={handleLocationChange}
                        renderInput={(params) => (
                            <TextField {...params} label="מקום לינה * " name="location" />
                        )}
                        sx={{ width: 550, marginTop: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="העדפה ראשונה"
                        name="firstOption"
                        value={formData.firstOption}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="העדפה שניה"
                        name="secondOption"
                        value={formData.secondOption}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="העדפה שלישית"
                        name="thirdOption"
                        value={formData.thirdOption}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="הערות"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        margin="normal"
                        inputProps={{ style: { textAlign: 'right' } }}
                    />
                </DialogContent>
                <DialogActions sx={{ margin: 2 }}>
                    <Button onClick={onClose}>ביטול</Button>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        color="primary"
                        disabled={!formData.location}  // Disable if no location is selected
                    >
                        {store.editingAccommodation ? 'עדכון' : 'הוספה'}
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainer
                sx={{
                    width: '35em',
                    marginTop: 5,
                    overflowY: 'auto',
                    height: '90%',
                    overflow: 'scroll'
                }}
                component={Paper}
            >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '40px' }}></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">הערות</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">העדפה שלישית</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">העדפה שניה</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">העדפה ראשונה</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">מיקום</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">מספר לילה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={store.preferredAccommodationList.map(item => item.nightNo)}
                                strategy={verticalListSortingStrategy}
                            >
                                {store.preferredAccommodationList.map((row) => (
                                    <SortableItem key={row.nightNo} id={row.nightNo}>
                                        <TableCell>
                                            <Button
                                                sx={{ paddingTop: 1.5 }}
                                                variant='text'
                                                onClick={() => store.removeAccommodationPreference(row.nightNo)}
                                            >
                                                הסר
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{ paddingTop: 1.5 }}
                                                variant='text'
                                                onClick={() => store.editAccommodationPreference(row)}
                                            >
                                                ערוך
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">{row.remarks}</TableCell>
                                        <TableCell align="right">{row.thirdOption}</TableCell>
                                        <TableCell align="right">{row.secondOption}</TableCell>
                                        <TableCell align="right">{row.firstOption}</TableCell>
                                        <TableCell align="right">{row.location}</TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                            {row.nightNo}
                                        </TableCell>
                                    </SortableItem>
                                ))}
                            </SortableContext>
                        </DndContext>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
});

export default AccommodationPreferences;
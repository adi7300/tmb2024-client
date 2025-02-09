import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { observer } from 'mobx-react';
import store from '../../store';
import '../../App.css';

export function PaxList() {
  return (
    <>
      <AddNewPaxForm />
      <PaxDetailsListObserver />
    </>
  );
}

const AddNewPaxForm = () => {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    contactPerson: store.newPax.contactPerson || false,
    name: store.newPax.name || '',
    phone: store.newPax.phone || '',
    email: store.newPax.email || '',
    diet: store.newPax.diet || 'none',
    birthDate: store.newPax.birthDate || null,
    remarks: store.newPax.remarks || '',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'שם הוא שדה חובה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // מחזיר true אם אין שגיאות
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'contactPerson') {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
    } else setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const uniqueID = `pax-${Math.random().toString(36).substring(7)}`;
    const newPax = { id: uniqueID, ...formData };

    store.addPax(newPax);

    setFormData({
      contactPerson: false,
      name: '',
      phone: '',
      email: '',
      remarks: '',
      diet: 'none',
      birthDate: null,
    });

    setErrors({});
    onClose();
  };

  const onClose = () => {
    setOpen(false);
    setErrors({});
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button
        sx={{
          color: '#cd5c5c',
          borderColor: "#cd5c5c"
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >הוספת פרטי נוסע
      </Button>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ direction: 'rtl' }}>פרטי הנוסע</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={<Checkbox
              checked={formData.contactPerson}
              sx={{ marginLeft: 0 }}
            />}
            label="איש קשר"
            labelPlacement="start"
            name="contactPerson"
            onChange={handleInputChange}
            sx={{ display: 'flex', direction: 'ltr' }}
          />
          <TextField
            label="שם מלא (באנגלית)"
            autoFocus
            fullWidth
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            margin="dense"
            variant="outlined"
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label='מספר טלפון'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label='אימייל'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            margin="dense"
          />
          <InputLabel id="diet">העדפות מזון</InputLabel>
          <Select
            fullWidth
            label='העדפות מזון'
            name='diet'
            value={formData.diet}
            onChange={handleInputChange}
            margin="dense"
          >
            <MenuItem defaultValue={'none'} value='none'>ללא העדפות</MenuItem>
            <MenuItem value='vegetarian'>צמחוני</MenuItem>
            <MenuItem value='vegan'>טבעוני</MenuItem>
            <MenuItem value='no-pork'>ללא חזיר</MenuItem>
            <MenuItem value='gluten-free'>רגישות לגלוטן</MenuItem>
          </Select>
          <InputLabel id="birthDate">תאריך לידה</InputLabel>

          <DatePicker
            value={formData.birthDate}
            onChange={(newValue) => {
              setFormData(prev => ({ ...prev, birthDate: newValue }));
            }}
            format="DD/MM/YYYY"
            minDate={dayjs('1950-01-01')}
            maxDate={dayjs('2025-12-31')}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "dense",
                dir: "rtl",
                sx: {
                  '& .MuiInputAdornment-root': {
                    position: 'absolute',
                    right: '8px',
                    height: '100%',
                    maxHeight: 'none',
                    top: 0,
                    marginTop: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    paddingRight: '36px',
                    '& input': {
                      textAlign: 'right'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    right: '36px',
                    left: 'unset',
                    transformOrigin: 'right'
                  }
                }
              }
            }}
            views={['year', 'month', 'day']}
            openTo="year"
          />
          <TextField
            inputProps={{ style: { textAlign: 'right' } }}
            fullWidth
            multiline
            rows={4}
            label='הערות עבור נוסע זה'
            name='remarks'
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
      </Dialog>
    </LocalizationProvider>
  );
};

const PaxDetailsListObserver = observer(PaxDetailsList);

function PaxDetailsList() {
  return (
    <TableContainer sx={{
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
            <TableCell style={{ fontWeight: 'bold' }} align="right">הערות</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">תאריך לידה</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">העדפות אוכל</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">אימייל</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">מספר טלפון</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">שם מלא (באנגלית)</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">איש קשר</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.paxList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Button
                  sx={{ paddingTop: 1.5 }}
                  variant='text'
                  onClick={() => store.removePax(row.id)}
                >הסר
                </Button>
              </TableCell>
              <TableCell align="right">{row.remarks}</TableCell>
              <TableCell align="right">
                {row.birthDate ? dayjs(row.birthDate).format('DD/MM/YYYY') : ''}
              </TableCell>
              <TableCell align="right">{row.diet}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right" component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right" component="th" scope="row">
                <Checkbox
                  checked={row.contactPerson}
                  disabled
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PaxList;
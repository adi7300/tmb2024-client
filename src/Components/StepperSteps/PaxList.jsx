import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({
    contactPerson: false,
    name: '',
    phone: '',
    email: '',
    diet: 'none',
    remarks: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'contactPerson') {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
    } else setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
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
    });

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
      </Dialog >
    </>
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

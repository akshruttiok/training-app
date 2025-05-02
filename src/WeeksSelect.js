import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const WeeksSelect = ({ weeks, setWeeks }) => {
  const weekOptions = [1, 2, 3, 4, 5, 6];

  return (
    <TextField
      select
      label="Select Number of Weeks"
      value={weeks}
      onChange={(e) => setWeeks(e.target.value)}
      variant="outlined"
      fullWidth
      helperText="Each week is 5 working days, 8 hours per day"
    >
      {weekOptions.map((week) => (
        <MenuItem key={week} value={week}>
          {week}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default WeeksSelect;

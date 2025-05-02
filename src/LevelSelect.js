import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const LevelSelect = ({ level, setLevel }) => {
  const levels = ['Basic', 'Intermediate', 'Advanced'];

  return (
    <TextField
      select
      label="Select Level"
      value={level}
      onChange={(e) => setLevel(e.target.value)}
      variant="outlined"
      fullWidth
    >
      {levels.map((lvl) => (
        <MenuItem key={lvl} value={lvl}>
          {lvl}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default LevelSelect;

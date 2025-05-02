import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const TechnologySelect = ({ technology, setTechnology }) => {
  const technologies = ['Python', 'Salesforce', 'SAP', 'C++', 'DSA', 'React', 'JavaScript'];

  return (
    <TextField
      select
      label="Select Technology"
      value={technology}
      onChange={(e) => setTechnology(e.target.value)}
      variant="outlined"
      fullWidth
    >
      {technologies.map((tech) => (
        <MenuItem key={tech} value={tech}>
          {tech}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default TechnologySelect;

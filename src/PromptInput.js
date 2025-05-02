import React from 'react';
import { TextField } from '@mui/material';

const PromptInput = ({ prompt }) => {
  return (
    <TextField
      label="Generated Prompt"
      value={prompt}
      variant="outlined"
      fullWidth
      multiline
      rows={4}
      disabled
    />
  );
};

export default PromptInput;

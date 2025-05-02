import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import TechnologySelect from './TechnologySelect';
import LevelSelect from './LevelSelect';
import WeeksSelect from './WeeksSelect';
import PromptInput from './PromptInput';
import ReactMarkdown from 'react-markdown';

function App() {
  const [technology, setTechnology] = useState('');
  const [level, setLevel] = useState('');
  const [weeks, setWeeks] = useState('');
  const [prompt, setPrompt] = useState('');
  const [trainingPlan, setTrainingPlan] = useState('');

  useEffect(() => {
    if (technology && level && weeks) {
      setPrompt(`Create a training plan on ${technology}, for ${level} level, for ${weeks} weeks (each week is 5 working days, 8 hours per day) in a structured way and give the resources to study those topics.`);
    }
  }, [technology, level, weeks]);

  const handleGeneratePlan = async () => {
    const requestBody = {
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o-mini',
      max_tokens: 4096,
    };

    try {
      const response = await fetch('https://cfgai.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2023-05-15', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key':process.env.REACT_APP_OPENAI_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errorDetails}`);
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      setTrainingPlan(reply ?? 'No response received from the model.');
    } catch (error) {
      console.error('Error:', error);
      setTrainingPlan('Error generating training plan');
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Training Plan Generator
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <TechnologySelect technology={technology} setTechnology={setTechnology} />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <LevelSelect level={level} setLevel={setLevel} />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <WeeksSelect weeks={weeks} setWeeks={setWeeks} />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <PromptInput prompt={prompt} />
        </Box>
        <Button variant="contained" color="primary" onClick={handleGeneratePlan} disabled={!prompt}>
          Generate Training Plan
        </Button>
        {trainingPlan && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Training Plan:</Typography>
            <ReactMarkdown>{trainingPlan}</ReactMarkdown>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default App;

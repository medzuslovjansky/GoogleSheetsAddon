import React, { useCallback, useContext } from 'react';
import * as razumlivost from '@interslavic/razumlivost';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Typography,
  Paper,
} from '@mui/material';
import RecordNavigation from '../common/components/RecordNavigation';
import SheetsPositionContext from '../common/contexts/SheetsPositionContext';

const stepsISV = [
  {
    label: 'mlåt',
    description: '',
    alternatives: [],
  },
  {
    label: 'molot',
    description: 'ORO-OLO',
    alternatives: ['mlat'],
  },
  {
    label: 'молот',
    description: 'Cyrillization',
    alternatives: ['млат'],
  },
];

const stepsNational = [
  {
    label: 'молот',
    description: 'Translation',
    alternatives: [],
  },
];

const DictionarySidebar = () => {
  const sheetsPosition = useContext(SheetsPositionContext);

  // read rules from language
  // create flavorizator if new language
  // process current record and the corresponding language translation
  // compare
  // display the transformations

  const [activeStepISV, setActiveStepISV] = React.useState(NaN);
  const [activeStepNational, setActiveStepNational] = React.useState(NaN);

  const renderStep = setter => {
    return (step, index) => {
      const handleStep = useCallback(() => setter(index), [setter, index]);

      return (
        <Step key={step.label} onClick={handleStep}>
          <StepButton sx={{ textAlign: 'left' }}>
            <Typography>{step.label}</Typography>
          </StepButton>
          <StepContent>
            <Typography variant="subtitle2">{step.description}</Typography>
            {step.alternatives.map((text, idx) => (
              <Typography key={`alternative_${idx}`} variant="body2">
                {text}
              </Typography>
            ))}
          </StepContent>
        </Step>
      );
    };
  };

  return (
    <Box>
      <RecordNavigation
        currentIndex={sheetsPosition.position.range?.rowIndex}
        goFirst={sheetsPosition.navigate.first}
        goPrevious={sheetsPosition.navigate.previous}
        goIndex={sheetsPosition.navigate.index}
        goNext={sheetsPosition.navigate.next}
        goLast={sheetsPosition.navigate.last}
      />
      <Box my={2}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel id="select-language">Target language</InputLabel>
          <Select labelId="select-language">
            <MenuItem value="ru">Russian</MenuItem>
            <MenuItem value="uk">Ukrainian</MenuItem>
            <MenuItem value="pl">Polish</MenuItem>
            <MenuItem value="cs">Czech</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box my={2}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel id="select-language">Flavorization level</InputLabel>
          <Select labelId="select-language">
            <MenuItem value="E">Etymological</MenuItem>
            <MenuItem value="S">Standard</MenuItem>
            <MenuItem value="M">Mistaken</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Paper variant="outlined">
        <Box p={2}>
          <Typography variant="body1">Distance:</Typography>
          <Typography
            variant="body1"
            sx={{ color: theme => theme.palette.primary.main }}
          >
            0
          </Typography>
        </Box>
      </Paper>
      <Typography py={2} variant="subtitle1">
        Interslavic transformation
      </Typography>
      <Stepper nonLinear activeStep={activeStepISV} orientation="vertical">
        {stepsISV.map(renderStep(setActiveStepISV))}
      </Stepper>
      <Typography py={2} variant="subtitle1">
        National transformation
      </Typography>
      <Stepper nonLinear activeStep={activeStepNational} orientation="vertical">
        {stepsNational.map(renderStep(setActiveStepNational))}
      </Stepper>
    </Box>
  );
};

export default DictionarySidebar;

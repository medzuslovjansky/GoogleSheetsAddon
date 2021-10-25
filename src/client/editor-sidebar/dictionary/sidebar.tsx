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
  SelectChangeEvent,
} from '@mui/material';
import RecordNavigation from '../common/components/RecordNavigation';
import SheetsPositionContext from '../common/contexts/SheetsPositionContext';
import buildSheetName from '../../../common/buildSheetName';
import server from '../../utils/server';
import { FlavorizationRuleDTO } from '../../../../../razumlivost/dist/types';

// const stepsISV = [
//   {
//     label: 'mlåt',
//     description: '',
//     alternatives: [],
//   },
//   {
//     label: 'molot',
//     description: 'ORO-OLO',
//     alternatives: ['mlat'],
//   },
//   {
//     label: 'молот',
//     description: 'Cyrillization',
//     alternatives: ['млат'],
//   },
// ];
//
// const stepsNational = [
//   {
//     label: 'молот',
//     description: 'Translation',
//     alternatives: [],
//   },
// ];

const DictionarySidebar = () => {
  const sheetsContext = useContext(SheetsPositionContext);

  // read rules from language
  // create flavorizator if new language
  // process current record and the corresponding language translation
  // compare
  // display the transformations

  const [error, setError] = React.useState(null);
  const [lang, setLang] = React.useState('');
  const onLanguageChange = useCallback(
    (e: SelectChangeEvent) => {
      setLang(e.target.value);
    },
    [setLang]
  );
  const [flavorizationLevel, setFlavorizationLevel] = React.useState('');
  const onFlavorizationLevelChange = useCallback(
    (e: SelectChangeEvent) => {
      setFlavorizationLevel(e.target.value);
    },
    [setFlavorizationLevel]
  );

  const [flavorizator, setFlavorizator] = React.useState(null);
  const [activeStepISV, setActiveStepISV] = React.useState();
  // const [activeStepNational, setActiveStepNational] = React.useState(NaN);

  React.useEffect(() => {
    if (lang) {
      const sheetName = buildSheetName('flavorization', lang);
      server.serverFunctions
        .getSheetRecords(sheetName, {})
        .then(rawRecords => {
          const rules = rawRecords
            .filter(r => r.match && r.name)
            .map(razumlivost.mapFlavorizationRule);

          setFlavorizator({ rules });
        })
        .catch(e => setError(e));
    }
  }, [lang]);

  const renderStep = setter => {
    return function FlavorizationStep(step: FlavorizationRuleDTO, index) {
      const handleStep = () => setter(index);

      return (
        <Step key={index} onClick={handleStep}>
          <StepButton sx={{ textAlign: 'left' }}>
            <Typography>{step.name}</Typography>
          </StepButton>
          <StepContent>
            <Typography variant="subtitle2">
              {step.flavorizationLevel}
            </Typography>
            {step.replacements.map((text, idx) => (
              <Typography key={`alternative_${idx}`} variant="body2">
                {text}
              </Typography>
            ))}
          </StepContent>
        </Step>
      );
    };
  };

  const result = (
    <Box>
      <RecordNavigation
        currentIndex={sheetsContext.position.range?.rowIndex}
        goFirst={sheetsContext.navigate.first}
        goPrevious={sheetsContext.navigate.previous}
        goIndex={sheetsContext.navigate.index}
        goNext={sheetsContext.navigate.next}
        goLast={sheetsContext.navigate.last}
      />
      <Box my={2}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel id="select-language">Target language</InputLabel>
          <Select
            value={lang}
            onChange={onLanguageChange}
            labelId="select-language"
          >
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
          <Select
            value={flavorizationLevel}
            onChange={onFlavorizationLevelChange}
            labelId="select-language"
          >
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
        {flavorizator && flavorizator.rules.map(renderStep(setActiveStepISV))}
      </Stepper>
      <Typography py={2} variant="subtitle1">
        National transformation
      </Typography>
    </Box>
  );

  // if (error) {
  //   throw error;
  // }

  return result;
};

export default DictionarySidebar;

// {/*<Stepper nonLinear activeStep={activeStepNational} orientation="vertical">*/}
// {/*  {stepsNational.map(renderStep(setActiveStepNational))}*/}
// {/*</Stepper>*/}

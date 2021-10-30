import React, { useContext } from 'react';
import * as razumlivost from '@interslavic/razumlivost';
import {
  FlavorizationIntermediate,
  FlavorizationLevel,
  FlavorizationTable,
  LanguageKey,
  TranslationAnalysis,
} from '@interslavic/razumlivost';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Typography,
} from '@mui/material';
import RecordNavigation from '../common/components/RecordNavigation';
import SheetsPositionContext from '../common/contexts/SheetsPositionContext';
import buildSheetName from '../../../common/buildSheetName';
import server from '../../utils/server';

type FlavorizationStepperProps = {
  last: FlavorizationIntermediate;
  level: keyof typeof FlavorizationLevel;
};

const FlavorizationStepper = (props: FlavorizationStepperProps) => {
  const [index, setIndex] = React.useState<number>();

  function FlavorizationStep(
    step: FlavorizationIntermediate,
    stepIndex: number
  ) {
    const alternatives = step.via.owner
      .apply(step.parent)
      .filter(i => !i.equals(step));

    return (
      <Step
        key={stepIndex}
        active={index === stepIndex}
        onClick={() => setIndex(index)}
      >
        <StepButton sx={{ textAlign: 'left' }}>
          <Typography variant="body2">{step.value}</Typography>
        </StepButton>
        <StepContent>
          <Typography variant="subtitle2">
            <Typography>
              {step.via.owner.comment} (#${step.via.index})
            </Typography>
            {alternatives.map((a, i) => (
              <Typography key={`alternative_${i}`} variant="body2">
                {a.value}
              </Typography>
            ))}
          </Typography>
        </StepContent>
      </Step>
    );
  }

  if (!props.last) {
    return null;
  }

  const steps = [...props.last.chain()];
  return (
    <Stepper nonLinear orientation="vertical">
      {steps.map(FlavorizationStep)}
    </Stepper>
  );
};

type LanguagePickerProps = {
  value: LanguageKey;
  onChange: (value: LanguageKey) => void;
  label: string;
};

const LanguagePicker = (props: LanguagePickerProps) => {
  return (
    <FormControl variant="outlined" fullWidth size="small">
      <InputLabel id="select-language">{props.label}</InputLabel>
      <Select
        value={props.value}
        onChange={e => props.onChange(e.target.value as LanguageKey)}
        labelId="select-language"
      >
        <MenuItem value="ru">Russian</MenuItem>
        <MenuItem value="uk">Ukrainian</MenuItem>
        <MenuItem value="pl">Polish</MenuItem>
        <MenuItem value="cs">Czech</MenuItem>
      </Select>
    </FormControl>
  );
};

type AllowedFlavorizationLevel = 'Mistaken' | 'Standard' | 'Etymological';
type FlavorizationPickerProps = {
  value: AllowedFlavorizationLevel;
  onChange: (value: AllowedFlavorizationLevel) => void;
  label: string;
};

const FlavorizationPicker = (props: FlavorizationPickerProps) => {
  return (
    <FormControl variant="outlined" fullWidth size="small">
      <InputLabel id="select-language">{props.label}</InputLabel>
      <Select
        value={props.value}
        onChange={e =>
          props.onChange(e.target.value as AllowedFlavorizationLevel)
        }
        labelId="select-language"
      >
        <MenuItem value="Etymological">Etymological</MenuItem>
        <MenuItem value="Standard">Standard</MenuItem>
        <MenuItem value="Mistaken">Mistaken</MenuItem>
      </Select>
    </FormControl>
  );
};

const DictionarySidebar = () => {
  const sheetsContext = useContext(SheetsPositionContext);
  const [error, setError] = React.useState(null);
  const [flavorizationTable, setFlavorizationTable] = React.useState<
    FlavorizationTable
  >();
  const [targetLanguage, setTargetLanguage] = React.useState<LanguageKey>();
  const [flavorizationLevel, setFlavorizationLevel] = React.useState<
    AllowedFlavorizationLevel
  >();

  React.useEffect(() => {
    if (targetLanguage) {
      const sheetName = buildSheetName('flavorization', targetLanguage);
      server.serverFunctions
        .getSheetRecords(sheetName, {})
        .then(rawRecords => {
          const rules = rawRecords
            .map(raw => new razumlivost.FlavorizationRuleDTO(raw))
            .filter(r => !r.disabled)
            .map(dto => new razumlivost.FlavorizationRule(dto));

          setFlavorizationTable(new razumlivost.FlavorizationTable(rules));
        })
        .catch(e => setError(e));
    }
  }, [targetLanguage]);

  let analysis: TranslationAnalysis;

  if (flavorizationTable && flavorizationLevel && targetLanguage) {
    const dto = new razumlivost.WordsDTO(sheetsContext.position.record);
    const translationContext = new razumlivost.TranslationContext(
      dto,
      targetLanguage
    );

    analysis = flavorizationTable.analyzeTranslations(
      translationContext,
      flavorizationLevel as any
    );
  }

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
        <LanguagePicker
          value={targetLanguage}
          onChange={setTargetLanguage}
          label={'Target language:'}
        />
      </Box>
      <Box my={2}>
        <FlavorizationPicker
          value={flavorizationLevel}
          onChange={setFlavorizationLevel}
          label={'Flavorization Level:'}
        />
      </Box>
      <Paper variant="outlined">
        <Box p={2}>
          <Typography variant="body1">Distance:</Typography>
          <Typography
            variant="body1"
            sx={{ color: theme => theme.palette.primary.main }}
          >
            {analysis?.matches[0]?.distance.absolute} chars (
            {analysis?.matches[0]?.distance.percent}%)
          </Typography>
        </Box>
      </Paper>
      <Typography py={2} variant="subtitle1">
        Interslavic transformation
      </Typography>
      <FlavorizationStepper
        last={analysis?.matches[0]?.interslavic}
        level={flavorizationLevel}
      />
      <Typography py={2} variant="subtitle1">
        National transformation
      </Typography>
      <FlavorizationStepper
        last={analysis?.matches[0]?.national}
        level={flavorizationLevel}
      />
    </Box>
  );

  if (error) {
    throw error;
  }

  return result;
};

export default DictionarySidebar;

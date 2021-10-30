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
  reverse?: boolean;
};

const FlavorizationStepper = (props: FlavorizationStepperProps) => {
  const [index, setIndex] = React.useState<number>();

  function FlavorizationStep(
    step: FlavorizationIntermediate,
    stepIndex: number
  ) {
    const alternatives = step.via
      ? step.via.owner.apply(step.parent).filter(i => !i.equals(step))
      : [];

    const ruleName = step.via ? `${step.via.owner.comment}` : '';

    return (
      <Step
        key={stepIndex}
        active={index === stepIndex}
        onClick={() => setIndex(stepIndex)}
      >
        <StepButton sx={{ textAlign: 'left' }}>
          <Typography variant="body2">{step.value}</Typography>
        </StepButton>
        <StepContent>
          {ruleName && (
            <Typography key="ruleName" variant="subtitle2">
              {ruleName}
            </Typography>
          )}
          {alternatives.map((a, i) => (
            <Typography key={`alternative_${i}`} variant="body2">
              {a.value}
            </Typography>
          ))}
        </StepContent>
      </Step>
    );
  }

  if (!props.last) {
    return null;
  }

  const steps = [...props.last.chain()];
  if (props.reverse) {
    steps.reverse();
  }

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
        <MenuItem value="be">Belarusian</MenuItem>
        <MenuItem value="uk">Ukrainian</MenuItem>
        <MenuItem value="pl">Polish</MenuItem>
        <MenuItem value="cs">Czech</MenuItem>
        <MenuItem value="sk">Slovak</MenuItem>
        <MenuItem value="bg">Bulgarian</MenuItem>
        <MenuItem value="mk">Macedonian</MenuItem>
        <MenuItem value="sr">Serbian</MenuItem>
        <MenuItem value="hr">Croatian</MenuItem>
        <MenuItem value="sl">Slovenian</MenuItem>
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

const getLanguageByColumn = (a1Notation: string): LanguageKey => {
  switch (a1Notation[0]) {
    case 'I':
      return 'ru';
    case 'J':
      return 'be';
    case 'K':
      return 'uk';
    case 'L':
      return 'pl';
    case 'M':
      return 'cs';
    case 'N':
      return 'sk';
    case 'O':
      return 'bg';
    case 'P':
      return 'mk';
    case 'Q':
      return 'sr';
    case 'R':
      return 'hr';
    case 'S':
      return 'sl';
    default:
      return undefined;
  }
};

const DictionarySidebar = () => {
  const sheetsContext = useContext(SheetsPositionContext);
  const [error, setError] = React.useState(null);
  const [flavorizationTables, setFlavorizationTables] = React.useState<
    Record<string, FlavorizationTable>
  >({});
  const columnLanguage = getLanguageByColumn(
    sheetsContext.position.range.a1Notation
  );
  const [targetLanguage, setTargetLanguage] = React.useState<LanguageKey>(columnLanguage || 'ru');

  const [flavorizationLevel, setFlavorizationLevel] = React.useState<
    AllowedFlavorizationLevel
  >('Etymological');

  React.useEffect(() => {
    if (targetLanguage) {
      const sheetName = buildSheetName('flavorization', targetLanguage);
      server.serverFunctions
        .getSheetRecords(sheetName, {})
        .then(rawRecords => {
          const rules = rawRecords
            .map(raw => new razumlivost.FlavorizationRuleDTO(raw))
            .filter(r => !r.disabled && r.name)
            .map(dto => new razumlivost.FlavorizationRule(dto));

          setFlavorizationTables({
            ...flavorizationTables,
            [columnLanguage]: new razumlivost.FlavorizationTable(rules),
          });
        })
        .catch(e => setError(e));
    }
  }, [targetLanguage]);

  let analysis: TranslationAnalysis;

  if (
    flavorizationTables[targetLanguage] &&
    flavorizationLevel &&
    targetLanguage
  ) {
    const dto = new razumlivost.WordsDTO(sheetsContext.position.record);
    const translationContext = new razumlivost.TranslationContext(
      dto,
      targetLanguage
    );

    analysis = flavorizationTables[targetLanguage].analyzeTranslations(
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
        reverse
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

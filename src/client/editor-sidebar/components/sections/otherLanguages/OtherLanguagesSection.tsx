import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';
import TranslationListItem from './TranslationListItem';
import useI18N from '../../../hooks/delegated/useI18N';

const useStyles = makeStyles(() => ({
  section: {
    marginTop: '1em',
  },
  sectionHeader: {
    minHeight: 'initial !important',
  },
  sectionHeaderContent: {
    marginTop: '0 !important',
    marginBottom: '0 !important',
  },
  accordionDetails: {
    flexWrap: 'wrap',
  },
  listPadding: {
    paddingTop: 0,
  },
}));

const LANGS = [
  'en',
  'ru',
  'be',
  'uk',
  'pl',
  'cs',
  'sk',
  'bg',
  'mk',
  'sr',
  'hr',
  'sl',
  'cu',
  'de',
  'nl',
  'eo',
];

const OtherLanguagesSection = ({ record }) => {
  const i18n = useI18N();
  const styles = useStyles();

  if (!record) {
    return null;
  }

  return (
    <Accordion variant="outlined" className={styles.section}>
      <AccordionSummary
        classes={{
          root: styles.sectionHeader,
          content: styles.sectionHeaderContent,
        }}
        expandIcon={<ExpandMore />}
      >
        <Typography variant="overline">
          {i18n('UI_OTHER_LANGUAGES_HEADER')}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        <List classes={{ padding: styles.listPadding }} dense={true}>
          {LANGS.map(lang => (
            <TranslationListItem
              key={lang}
              id={record.id}
              lang={lang}
              text={record.lemma}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default OtherLanguagesSection;

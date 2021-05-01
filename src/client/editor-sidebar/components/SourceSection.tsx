import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import useI18N from '../hooks/delegated/useI18N';
import { parse } from '@interslavic/steen-utils';
import verbalizePartOfSpeech from '../utils/verbalizePartOfSpeech';
import { partOfSpeech } from '@interslavic/steen-utils/dist/parse';
import useCurrentRecord from '../hooks/delegated/useCurrentRecord';

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: '1em',
  },
  accordionDetails: {
    flexWrap: 'wrap',
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  line: {
    width: '100%',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: '1em',
    right: '1em',
  },
}));

type SourceSectionProps = {
  lemma: string;
  partOfSpeech: string;
};

const SourceSection = (props: SourceSectionProps) => {
  const styles = useStyles();
  const i18n = useI18N();
  const record = useCurrentRecord();
  if (!record) {
    return null;
  }

  const [pos, posAnnotations] = verbalizePartOfSpeech(
    parse.partOfSpeech(record?.partOfSpeech)
  );

  return (
    <Card className={styles.section} variant="outlined">
      <CardContent>
        <Typography variant="overline" component="h2">
          {i18n('UI_INTERSLAVIC_CARD_HEADER')}
        </Typography>
        <Typography variant="h5">{props.lemma}</Typography>
        <Typography variant="body2" gutterBottom color="textSecondary">
          {i18n(pos)}
          {posAnnotations.length > 0 ? (
            <i>({posAnnotations.map(i18n).join(', ')})</i>
          ) : (
            ''
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SourceSection;

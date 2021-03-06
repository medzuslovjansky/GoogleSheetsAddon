import React, { useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import { Launch, Warning } from '@material-ui/icons';
import { parse } from '@interslavic/steen-utils';
import useI18N from '../../hooks/delegated/useI18N';
import verbalizePartOfSpeech from '../../utils/verbalizePartOfSpeech';
import useNavigation from '../../hooks/delegated/useNavigation';
import { SheetsPositionLike } from '../../../../common/serverTypes';
import buildSheetName from '../../../../common/buildSheetName';

const titleTypographyProps: TypographyProps = {
  variant: 'overline',
};

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: theme.spacing(1),
  },
  sectionHeader: {
    paddingBottom: 0,
  },
  sectionBody: {
    paddingTop: 0,
  },
}));

type SourceSectionProps = {
  record: SheetsPositionLike['isv'];
};

const SourceSection = (props: SourceSectionProps) => {
  const styles = useStyles();
  const i18n = useI18N();
  const gotoId = useNavigation().id;
  const isv = props.record;

  if (!isv) {
    return null;
  }

  const partOfSpeech = parse.partOfSpeech(isv.partOfSpeech);
  const [pos, posAnnotations] = verbalizePartOfSpeech(partOfSpeech);
  const synset = parse.synset(isv.lemma, {
    isPhrase: partOfSpeech.name === 'phrase',
  });
  const isDebatable = synset.meta.debatable;
  synset.meta.autogenerated = false;
  synset.meta.debatable = false;

  const focusOnTheWord = useCallback(() => {
    gotoId(isv.id, buildSheetName('vocabulary'));
  }, [gotoId, isv.id]);

  return (
    <Card className={styles.section} variant="outlined">
      <CardHeader
        className={styles.sectionHeader}
        title={i18n('UI_INTERSLAVIC_CARD_HEADER')}
        titleTypographyProps={titleTypographyProps}
        action={
          <IconButton aria-label="Focus on the word" onClick={focusOnTheWord}>
            <Launch />
          </IconButton>
        }
      />
      <CardContent className={styles.sectionBody}>
        <Typography key="lemma" variant="h5">
          {synset.toString()}
        </Typography>
        {isDebatable && (
          <Typography key="debatable" variant="caption" color="secondary">
            <Warning fontSize="inherit" />
            {i18n('UI_META_DEBATABLE')}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary">
          {i18n(pos)}
        </Typography>
        {posAnnotations.length > 0 && (
          <Typography variant="subtitle2" color="textSecondary">
            <i>({posAnnotations.map(i18n).join(', ')})</i>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SourceSection;

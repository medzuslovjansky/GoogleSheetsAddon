import {
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import React, { useCallback } from 'react';
import useNavigation from '../../../hooks/delegated/useNavigation';
import buildSheetName from '../../../../../common/buildSheetName';

const useStyles = makeStyles(theme => ({
  langButton: {
    minWidth: 0,
  },
  automaticTranslation: {
    color: theme.palette.error.main,
  },
}));

function TranslationListItem({ automatic = false, lang, id, text }) {
  const styles = useStyles();
  const navigate = useNavigation();
  const focusOnSheet = useCallback(() => {
    navigate.id(id, buildSheetName('translation', lang));
  }, [navigate.id, id, lang]);

  return (
    <ListItem disableGutters>
      <ListItemAvatar>
        <Button
          size="small"
          variant="outlined"
          onClick={focusOnSheet}
          className={styles.langButton}
        >
          {lang}
        </Button>
      </ListItemAvatar>
      <ListItemText
        primary={text || 'N/A'}
        className={(automatic && styles.automaticTranslation) || undefined}
      />
    </ListItem>
  );
}

export default React.memo(TranslationListItem);

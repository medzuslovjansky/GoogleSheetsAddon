import {
  Button,
  ButtonGroup,
  Container,
  OutlinedInput,
  TextField,
  withStyles,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from '@material-ui/icons';
import React, { KeyboardEventHandler, ReactEventHandler } from 'react';

type RecordNavigationProps = {
  currentIndex: number;

  goFirst: () => void;
  goPrevious: () => void;
  goIndex: (index: number) => void;
  goNext: () => void;
  goLast: () => void;
};

const ButtonGroupInput = withStyles(theme => ({
  root: {
    '&': {
      minWidth: '8ch',
    },
    '& .MuiInputBase-input': {
      padding: 0,
      textAlign: 'center',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light,
    },
  },
}))(OutlinedInput);

const RecordNavigation = (props: RecordNavigationProps) => {
  const [lastIndex, setLastIndex] = React.useState(props.currentIndex);
  const [localIndex, setLocalIndex] = React.useState(`${lastIndex}`);

  if (props.currentIndex !== lastIndex) {
    setLocalIndex(`${props.currentIndex}`);
    setLastIndex(props.currentIndex);
  }

  const onBlur = React.useCallback<ReactEventHandler>(() => {
    const index = Number(localIndex);
    if (index > 0 && index !== props.currentIndex) {
      props.goIndex(index);
    }
  }, [localIndex, props.currentIndex, props.goIndex]);

  const onKeyPress = React.useCallback<KeyboardEventHandler>(
    e => {
      if (e.key === 'Enter') {
        onBlur(e);
      }
    },
    [onBlur]
  );

  const onChange = React.useCallback<ReactEventHandler>(e => {
    const target = e.target as HTMLInputElement;
    setLocalIndex(target.value);
  }, []);

  return (
    <ButtonGroup variant="outlined" size="small" color="primary" fullWidth>
      <Button onClick={props.goFirst}>
        <FirstPage />
      </Button>
      <Button onClick={props.goPrevious}>
        <ChevronLeft />
      </Button>
      <ButtonGroupInput
        color={'primary'}
        value={localIndex}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
      />
      <Button onClick={props.goNext}>
        <ChevronRight />
      </Button>
      <Button onClick={props.goLast}>
        <LastPage />
      </Button>
    </ButtonGroup>
  );
};

export default React.memo<RecordNavigationProps>(RecordNavigation);

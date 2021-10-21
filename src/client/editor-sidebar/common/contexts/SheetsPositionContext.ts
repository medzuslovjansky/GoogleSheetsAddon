import noop from 'lodash/noop';
import React from 'react';
import SheetsPosition from '../utils/SheetsPosition';

export type NavigationCallbacks = {
  first: () => void;
  previous: () => void;
  index: (rowIndex: number) => void;
  id: (id: string, sheetName?: string) => void;
  next: () => void;
  last: () => void;
};

export type SheetsPositionContextData = {
  i18n: (key: string) => string;
  position: SheetsPosition;
  navigate: NavigationCallbacks;
};

const context = React.createContext<SheetsPositionContextData>({
  position: SheetsPosition.empty(),
  i18n: value => value,
  navigate: {
    first: noop,
    previous: noop,
    index: noop,
    id: noop,
    next: noop,
    last: noop,
  },
});

export default context;

import { useContext } from 'react';
import SheetsPositionContext from '../../contexts/SheetsPositionContext';

export default function useI18N() {
  return useContext(SheetsPositionContext).i18n;
}

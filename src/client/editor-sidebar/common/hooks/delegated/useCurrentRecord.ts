import { useContext } from 'react';
import SheetsPositionContext from '../../contexts/SheetsPositionContext';

export default function useCurrentRecord() {
  const { record, isv } = useContext(SheetsPositionContext).position;
  return { record, isv };
}

import { useContext } from 'react';
import SheetsPositionContext from '../../contexts/SheetsPositionContext';
import { SheetsPositionLike } from '../../../../common/serverTypes';

export default function useCurrentRecord() {
  return useContext(SheetsPositionContext).position.isv;
}

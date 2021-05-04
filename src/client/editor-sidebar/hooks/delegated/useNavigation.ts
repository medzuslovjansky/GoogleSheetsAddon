import { useContext } from 'react';
import SheetsPositionContext from '../../contexts/SheetsPositionContext';

export default function useNavigation() {
  return useContext(SheetsPositionContext).navigate;
}

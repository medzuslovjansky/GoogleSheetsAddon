import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';

// Expose public functions by attaching to `global`
global.onOpen = publicUiFunctions.onOpen;
global.openEditorSidebar = publicUiFunctions.openEditorSidebar;

global.getCurrentPosition = publicSheetFunctions.getCurrentPosition;
global.updateRow = publicSheetFunctions.updateRow;
global.moveCursor = publicSheetFunctions.moveCursor;
global.getSheetRecords = publicSheetFunctions.getSheetRecords;

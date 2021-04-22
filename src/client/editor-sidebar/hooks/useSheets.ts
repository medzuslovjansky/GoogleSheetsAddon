import { useCallback, useEffect, useMemo, useState } from 'react';
import server from '../../utils/server';
import SheetsPosition from '../utils/SheetsPosition';
import SheetsService from '../services/SheetsService';

export default function useSheets() {
  const [error, setError] = useState(false);
  const [position, setPosition] = useState(SheetsPosition.empty());
  const service = useMemo(() => {
    const result = new SheetsService({
      serverFunctions: server.serverFunctions,
      maxIdlePeriod: 1000,
    });

    result.onError = e => {
      setError(e);
    };

    result.onSelectionChange = p => {
      setError(null);
      setPosition(p);
    };

    return result;
  }, []);

  useEffect(() => {
    service.start();

    return () => {
      service.stop();
    };
  });

  const goFirst = useCallback(() => {
    return service.moveCursor({ rowIndex: 2 });
  }, []);

  const goPrevious = useCallback(() => {
    return service.moveCursor({ offset: -1 });
  }, []);

  const goNext = useCallback(() => {
    return service.moveCursor({ offset: 1 });
  }, []);

  const goLast = useCallback(() => {
    return service.moveCursor({ rowIndex: Number.MAX_SAFE_INTEGER });
  }, []);

  const goIndex = useCallback(
    (rowIndex: number) => service.moveCursor({ rowIndex }),
    []
  );

  const goId = useCallback(
    (sheetName: string, id: string) => service.moveCursor({ sheetName, id }),
    []
  );

  return {
    position,
    error,
    navigate: {
      first: goFirst,
      previous: goPrevious,
      index: goIndex,
      id: goId,
      next: goNext,
      last: goLast,
    },
  };
}

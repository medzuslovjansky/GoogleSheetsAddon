import { useCallback, useEffect, useMemo, useState } from 'react';
import server from '../../utils/server';

const { serverFunctions } = server;

export function useSelectedRecord() {
  const [row, setRow] = useState(null);
  const [error, setError] = useState(null);

  const onGetCurrentRowSuccess = useCallback(
    value => {
      setRow(value);
      setError(null);
    },
    [setRow, setError]
  );

  const onGetCurrentRowFailure = useCallback(
    reason => {
      setRow(null);
      setError(reason);
    },
    [setRow, setError]
  );

  useEffect(() => {
    const handle = setInterval(
      (onThen, onCatch) => {
        serverFunctions.getCurrentRow().then(onThen, onCatch);
      },
      1000,
      onGetCurrentRowSuccess,
      onGetCurrentRowFailure
    );

    return () => clearInterval(handle);
  });

  const record = useMemo(() => {
    return row && row.rowIndex > 1 ? row.values : null;
  }, [row?.sheet, row?.range, row?.values?.toString()]);

  return {
    record,
    error,
  };
}

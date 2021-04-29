import { useCallback, useEffect, useMemo, useState } from 'react';
import server from '../../utils/server';
import TranslationsService from '../services/TranslationsService';

type UseTranslationsOptions = {
  language: string | null;
};

export default function useTranslations(options: UseTranslationsOptions) {
  const [error, setError] = useState(null);
  const [translations, setTranslations] = useState(null);

  const service = useMemo(() => {
    return new TranslationsService({
      serverFunctions: server.serverFunctions,
    });
  }, []);

  useEffect(() => {
    setTranslations(null);
    service.loadI18N(options.language).then(setTranslations, setError);
  }, [options.language]);

  const i18n = useCallback(
    (key: string) => {
      return translations[key] || key;
    },
    [translations]
  );

  return {
    ready: error == null && translations != null,
    error,
    i18n,
  };
}

import { ServerFunctions } from '../../../common/serverTypes';
import buildSheetName from '../../../common/buildSheetName';

type TranslationsServiceConfig = {
  serverFunctions: ServerFunctions;
};

export default class TranslationsService {
  private readonly _serverFunctions: ServerFunctions;

  constructor(config: TranslationsServiceConfig) {
    this._serverFunctions = config.serverFunctions;
  }

  async loadI18N(language: string | null) {
    const records = await this._serverFunctions.getSheetRecords(
      buildSheetName('i18n'),
      {
        includeColumns: ['key', 'EN', language].filter(Boolean),
      }
    );

    return records.reduce((acc: Record<string, string>, value) => {
      acc[value.key] = value[language] || value.EN;
      return acc;
    }, {});
  }
}

import { SheetsService } from './SheetService';
import { ServerFunctions } from '../types/server';

describe('SheetService', () => {
  let service: SheetsService;
  let serverFunctions: jest.Mocked<ServerFunctions>;

  beforeEach(() => {
    jest.useFakeTimers('modern');

    serverFunctions = {
      getCurrentPosition: jest.fn().mockReturnValue(new Promise(() => {})),
      moveCursor: jest.fn().mockReturnValue(new Promise(() => {})),
      updateRow: jest.fn().mockReturnValue(new Promise(() => {})),
    };

    service = new SheetsService({
      serverFunctions,
      maxIdlePeriod: 1000,
    });
  });

  describe('when initialized', () => {
    beforeEach(() => {
      service = service.start();
    });

    it('should start fetching current record', () => {
      expect(serverFunctions.getCurrentPosition).toHaveBeenCalled();
    });
  });

  describe('when fetching current record', () => {
    describe('was asked to navigate', () => {
    });

    describe('was asked to fetch', () => {
      describe('and then navigate once more', () => {});

      describe('and then fetch once more', () => {});

      describe('and then update once more', () => {});
    });

    describe('was asked to update', () => {
      describe('and then navigate once more', () => {});

      describe('and then fetch once more', () => {});

      describe('and then update once more', () => {});
    });
  });

  describe('after successful fetching of a current record', () => {
    describe('if there are no pending operations', () => {
      it('should enter idle state', () => {});
    });

    describe('if there are pending operations', () => {
      it('should pick the next operation', () => {});
    });
  });

  describe('after failed fetching of a current record', () => {
    it('should schedule fetch operation in <N> ms', () => {});
  });

  describe('when gotten idle', () => {});

  describe('when navigating to another record', () => {});

  describe('when updating a record', () => {
    describe('was asked to navigate', () => {
      describe('and then navigate once more', () => {});

      describe('and then fetch once more', () => {});

      describe('and then update once more', () => {});
    });

    describe('was asked to fetch', () => {
      describe('and then navigate once more', () => {});

      describe('and then fetch once more', () => {});

      describe('and then update once more', () => {});
    });

    describe('was asked to update', () => {
      describe('and then navigate once more', () => {});

      describe('and then fetch once more', () => {});

      describe('and then update once more', () => {});
    });
  });
});

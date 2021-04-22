import noop from 'lodash/noop';
import SheetsService from './SheetsService';
import { ServerFunctions } from '../types/server';

describe('SheetsService', () => {
  let service: SheetsService;
  let serverFunctions: jest.Mocked<ServerFunctions>;

  beforeEach(() => {
    jest.useFakeTimers('modern');

    serverFunctions = {
      getCurrentPosition: jest.fn().mockReturnValue(new Promise(noop)),
      moveCursor: jest.fn().mockReturnValue(new Promise(noop)),
      updateRow: jest.fn().mockReturnValue(new Promise(noop)),
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
      it.todo('write a test');
    });

    describe('was asked to fetch', () => {
      describe('and then navigate once more', () => {
        it.todo('write a test');
      });

      describe('and then fetch once more', () => {
        it.todo('write a test');
      });

      describe('and then update once more', () => {
        it.todo('write a test');
      });
    });

    describe('was asked to update', () => {
      describe('and then navigate once more', () => {
        it.todo('write a test');
      });

      describe('and then fetch once more', () => {
        it.todo('write a test');
      });

      describe('and then update once more', () => {
        it.todo('write a test');
      });
    });
  });

  describe('after successful fetching of a current record', () => {
    describe('if there are no pending operations', () => {
      it.todo('should enter idle state');
    });

    describe('if there are pending operations', () => {
      it.todo('should pick the next operation');
    });
  });

  describe('after failed fetching of a current record', () => {
    it.todo('should schedule fetch operation in <N> ms');
  });

  describe('when gotten idle', () => {
    it.todo('write a test');
  });

  describe('when navigating to another record', () => {
    it.todo('write a test');
  });

  describe('when updating a record', () => {
    describe('was asked to navigate', () => {
      describe('and then navigate once more', () => {
        it.todo('write a test');
      });

      describe('and then fetch once more', () => {
        it.todo('write a test');
      });

      describe('and then update once more', () => {
        it.todo('write a test');
      });
    });

    describe('was asked to fetch', () => {
      describe('and then navigate once more', () => {
        it.todo('write a test');
      });

      describe('and then fetch once more', () => {
        it.todo('write a test');
      });

      describe('and then update once more', () => {
        it.todo('write a test');
      });
    });

    describe('was asked to update', () => {
      describe('and then navigate once more', () => {
        it.todo('write a test');
      });

      describe('and then fetch once more', () => {
        it.todo('write a test');
      });

      describe('and then update once more', () => {
        it.todo('write a test');
      });
    });
  });
});

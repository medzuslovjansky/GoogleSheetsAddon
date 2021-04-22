import SheetsPosition from '../utils/SheetsPosition';
import {
  MoveCursorOptions,
  ServerFunctions,
  SheetsPositionLike,
  UpdateRowOptions,
} from '../types/server';
import Deferred from '../utils/Deferred';

type SheetsServiceConfig = {
  maxIdlePeriod: number;
  serverFunctions: ServerFunctions;
};

export default class SheetsService {
  private readonly _serverFunctions: ServerFunctions;

  private readonly _maxIdlePeriod: number;

  private _currentSelection: SheetsPosition;

  private _isIdle: boolean;

  private _timerHandle: any;

  private _positionQuery: Deferred | null;

  constructor(config: SheetsServiceConfig) {
    this._maxIdlePeriod = config.maxIdlePeriod;
    this._serverFunctions = config.serverFunctions;

    this._currentSelection = SheetsPosition.empty();
    this._isIdle = true;
    this._positionQuery = null;
  }

  public onSelectionChange?: (newSelection: SheetsPosition) => any;

  public onError?: (error: any) => any;

  get isIdle() {
    return this._isIdle;
  }

  get currentSelection() {
    return this._currentSelection;
  }

  start() {
    this._startPositionQuery();
    return this;
  }

  stop() {
    this._exitIdleState();
    return this;
  }

  _startPositionQuery() {
    this._exitIdleState();
    this._positionQuery = new Deferred();
    this._positionQuery.promise.then(
      this._onPositionResolve,
      this._onPositionReject
    );

    const originalQuery = this._positionQuery;
    this._serverFunctions
      .getCurrentPosition()
      .then(value => {
        if (this._positionQuery === originalQuery) {
          this._positionQuery.resolve(value);
        }
      })
      .catch(reason => {
        if (this._positionQuery === originalQuery) {
          this._positionQuery.reject(reason);
        }
      });
  }

  _onPositionResolve = (value: SheetsPositionLike) => {
    try {
      if (!this._currentSelection.equals(value)) {
        this._currentSelection = new SheetsPosition(value);
        this.onSelectionChange?.(this._currentSelection);
      }
    } finally {
      this._enterIdleState();
    }
  };

  _onPositionReject = (reason: any) => {
    try {
      if (!this._currentSelection.isEmpty) {
        this._currentSelection = SheetsPosition.empty();
        this.onSelectionChange?.(this._currentSelection);
      }

      this.onError?.(reason);
    } finally {
      this._enterIdleState();
    }
  };

  _enterIdleState = () => {
    this._positionQuery = null;
    this._isIdle = true;
    this._timerHandle = setTimeout(() => {
      this._startPositionQuery();
    }, this._maxIdlePeriod);
  };

  _exitIdleState() {
    this._positionQuery = null;
    this._isIdle = false;
    clearTimeout(this._timerHandle);
    this._timerHandle = undefined;
  }

  moveCursor(params: MoveCursorOptions) {
    this._exitIdleState();
    this._serverFunctions
      .moveCursor(params)
      .then(this._onPositionResolve, this._onPositionReject);
  }

  updateRow(params: UpdateRowOptions) {
    this._exitIdleState();
    this._serverFunctions
      .updateRow(params)
      .catch(this.onError)
      .finally(() => this._enterIdleState());
  }
}

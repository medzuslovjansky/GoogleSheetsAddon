import isEqual from 'lodash/isEqual';
import { SheetsPositionLike } from '../../../common/serverTypes';

export default class SheetsPosition implements SheetsPositionLike {
  public readonly sheet: SheetsPositionLike['sheet'];

  public readonly range: SheetsPositionLike['range'];

  public readonly record: SheetsPositionLike['record'];

  public readonly isv: SheetsPositionLike['isv'];

  public readonly duration: number;

  constructor({
    sheet = null,
    range = null,
    record = null,
    isv = null,
    duration = NaN,
  }) {
    this.sheet = sheet;
    this.range = range;
    this.record = record;
    this.isv = isv;
    this.duration = duration;
  }

  equals(other: SheetsPositionLike): boolean {
    const aIndex = this.sheet?.index;
    const bIndex = other.sheet?.index;
    const aRange = this.range?.a1Notation;
    const bRange = other.range?.a1Notation;

    if (aIndex === bIndex && aRange === bRange) {
      return isEqual(this.record, other.record);
    }

    return false;
  }

  get isEmpty() {
    return !this.sheet;
  }

  static empty() {
    return new SheetsPosition({});
  }
}

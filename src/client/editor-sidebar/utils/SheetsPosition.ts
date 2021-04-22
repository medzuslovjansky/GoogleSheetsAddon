import isEqual from 'lodash/isEqual';
import { SheetsPositionLike } from '../types/server';

export default class SheetsPosition implements SheetsPositionLike {
  public readonly sheet: SheetsPositionLike['sheet'];

  public readonly range: SheetsPositionLike['range'];

  public readonly record: SheetsPositionLike['record'];

  constructor({ sheet = null, range = null, record = null }) {
    this.sheet = sheet;
    this.range = range;
    this.record = record;
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

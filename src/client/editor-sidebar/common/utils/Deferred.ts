import noop from 'lodash/noop';

const _promise = Symbol('promise');
const _status = Symbol('status');
const _resolve = Symbol('resolve');
const _reject = Symbol('reject');

export default class Deferred<T = any> {
  constructor() {
    this[_promise] = new Promise<T>((resolve, reject) => {
      this[_status] = Deferred.PENDING;
      this[_resolve] = resolve;
      this[_reject] = reject;
    });

    this[_promise].catch(noop); // handle unhandled rejection warnings
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  static resolved<V>(value: V) {
    const deferred = new Deferred<V>();
    deferred.resolve(value);
    return deferred;
  }

  static rejected(reason: any) {
    const deferred = new Deferred();
    deferred.reject(reason);
    return deferred;
  }

  get status() {
    return this[_status];
  }

  get promise() {
    return this[_promise];
  }

  isPending() {
    return this.status === Deferred.PENDING;
  }

  isResolved() {
    return this.status === Deferred.RESOLVED;
  }

  isRejected() {
    return this.status === Deferred.REJECTED;
  }

  resolve(value: T) {
    if (this[_status] === Deferred.PENDING) {
      this[_resolve](value);
      this[_status] = Deferred.RESOLVED;
    }
  }

  reject(reason: any) {
    if (this[_status] === Deferred.PENDING) {
      this[_reject](reason);
      this[_status] = Deferred.REJECTED;
    }
  }

  static readonly PENDING = 'pending';

  static readonly RESOLVED = 'resolved';

  static readonly REJECTED = 'rejected';
}

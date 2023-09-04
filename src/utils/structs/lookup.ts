import { LookupError } from './error';

export class Lookup<K, V> implements KeyValueStorage<K, V>{
  private map: Map<K, V>;

  constructor() {
    this.map = new Map<K, V>();
  }

  set(key: K, value: V) {
    this.map.set(key, value);
  }

  get(key: K) {
    if (!this.map.has(key)) throw new LookupError(`[${key}] does not exist in Lookup pool`);
    return this.map.get(key) as V;
  }

  size() {
    return this.map.size;
  }

  clear() {
    this.map.clear();
  }

  has(key:K) {
    return this.map.has(key);
  }
}

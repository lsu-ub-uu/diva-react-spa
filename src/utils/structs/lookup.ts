
export class Lookup<K, V> {

  private map: Map<K, V>;

  constructor() {
    this.map = new Map<K, V>();
  }

  set(key: K, value: V) {
    this.map.set(key, value);
  }

  get(key: K) {
    return this.map.get(key);
  }

  size() {
    return this.map.size;
  }

}

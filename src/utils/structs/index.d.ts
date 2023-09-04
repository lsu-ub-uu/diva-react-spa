declare interface KeyValueStorage<K, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  size(): number;
}

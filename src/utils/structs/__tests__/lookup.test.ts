import { Lookup } from '../lookup';
import { LookupError } from '../error';

describe('Lookup', () => {

  let lookup: Lookup<string, string>;

  beforeEach(() => {
    lookup = new Lookup<string, string>();
  });

  it('should return empty when created', () => {
    expect(lookup.size()).toBe(0);
  });

  it('should set and get correct size', () => {
    lookup.set('testKey', 'testValue');
    expect(lookup.size()).toBe(1);
  });

  it('should throw error when key does not exist', () => {
    expect(() => {
      lookup.get('nonExistingKey')
    }).toThrow(LookupError)

    try {
      lookup.get('nonExistingKey')
    } catch (error: unknown) {
      const castError: LookupError = <LookupError>error;
      expect(castError.message).toStrictEqual('[nonExistingKey] does not exist in Lookup pool');
    }
  });

  it('should set and get correct values', () => {
    lookup.set('testKey1', 'testValue1');
    lookup.set('testKey2', 'testValue2');
    expect(lookup.size()).toBe(2);
    expect(lookup.get('testKey1')).toBe('testValue1');
    expect(lookup.get('testKey2')).toBe('testValue2');
  });

  it('should be empty when cleared', () => {
    lookup.set('testKey1', 'testValue1');
    lookup.clear();
    expect(lookup.size()).toBe(0);
  });

  it('should check for existing key', () => {
    lookup.set('testKey1', 'testValue1');
    expect(lookup.has('testKey1')).toBe(true);
  });

  it('should return false when checking for non-existing key', () => {
    expect(lookup.has('nonExistingKey')).toBe(false);
  });

})

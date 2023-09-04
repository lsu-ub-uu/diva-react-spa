import { Lookup } from '../lookup';

describe('Lookup', () => {

  let lookup: Lookup<string, string>;

  beforeEach(() => {
    lookup = new Lookup<string, string>();
  })

  it('should return empty when created', () => {
    expect(lookup.size()).toBe(0);
  })
  it('should set and get size', () => {
    const lookup = new Lookup<string, string>();
    lookup.set('testKey', 'testValue');
    expect(lookup.size()).toBe(1);
  })
})

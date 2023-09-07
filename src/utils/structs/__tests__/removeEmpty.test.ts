import { removeEmpty } from '../removeEmpty';

describe('RemoveEmpty', () => {

  const data = {
    prop1: 'hello',
    prop2: undefined,
    prop3: null,
    prop4: {
      innerProp: undefined,
      innerProp2: 'world',
    },
  };

  const cleaned =  {
    prop1: "hello",
    prop4: {
      innerProp2: "world",
    },
  };

  it('should return a data object with properties removed if null or undefined', () => {
    expect(removeEmpty(data)).toStrictEqual(cleaned);
  });

})

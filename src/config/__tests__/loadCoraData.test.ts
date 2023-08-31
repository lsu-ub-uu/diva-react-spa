import testData from '../../__mocks__/coraDivaRecordTypes.json'
import { transformCoraData } from '../loadCoraData';

describe('loadCoraData', () => {
  describe.skip('loadCoraData', () => {
    it('transform from cora to bff', () => {

    })
  });
  describe('transformCoraData', () => {
    it('transform from cora to bff', () => {
      transformCoraData(testData);
    })
  });

})

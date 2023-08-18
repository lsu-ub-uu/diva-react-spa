// import { RecordWrapper } from '../../utils/cora-data/CoraData';
import exampleDevOutput from '../../../__mocks__/exampleDevOutput.json';
import exampleDevOutput2 from '../../../__mocks__/exampleDevOutput2.json';
import { parseRecord } from '../parseRecord';

describe('parseRecords', () => {
  describe('binaries', () => {
    it('should parse exampleDevOutput record', () => {
      const output = parseRecord(exampleDevOutput);
      expect(output).toStrictEqual({
        id: 'exampleDevOutput:5538156835926548',
        title: 'my funny title',
        images: [],
      });
    });
    it('should parse exampleDevOutput with other order of children', () => {
      const output = parseRecord(exampleDevOutput2);
      expect(output).toStrictEqual({
        id: 'exampleDevOutput:5538156835926548',
        title: 'my funny title',
        images: [],
      });
    });
  });
  
});

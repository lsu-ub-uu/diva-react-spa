// import { RecordWrapper } from '../../utils/cora-data/CoraData';
import exampleDevOutput from '../../../__mocks__/exampleDevOutput.json';
import exampleDevOutput2 from '../../../__mocks__/exampleDevOutput2.json';
import { parseRecord } from '../parseRecord';

describe('parseRecords', () => {
  it('should parse records 1', () => {
    const output = parseRecord(exampleDevOutput);
    expect(output).toStrictEqual({
      id: 'exampleDevOutput:5538156835926548',
      title: 'my funny title',
      binaries: [],
    });
  });
  it('should parse records 2', () => {
    const output = parseRecord(exampleDevOutput2);
    console.log('output', output);
    expect(output).toStrictEqual({
      id: 'exampleDevOutput:5538156835926548',
      title: 'my funny title',
      binaries: [],
    });
  });
});

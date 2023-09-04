import { transformMetadata } from '../transformMetadata';
import emptyTestData from '../../__mocks__/emptyDataList.json';
import testMetaData from '../../__mocks__/coraMetadata.json';

describe('transformMetadata', () => {
  it('Empty list should return empty', () => {
    const metadataList = transformMetadata(emptyTestData);
    expect(metadataList).toStrictEqual([]);
  });
  it('Returns one metadata entry', () => {
    const metadataList = transformMetadata(testMetaData);
    expect(metadataList).toHaveLength(1);
  })
  it('Returns one metadata entry with id', () => {
    const metadataList = transformMetadata(testMetaData);
    const firstMetadata = metadataList[0];
    expect(firstMetadata.id).toEqual('someTextVar');
  });
  it('Return one metadata with type from attribute', () => {
    const metadataList = transformMetadata(testMetaData);
    const firstMetadata = metadataList[0];
    expect(firstMetadata.type).toEqual('textVariable');
  });
  it('Return one metadata throw error on no attribute', () => {
    const metadataList = transformMetadata(testMetaData);
    const firstMetadata = metadataList[0];
    expect(firstMetadata.type).toEqual('noneExistingName');
  });
})

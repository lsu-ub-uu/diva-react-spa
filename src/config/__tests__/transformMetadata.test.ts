import { transformMetadata } from '../transformMetadata';
import emptyTestData from '../../__mocks__/emptyDataList.json';
import testMetaData from '../../__mocks__/coraMetadata.json';
import testMetaDataWithFinalValue from '../../__mocks__/coraMetadataWithFinalValue.json';
import testMetaDataForGroupWithTwoChildren from '../../__mocks__/coraMetadataForGroupWithTwoChildren.json';

describe('transformMetadata', () => {
  it('Empty list should return empty', () => {
    const metadataList = transformMetadata(emptyTestData);
    expect(metadataList).toStrictEqual([]);
  });

  it('Returns one metadata entry', () => {
    const metadataList = transformMetadata(testMetaData);
    expect(metadataList).toHaveLength(1);
  });

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

  it('Returns one BFFMetadata for textVariable without finalValue', () => {
    const metadataList = transformMetadata(testMetaData);
    expect(metadataList).toHaveLength(1);
    expect(metadataList[0]).toEqual({
      id: 'someTextVar',
      nameInData: 'someNameInData',
      type: 'textVariable',
      textId: 'someTextVarText',
      defTextId: 'someTextVarDefText',
      regEx: '.*',
    });
    expect(metadataList[0].hasOwnProperty('finalValue')).toBe(false);
  });
  it('Returns one BFFMetadata for textVariable with finalValue', () => {
    const metadataList = transformMetadata(testMetaDataWithFinalValue);
    expect(metadataList).toHaveLength(1);
    expect(metadataList[0]).toEqual({
      id: 'someTextVar',
      nameInData: 'someNameInData',
      type: 'textVariable',
      textId: 'someTextVarText',
      defTextId: 'someTextVarDefText',
      regEx: '.*',
      finalValue: 'someFinalValue',
    });
  });
  it('Returns one BFFMetadata for group', () => {
    const metadataList = transformMetadata(testMetaDataForGroupWithTwoChildren);
    expect(metadataList).toHaveLength(1);
    expect(metadataList[0]).toStrictEqual({
      id: 'someGroup',
      nameInData: 'someGroupNameInData',
      type: 'group',
      textId: 'someGroupText',
      defTextId: 'someGroupDefText',
      children: [
        {
          childId: 'someChild0',
          repeatMin: '0',
          repeatMax: '1',
          recordPartConstraint: 'readWrite',
        },
        {
          childId: 'someChild1',
          repeatMin: '2',
          repeatMax: '3',
          recordPartConstraint: 'write',
        },
        {
          childId: 'someChild2',
          repeatMin: '4',
          repeatMax: '5',
        },
      ],
    });

    expect(metadataList[0].hasOwnProperty('finalValue')).toBe(false);
  });
});

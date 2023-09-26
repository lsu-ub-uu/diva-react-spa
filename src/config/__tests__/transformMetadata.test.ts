import { transformMetadata } from '../transformMetadata';
import emptyTestData from '../../__mocks__/emptyDataList.json';
import testMetaData from '../../__mocks__/coraMetadata.json';
import testMetaDataWithFinalValue from '../../__mocks__/coraMetadataWithFinalValue.json';
import testMetaDataForGroupWithTwoChildren from '../../__mocks__/coraMetadataForGroupWithTwoChildren.json';
import testNumberVariableMetaData from '../../__mocks__/coraMetadataNumberVariable.json';
import testNumberVariableWithFinalValueMetaData from '../../__mocks__/coraMetadataNumberVariableWithFinalValue.json';

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

  describe('textVariable', () => {
    it('Returns one BFFMetadata for textVariable without finalValue', () => {
      const metadataList = transformMetadata(testMetaData);
      expect(metadataList).toHaveLength(1);
      expect(metadataList[0]).toEqual({
        id: 'someTextVar',
        nameInData: 'someNameInData',
        type: 'textVariable',
        textId: 'someTextVarText',
        defTextId: 'someTextVarDefText',
        regEx: '.*'
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
        finalValue: 'someFinalValue'
      });
    });
  });
  describe('metadataGroup', () => {
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
            recordPartConstraint: 'readWrite'
          },
          {
            childId: 'someChild1',
            repeatMin: '2',
            repeatMax: '3',
            recordPartConstraint: 'write'
          },
          {
            childId: 'someChild2',
            repeatMin: '4',
            repeatMax: '5'
          }
        ]
      });

      expect(metadataList[0].hasOwnProperty('finalValue')).toBe(false);
    });
  });
  describe('numberVariable', () => {
    it('Returns one BFFMetadata for numberVariable without finalValue', () => {
      const metadataList = transformMetadata(testNumberVariableMetaData);
      expect(metadataList).toHaveLength(1);
      expect(metadataList[0]).toEqual({
        id: 'someNumberVar',
        nameInData: 'someNameInDataNumberVar',
        type: 'numberVariable',
        textId: 'someNumberVarText',
        defTextId: 'someNumberVarDefText',
        min: '0',
        max: '20',
        warningMin: '2',
        warningMax: '10',
        numberOfDecimals: '3'
      });
      expect(metadataList[0].hasOwnProperty('finalValue')).toBe(false);
    });

    it('Returns one BFFMetadata for numberVariable with finalValue', () => {
      const metadataList = transformMetadata(testNumberVariableWithFinalValueMetaData);
      expect(metadataList).toHaveLength(1);
      expect(metadataList[0]).toEqual({
        id: 'someNumberVar',
        nameInData: 'someNameInDataNumberVar',
        type: 'numberVariable',
        textId: 'someNumberVarText',
        defTextId: 'someNumberVarDefText',
        min: '0',
        max: '20',
        warningMin: '2',
        warningMax: '10',
        numberOfDecimals: '3',
        finalValue: '50.123'
      });
      expect(metadataList[0].hasOwnProperty('finalValue')).toBe(true);
    });
  });
});

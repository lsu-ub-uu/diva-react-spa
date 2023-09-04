import emptyTestData from '../../__mocks__/emptyDataList.json';
import validationTypeList from '../../__mocks__/validationTypeList.json';
import validationTypeListWithTwo from '../../__mocks__/validationTypeListWithTwo.json';
import { transformCoraValidationTypes } from '../transformValidationTypes';

describe('loadCoraData', () => {
  describe('transformCoraValidationType', () => {
    it('Empty list should return empty list', () => {
      const transformData = transformCoraValidationTypes(emptyTestData);
      expect(transformData).toStrictEqual([]);
    });
    it('Returns one entry', () => {
      const transformData = transformCoraValidationTypes(validationTypeList);
      expect(transformData).toHaveLength(1);
    });
    it('Returns one entry with id', () => {
      const transformData = transformCoraValidationTypes(validationTypeList);
      const firstRecordType = transformData[0];
      expect(firstRecordType.id).toEqual('someValidationTypeId');
    });
    it('Returns two entries with id', () => {
      const transformData = transformCoraValidationTypes(
        validationTypeListWithTwo,
      );
      const firstRecordType = transformData[0];
      expect(firstRecordType.id).toEqual('someValidationTypeId1');
      const secondRecordType = transformData[1];
      expect(secondRecordType.id).toEqual('someValidationTypeId2');
    });
    it('Returns one BFFValidationType for one validationType', () => {
      const transformData = transformCoraValidationTypes(validationTypeList);
      expect(transformData[0]).toEqual({
        id: 'someValidationTypeId',
        validatesRecordType: 'someRecordTypeToValidate',
        newMetadataGroupId: 'someNewGroup',
      });
    });
  });
});

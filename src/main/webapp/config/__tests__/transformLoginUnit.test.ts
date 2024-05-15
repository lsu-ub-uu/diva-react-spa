import emptyTestData from '../../__mocks__/emptyDataList.json';
import testLoginUnit from '../../__mocks__/coraLoginUnit.json';
import { transformLoginUnit } from '../transformLoginUnit';

describe('transformLoginUnit', () => {
  it('Empty list should return empty', () => {
    const loginUnit = transformLoginUnit(emptyTestData);
    expect(loginUnit).toStrictEqual([]);
  });

  it('Returns one metadata entry', () => {
    const loginUnit = transformLoginUnit(testLoginUnit);
    expect(loginUnit).toHaveLength(1);
  });

  it('Returns one metadata entry with id', () => {
    const loginUnit = transformLoginUnit(testLoginUnit);
    const firstLoginUnit = loginUnit[0];
    expect(firstLoginUnit.id).toEqual('someLoginUnitId');
  });

  it('Returns one metadata entry with id and login', () => {
    const loginUnit = transformLoginUnit(testLoginUnit);
    expect(loginUnit).toHaveLength(1);
    expect(loginUnit[0]).toStrictEqual({
      id: 'someLoginUnitId',
      login: 'someLoginDiVAwr'
    });
  });

  // describe('textVariable', () => {
  //   it('Returns one BFFMetadata for textVariable with finalValue', () => {
  //     const metadataList = transformMetadata(testMetaDataWithFinalValue);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'someTextVar',
  //       nameInData: 'someNameInData',
  //       type: 'textVariable',
  //       textId: 'someTextVarText',
  //       defTextId: 'someTextVarDefText',
  //       regEx: '.*',
  //       finalValue: 'someFinalValue'
  //     });
  //   });
  // });
  //
  // describe('metadataGroup', () => {
  //   it('Returns one BFFMetadata for group', () => {
  //     const metadataList = transformMetadata(testMetaDataForGroupWithTwoChildren);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'someGroup',
  //       nameInData: 'someGroupNameInData',
  //       type: 'group',
  //       textId: 'someGroupText',
  //       defTextId: 'someGroupDefText',
  //       children: [
  //         {
  //           childId: 'someChild0',
  //           repeatMin: '0',
  //           repeatMax: '1',
  //           recordPartConstraint: 'readWrite'
  //         },
  //         {
  //           childId: 'someChild1',
  //           repeatMin: '2',
  //           repeatMax: '3',
  //           recordPartConstraint: 'write'
  //         },
  //         {
  //           childId: 'someChild2',
  //           repeatMin: '4',
  //           repeatMax: '5'
  //         }
  //       ]
  //     });
  //
  //     expect(Object.hasOwn(metadataList[0], 'finalValue')).toBe(false);
  //   });
  // });
  //
  // describe('numberVariable', () => {
  //   it('Returns one BFFMetadata for numberVariable without finalValue', () => {
  //     const metadataList = transformMetadata(testNumberVariableMetaData);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'someNumberVar',
  //       nameInData: 'someNameInDataNumberVar',
  //       type: 'numberVariable',
  //       textId: 'someNumberVarText',
  //       defTextId: 'someNumberVarDefText',
  //       min: '0',
  //       max: '20',
  //       warningMin: '2',
  //       warningMax: '10',
  //       numberOfDecimals: '3'
  //     });
  //     expect(Object.hasOwn(metadataList[0], 'finalValue')).toBe(false);
  //   });
  //
  //   it('Returns one BFFMetadata for numberVariable with finalValue', () => {
  //     const metadataList = transformMetadata(testNumberVariableWithFinalValueMetaData);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'someNumberVar',
  //       nameInData: 'someNameInDataNumberVar',
  //       type: 'numberVariable',
  //       textId: 'someNumberVarText',
  //       defTextId: 'someNumberVarDefText',
  //       min: '0',
  //       max: '20',
  //       warningMin: '2',
  //       warningMax: '10',
  //       numberOfDecimals: '3',
  //       finalValue: '50.123'
  //     });
  //     expect(Object.hasOwn(metadataList[0], 'finalValue')).toBe(true);
  //   });
  // });
  //
  // describe('collectionVariable', () => {
  //   it('Returns one BFFMetadata for collectionVariable without finalValue', () => {
  //     const metadataList = transformMetadata(testCollectionVariableMetaData as DataListWrapper);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'exampleCollectionVar',
  //       nameInData: 'colour',
  //       type: 'collectionVariable',
  //       textId: 'exampleCollectionVarText',
  //       defTextId: 'exampleCollectionVarDefText',
  //       refCollection: 'exampleCollection'
  //     });
  //     expect(Object.hasOwn(metadataList[0], 'finalValue')).toBe(false);
  //   });
  //
  //   it('Returns one BFFMetadata for collectionVariable with finalValue', () => {
  //     const metadataList = transformMetadata(
  //       testCollectionVariableMetaDataWithFinalValue as DataListWrapper
  //     );
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'exampleCollectionVar',
  //       nameInData: 'colour',
  //       type: 'collectionVariable',
  //       textId: 'exampleCollectionVarText',
  //       defTextId: 'exampleCollectionVarDefText',
  //       refCollection: 'exampleCollection',
  //       finalValue: 'blue'
  //     });
  //     expect(Object.hasOwn(metadataList[0], 'finalValue')).toBe(true);
  //   });
  // });
  //
  // describe('itemCollection', () => {
  //   it('Returns one BFFMetadata for itemCollection', () => {
  //     // @ts-ignore
  //     const metadataList = transformMetadata(testItemCollection as DataListWrapper);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'exampleCollection',
  //       nameInData: 'colour',
  //       type: 'itemCollection',
  //       textId: 'exampleCollectionText',
  //       defTextId: 'exampleCollectionDefText',
  //       collectionItemReferences: [
  //         { refCollectionItemId: 'exampleBlueItem' },
  //         { refCollectionItemId: 'examplePinkItem' },
  //         { refCollectionItemId: 'exampleYellowItem' }
  //       ]
  //     });
  //   });
  // });
  //
  // describe('collectionItem', () => {
  //   it('Returns one BFFMetadata for collectionItem', () => {
  //     const metadataList = transformMetadata(testTestCollectionItem as DataListWrapper);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'exampleBlueItem',
  //       nameInData: 'blue',
  //       type: 'collectionItem',
  //       textId: 'exampleBlueItemText',
  //       defTextId: 'exampleBlueItemDefText'
  //     });
  //   });
  // });
  //
  // describe('attributeReference', () => {
  //   it('Returns one BFFMetadataGroup with one attributeReference', () => {
  //     const metadataList = transformMetadata(testMetadataGroupWithAttribute as DataListWrapper);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'demoNewGroup',
  //       nameInData: 'book',
  //       type: 'group',
  //       textId: 'demoGroupText',
  //       defTextId: 'demoGroupDefText',
  //       attributeReferences: [
  //         {
  //           refCollectionVarId: 'exampleAttributeFinalCollectionVar'
  //         }
  //       ],
  //       children: [
  //         {
  //           childId: 'recordInfoNewGroup',
  //           repeatMin: '1',
  //           repeatMax: '1'
  //         }
  //       ]
  //     });
  //   });
  //   it('Returns one BFFMetadataTextVariable with one attributeReference', () => {
  //     const metadataList = transformMetadata(testTextWithOneAttribute as DataListWrapper);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'someTextVar',
  //       nameInData: 'someNameInData',
  //       type: 'textVariable',
  //       textId: 'someTextVarText',
  //       defTextId: 'someTextVarDefText',
  //       regEx: 'someRegEx',
  //       attributeReferences: [
  //         {
  //           refCollectionVarId: 'exampleAttributeFinalCollectionVar'
  //         }
  //       ]
  //     });
  //   });
  //   it('Returns one BFFMetadataTextVariable with two attributeReference', () => {
  //     const metadataList = transformMetadata(testTestWithTwoAttributes as DataListWrapper);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'someTextVar',
  //       nameInData: 'someNameInData',
  //       type: 'textVariable',
  //       textId: 'someTextVarText',
  //       defTextId: 'someTextVarDefText',
  //       regEx: 'someRegEx',
  //       attributeReferences: [
  //         {
  //           refCollectionVarId: 'exampleAttributeFinalCollectionVar1'
  //         },
  //         {
  //           refCollectionVarId: 'exampleAttributeFinalCollectionVar2'
  //         }
  //       ]
  //     });
  //   });
  //   it('Returns one BFFMetadataNumberVariable with two attributeReference', () => {
  //     const metadataList = transformMetadata(testNumberWithTwoAttributes as DataListWrapper);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'someNumberVar',
  //       nameInData: 'someNameInData',
  //       type: 'numberVariable',
  //       textId: 'someTextVarText',
  //       defTextId: 'someTextVarDefText',
  //       min: '0',
  //       max: '20',
  //       warningMin: '2',
  //       warningMax: '10',
  //       numberOfDecimals: '3',
  //       attributeReferences: [
  //         {
  //           refCollectionVarId: 'exampleAttributeFinalCollectionVar1'
  //         },
  //         {
  //           refCollectionVarId: 'exampleAttributeFinalCollectionVar2'
  //         }
  //       ]
  //     });
  //   });
  //
  //   it('Returns one BFFMetadataCollectionVariable with two attributeReference', () => {
  //     const metadataList = transformMetadata(testCollectionWithTwoAttributes as DataListWrapper);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'someCollectionVar',
  //       nameInData: 'someNameInData',
  //       type: 'collectionVariable',
  //       textId: 'someTextVarText',
  //       defTextId: 'someTextVarDefText',
  //       refCollection: 'exampleCollection',
  //       attributeReferences: [
  //         {
  //           refCollectionVarId: 'exampleAttributeFinalCollectionVar1'
  //         },
  //         {
  //           refCollectionVarId: 'exampleAttributeFinalCollectionVar2'
  //         }
  //       ]
  //     });
  //   });
  // });
  //
  // describe('recordLink', () => {
  //   it('Returns one BFFMetadata for recordLink without finalValue', () => {
  //     const metadataList = transformMetadata(testMetadataRecordLink as DataListWrapper);
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'nationalSubjectCategoryLink',
  //       nameInData: 'nationalSubjectCategory',
  //       type: 'recordLink',
  //       textId: 'nationalSubjectCategoryLinkText',
  //       defTextId: 'nationalSubjectCategoryLinkDefText',
  //       linkedRecordType: 'nationalSubjectCategory'
  //     });
  //   });
  //
  //   it('Returns one BFFMetadata for recordLink with finalValue and one attribute', () => {
  //     const metadataList = transformMetadata(
  //       testMetadataRecordLinkWithFinalValue as DataListWrapper
  //     );
  //     expect(metadataList).toHaveLength(1);
  //     expect(metadataList[0]).toStrictEqual({
  //       id: 'nationalSubjectCategoryLink',
  //       nameInData: 'nationalSubjectCategory',
  //       type: 'recordLink',
  //       textId: 'nationalSubjectCategoryLinkText',
  //       defTextId: 'nationalSubjectCategoryLinkDefText',
  //       linkedRecordType: 'nationalSubjectCategory',
  //       finalValue: 'someFinalSubjectCategory',
  //       attributeReferences: [
  //         {
  //           refCollectionVarId: 'exampleAttributeFinalCollectionVar'
  //         }
  //       ]
  //     });
  //   });
  // });
});

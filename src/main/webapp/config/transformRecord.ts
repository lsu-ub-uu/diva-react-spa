/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import _ from 'lodash';
import {
  Attributes,
  DataAtomic,
  DataGroup,
  DataListWrapper,
  RecordLink,
  RecordWrapper
} from '../utils/cora-data/CoraData';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink
} from '../utils/cora-data/CoraDataTransforms';
import {
  containsChildWithNameInData,
  getAllChildrenWithNameInData,
  getFirstDataGroupWithNameInData
} from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { FormMetaData } from '../formDefinition/formDefinition';
import { Dependencies } from '../formDefinition/formDefinitionsDep';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { createFormMetaDataPathLookup } from '../utils/structs/metadataPathLookup';
import { createFormMetaData } from '../formDefinition/formMetadata';

const { inspect } = require('node:util');

/**
 * Transforms records
 * @param dependencies
 * @param dataListWrapper
 */
export const transformRecords = (
  dependencies: Dependencies,
  dataListWrapper: DataListWrapper
): any[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map((recordWrapper) => transformRecord(dependencies, recordWrapper));
};

interface TransformRecordInterface {
  id: string;
  recordType: string;
  validationType: string;
  createdAt: string;
  createdBy: string;
  updated: TransformRecordDataInterface[];
  userRights: Array<'read' | 'read_incoming_links' | 'update' | 'index'>;
  data: unknown;
  presentation?: unknown;
  listPresentation?: unknown;
  autoCompletePresentation?: unknown;
}

interface TransformRecordDataInterface {
  updateAt: string;
  updateBy: string;
}

/**
 * Transform Record
 * @param dependencies
 * @param recordWrapper
 */
export const transformRecord = (
  dependencies: Dependencies,
  recordWrapper: RecordWrapper
): TransformRecordInterface => {
  const coraRecord = recordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  let createdAt;
  let createdBy;

  const id = extractIdFromRecordInfo(dataRecordGroup);
  const recordInfo = extractRecordInfoDataGroup(dataRecordGroup);

  const recordType = extractLinkedRecordIdFromNamedRecordLink(recordInfo, 'type');
  const validationType = extractLinkedRecordIdFromNamedRecordLink(recordInfo, 'validationType');

  if (containsChildWithNameInData(recordInfo, 'tsCreated')) {
    createdAt = getFirstDataAtomicValueWithNameInData(recordInfo, 'tsCreated');
  }

  if (containsChildWithNameInData(recordInfo, 'createdBy')) {
    createdBy = extractLinkedRecordIdFromNamedRecordLink(recordInfo, 'createdBy');
  }
  const updated = extractRecordUpdates(recordInfo);

  const formMetadata = createFormMetaData(dependencies, validationType, 'update');
  // console.log(inspect(JSON.stringify(formMetadata, null, 2)));
  const formPathLookup = createFormMetaDataPathLookup(formMetadata);

  let userRights: string[] = [];
  if (coraRecord.actionLinks !== undefined) {
    userRights = Object.keys(coraRecord.actionLinks);
  }

  const data = traverseDataGroup(dataRecordGroup, formPathLookup);
  return removeEmpty({
    id,
    recordType,
    validationType,
    createdAt,
    createdBy,
    updated,
    userRights,
    data
  });
};

const extractRecordInfoDataGroup = (coraRecordGroup: DataGroup): DataGroup => {
  return getFirstDataGroupWithNameInData(coraRecordGroup, 'recordInfo');
};

const extractRecordUpdates = (recordInfo: DataGroup): unknown[] => {
  const updates = getAllChildrenWithNameInData(recordInfo, 'updated');
  return updates.map((update) => {
    const updatedGroup = update as DataGroup;
    const updatedBy = extractLinkedRecordIdFromNamedRecordLink(updatedGroup, 'updatedBy');
    const updateAt = getFirstDataAtomicValueWithNameInData(updatedGroup, 'tsUpdated');
    return { updateAt, updatedBy };
  });
};

export const traverseDataGroup = (
  dataGroup: DataGroup,
  formPathLookup?: Record<string, FormMetaData>,
  path?: string
) => {
  const validChildren = dataGroup.children.filter((group) => group.name !== 'recordInfo');
  const groupedByName = _.groupBy(validChildren, 'name');
  const groupedEntries = Object.entries(groupedByName);
  path = path === undefined ? dataGroup.name : path;
  const groupAttributes = transformObjectAttributes(dataGroup.attributes);
  const object: unknown[] = [];

  groupedEntries.forEach(([name, groupedChildren]) => {
    const currentPath = path ? `${path}.${name}` : name;
    let repeating = false;
    let isGroup = false;

    const thisLevelChildren = groupedChildren.map((child) => {
      const possibleAttributes = addAttributesToArray(child);
      const correctChild = hasCoraAttributes(
        currentPath,
        possibleAttributes,
        formPathLookup as Record<string, FormMetaData>
      );

      const nameInDataArray = getSameNameInDatas(
        groupedChildren,
        addAttributesToNameForRecords(child, correctChild)
      );

      // if (name === 'titleInfo') {
      //   console.log(
      //     addAttributesToNameForRecords(
      //       child,
      //       correctChild,
      //       nameInDataArray,
      //       formPathLookup,
      //       currentPath
      //     )
      //   );
      // }

      const possiblyNameWithAttribute = hasSameNameInDatas(groupedChildren, child.name)
        ? addAttributesToNameForRecords(
            child,
            correctChild,
            nameInDataArray,
            formPathLookup,
            currentPath
          )
        : name;

      if (isRecordLink(child) && !isRepeating(child, currentPath, formPathLookup)) {
        const childGroup = child as DataGroup;
        const recordLinkAttributes = transformObjectAttributes(childGroup.attributes);
        const recordId = getFirstDataAtomicValueWithNameInData(childGroup, 'linkedRecordId');
        return {
          [possiblyNameWithAttribute]: Object.assign({ value: recordId }, ...recordLinkAttributes)
        };
      }

      if (isRecordLink(child) && isRepeating(child, currentPath, formPathLookup)) {
        repeating = true;
        const childGroup = child as DataGroup;
        const recordLinkAttributes = transformObjectAttributes(childGroup.attributes);
        const recordId = getFirstDataAtomicValueWithNameInData(childGroup, 'linkedRecordId');
        return Object.assign({ value: recordId }, ...recordLinkAttributes);
      }

      if (isDataGroup(child) && !isRepeating(child, currentPath, formPathLookup)) {
        repeating = false;
        isGroup = true;
        const childGroup = updateGroupWithPossibleNewNameWithAttribute(
          child as DataGroup,
          possiblyNameWithAttribute
        );
        return traverseDataGroup(childGroup, formPathLookup, currentPath);
      }

      if (isDataGroup(child) && isRepeating(child, currentPath, formPathLookup)) {
        repeating = true;
        isGroup = true;

        const childGroup = updateGroupWithPossibleNewNameWithAttribute(
          child as DataGroup,
          possiblyNameWithAttribute
        );
        return traverseDataGroup(childGroup, formPathLookup, currentPath);
      }

      if (isDataAtomic(child) && !isRepeating(child, currentPath, formPathLookup)) {
        repeating = false;
        isGroup = false;
        const dataAtomic = child as DataAtomic;
        const atomicAttributes = transformObjectAttributes(dataAtomic.attributes);
        const { value } = child as DataAtomic;
        return { [possiblyNameWithAttribute]: Object.assign({ value }, ...atomicAttributes) };
      }

      if (isDataAtomic(child) && !isRepeating(child, currentPath, formPathLookup)) {
        repeating = false;
        isGroup = false;
        const dataAtomic = child as DataAtomic;
        const atomicAttributes = transformObjectAttributes(dataAtomic.attributes);
        const { value } = child as DataAtomic;
        return { [name]: Object.assign({ value }, ...atomicAttributes) };
      }

      if (isDataAtomic(child) && isRepeating(child, currentPath, formPathLookup)) {
        repeating = true;
        isGroup = false;
        const dataAtomic = child as DataAtomic;
        const atomicAttributes = transformObjectAttributes(dataAtomic.attributes);
        const { value } = child as DataAtomic;
        return Object.assign({ value }, ...atomicAttributes);
      }
    });
    if (repeating && !isGroup) {
      object.push({ [name]: thisLevelChildren });
    } else if (repeating && isGroup) {
      const childrenNames = getNamesFromChildren(thisLevelChildren);
      childrenNames.forEach((children) => {
        object.push({
          [children]: thisLevelChildren.map((item) => {
            return item[children];
          })
        });
      });
    } else {
      object.push(Object.assign({}, ...thisLevelChildren));
    }
  });
  return removeEmpty({ [dataGroup.name]: Object.assign({}, ...[...object, ...groupAttributes]) });
};

/**
 * Transform object attributes with _ prefix to key
 * @param attributes
 */
export const transformObjectAttributes = (attributes: Attributes | undefined) => {
  if (attributes === undefined) return [];

  return Object.keys(attributes).map((key) => {
    const value = attributes[key];
    return { [`_${key}`]: value };
  });
};

export const getSameNameInDatas = (
  children: (DataGroup | DataAtomic | RecordLink)[],
  newNameInData: string
) => {
  const nameArray: string[] = [];
  children.forEach((child) => {
    nameArray.push(child.name);
  });
  const newArray = nameArray.filter((item, index) => nameArray.indexOf(item) !== index);
  newArray.push(newNameInData);
  return newArray;
};

export const hasCoraAttributes = (
  // item: DataGroup | DataAtomic | RecordLink,
  currentPath: string,
  possibleAttributes: string[],
  formPathLookup: Record<string, FormMetaData>
) => {
  const lookup = formPathLookup ?? {};

  if (possibleAttributes?.length === 0) {
    return lookup[currentPath];
  }
  const currentMetadata = possibleAttributes.map((attribute) => {
    const currentLookup = lookup[`${currentPath}_${attribute}`];
    if (currentLookup !== undefined) {
      return lookup[`${currentPath}_${attribute}`];
    }
    return currentLookup;
  });
  return removeEmpty(currentMetadata)[0];
};

export const addAttributesToArray = (
  metaDataGroup: FormMetaData | (DataGroup | DataAtomic | RecordLink)
) => {
  if (metaDataGroup.attributes === undefined) {
    return [];
  }
  const nameArray: any[] = [];
  Object.entries(metaDataGroup.attributes).forEach(([key, value]) => {
    nameArray.push(`${key}_${value}`);
  });
  return nameArray;
};

export const hasSameNameInDatas = (
  children: (DataGroup | DataAtomic | RecordLink)[],
  currentName: string
) => {
  const nameInDatas: string[] = [];

  children.forEach((child) => {
    nameInDatas.push(child.name);
  });

  const numberOfOccurrences = nameInDatas.reduce((a, v) => (v === currentName ? a + 1 : a), 0);
  return numberOfOccurrences > 1;
};

export const addAttributesToNameForRecords = (
  metaDataGroup: FormMetaData | DataGroup | DataAtomic | RecordLink,
  correctChild: any,
  nameInDataArray?: string[],
  formPathLookup?: Record<string, FormMetaData>,
  currentPath?: string
) => {
  let formComponent;

  // console.log('1', inspect(formPathLookup));

  if (nameInDataArray !== undefined && formPathLookup !== undefined && currentPath !== undefined) {
    const searchPart = findSearchPart(nameInDataArray, currentPath);
    const lookup = formPathLookup ?? {};
    formComponent = lookup[searchPart];
  }

  const correctArray: any[] = [];
  if (correctChild !== undefined) {
    if (correctChild.attributes === undefined) {
      return metaDataGroup.name;
    }

    Object.entries(correctChild.attributes).forEach(([key, value]) => {
      correctArray.push(`${key}_${value}`);
    });
    return correctArray.length > 0
      ? `${metaDataGroup.name}_${correctArray.join('_')}`
      : metaDataGroup.name;
  }

  if (formComponent !== undefined) {
    if (formComponent.attributes === undefined) {
      return metaDataGroup.name;
    }

    Object.entries(formComponent.attributes).forEach(([key, value]) => {
      correctArray.push(`${key}_${value}`);
    });
    return correctArray.length > 0
      ? `${metaDataGroup.name}_${correctArray.join('_')}`
      : metaDataGroup.name;
  }

  if (metaDataGroup.attributes === undefined) {
    return metaDataGroup.name;
  }

  Object.entries(metaDataGroup.attributes).forEach(([key, value]) => {
    correctArray.push(`${key}_${value}`);
  });
  if (metaDataGroup.attributes === undefined) {
    return metaDataGroup.name;
  }
  return correctArray.length > 0
    ? `${metaDataGroup.name}_${correctArray.join('_')}`
    : metaDataGroup.name;
};

export const findSearchPart = (nameInDataArray?: string[], currentPath?: string) => {
  const path = (currentPath as string).split('.');
  const searchPart = path[path.length - 1];
  const findWithSearchPart = (nameInDataArray as string[]).find(
    (element) => element === searchPart
  );
  return findWithSearchPart ? (currentPath as string) : '';
};

/**
 * Detects a RecordLink
 * @param item
 */
export const isRecordLink = (item: DataGroup | DataAtomic | RecordLink) => {
  if (!isDataGroup(item)) return false;
  const group = item as DataGroup;
  const recordLinkChildren = group.children.filter((child: DataGroup | DataAtomic | RecordLink) => {
    return child.name === 'linkedRecordType' || child.name === 'linkedRecordId';
  });
  return recordLinkChildren.length === 2;
};

/**
 * Detects a DataGroup
 * @param item
 */
export const isDataGroup = (item: DataGroup | DataAtomic | RecordLink) => {
  return Object.hasOwn(item, 'name') && Object.hasOwn(item, 'children');
};

/**
 * Detects a DataAtomic
 * @param item
 */
export const isDataAtomic = (item: DataGroup | DataAtomic | RecordLink) => {
  return Object.hasOwn(item, 'name') && Object.hasOwn(item, 'value');
};

export const isRepeating = (
  item: DataGroup | DataAtomic | RecordLink,
  currentPath: string,
  formPathLookup?: Record<string, FormMetaData>
) => {
  const lookup = formPathLookup ?? {};
  const formComponent = lookup[currentPath];
  let isFormDataRepeating = false;
  if (formComponent) {
    isFormDataRepeating = formComponent.repeat.repeatMin === 0;
  }
  return Object.hasOwn(item, 'repeatId') || isFormDataRepeating;
};

export const updateGroupWithPossibleNewNameWithAttribute = (
  childGroup: DataGroup,
  possiblyNameWithAttribute: string
) => {
  return {
    ...childGroup,
    name: possiblyNameWithAttribute
  } as DataGroup;
};

export const getNamesFromChildren = (children: any[]) => {
  const temp: string[] = [];
  children.forEach((child) => {
    Object.keys(child).forEach((obj) => {
      temp.push(obj);
    });
  });
  return temp;
};

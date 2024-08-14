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

import { useEffect, useState } from 'react';
import { FormComponent, FormSchema } from '../FormGenerator/types';
import { NavigationPanelLink } from '../index';
import { CoraRecord } from '../../app/hooks';

export const linksFromFormSchema = (
  formSchema: FormSchema,
): NavigationPanelLink[] | undefined =>
  formSchema?.form.components
    ?.filter((c) => !['text', 'container'].includes(c.type))
    .map((c) => ({ name: c.name, label: c.label } as NavigationPanelLink));

export const removeComponentsWithoutValuesFromSchema = (
  formSchema: FormSchema,
  record: CoraRecord,
): FormSchema => {
  const schema = formSchema;
  let componentsFromSchema = formSchema.form.components;

  const flattenedRecord = flattenObject(record.data);
  const keysAsString = toShortString(flattenedRecord);
  const lastKeyFromString = getLastKeyFromString(keysAsString);
  console.log('k', lastKeyFromString);
  componentsFromSchema = componentsFromSchema?.filter((component) => {
    // nested groups -> look into groups
    // console.log('a', component);

    return [...lastKeyFromString].includes(component.name);
  });
  console.log('h', componentsFromSchema);

  schema.form.components = componentsFromSchema;
  return schema;
};

export const flattenObject = (obj: any, prefix = '') => {
  return Object.keys(obj).reduce((acc: any, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});
};

export const toShortString = (objects: any) => {
  return Object.entries(objects).map((object) => {
    return `${object[0].split('.')[0]}.${object[0].split('.')[1]}`;
  });
};

export const getLastKeyFromString = (keys: string[]) => {
  return keys.map((key: string) => {
    const stringArray = key.split('.');
    return stringArray[stringArray.length - 1];
  });
};

export const useSectionScroller = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const debounce = (func: () => void, wait: number) => {
      // @ts-ignore
      let timeoutId;

      // eslint-disable-next-line func-names
      return function (this: any, ...args: unknown[]) {
        // @ts-ignore
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          // @ts-ignore
          func.apply(this, args);
        }, wait);
      };
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections =
        document.querySelectorAll<HTMLSpanElement>('span.anchorLink');

      sections.forEach((section) => {
        const sectionBottom = section.offsetHeight + section.offsetTop;
        if (
          scrollPosition >= section.offsetTop - 5 &&
          scrollPosition <= sectionBottom + 5
        ) {
          setActiveSection(section.id.replace('anchor_', ''));
        }
      });
    };

    window.addEventListener('scroll', debounce(handleScroll, 10));
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return activeSection;
};

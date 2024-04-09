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
import { FormSchema } from '../FormGenerator/types';
import { NavigationPanelLink } from '../index';

export const linksFromFormSchema = (
  formSchema: FormSchema,
): NavigationPanelLink[] | undefined =>
  formSchema?.form.components
    ?.filter((c) => !['text', 'container'].includes(c.type))
    .map((c) => ({ name: c.name, label: c.label } as NavigationPanelLink));

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

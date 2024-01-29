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

import { FC, useEffect, useState } from 'react';
import axios from 'axios';

interface LinkedRecordProps {
  recordType: string;
  id: string;
}

export const LinkedRecord: FC<LinkedRecordProps> = (
  props: LinkedRecordProps,
) => {
  const [record, setRecord] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const extractData = (object: any, propertyName: string) => {
    // @ts-ignore
    return propertyName.split('.').reduce((obj, key) => obj[key], object);
  };

  const template = (inRecord: any) => {
    const name = extractData(
      inRecord.data as any,
      'nationalSubjectCategory.name.nationalSubjectCategoryName.value',
    );

    const alternativeName = extractData(
      inRecord.data as any,
      'nationalSubjectCategory.alternativeName.nationalSubjectCategoryName.value',
    );
    const code = extractData(
      inRecord.data as any,
      'nationalSubjectCategory.subjectCode.value',
    );
    return `${name}; ${alternativeName} (kod: ${code})`;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/record/${props.recordType}/${props.id}`,
        );
        if (isMounted) {
          setError(null);
          setRecord(response.data);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('Unexpected error occurred');
          }
          setIsLoading(false);
        }
      }
    };

    fetchData().then();

    return () => {
      isMounted = false;
    };
  }, [props.id, props.recordType]);

  if (isLoading) {
    return <div>Loading linked record...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // @ts-ignore
  return <span>{template(record)}</span>;
};

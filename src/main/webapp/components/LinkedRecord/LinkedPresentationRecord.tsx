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
import { useTranslation } from 'react-i18next';
import { FormGenerator } from '../FormGenerator/FormGenerator';
import { FormSchema } from '../FormGenerator/types';

interface LinkedRecordProps {
  recordType: string;
  id: string;
  presentationRecordLinkId: string;
}

export const LinkedRecord: FC<LinkedRecordProps> = (
  props: LinkedRecordProps,
) => {
  const [record, setRecord] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/record/${props.recordType}/${props.id}?presentationRecordLinkId=${props.presentationRecordLinkId}`,
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
  }, [props.id, props.recordType, props.presentationRecordLinkId]);

  if (isLoading) {
    return <div>{t('divaClient_loadingText')}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {record?.presentation?.form && (
        <FormGenerator
          record={record}
          onSubmit={() => {}}
          onInvalid={() => {}}
          formSchema={record.presentation as FormSchema}
          linkedData
        />
      )}
    </>
  );
};

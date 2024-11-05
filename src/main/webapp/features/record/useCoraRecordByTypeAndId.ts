/*
 * Copyright 2024 Uppsala University Library
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
import axios from 'axios';
import { CoraRecord, UseCoraRecordByTypeAndId } from '@/features/record/types';

export const useCoraRecordByTypeAndId = (
  recordType: string,
  recordId: string | undefined,
  presentationRecordLinkId?: string | undefined,
): UseCoraRecordByTypeAndId => {
  const [record, setRecord] = useState<CoraRecord>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const url =
      presentationRecordLinkId === undefined
        ? `/record/${recordType}/${recordId}`
        : `/record/${recordType}/${recordId}?presentationRecordLinkId=${presentationRecordLinkId}`;
    const fetchRecord = async () => {
      try {
        const response = await axios.get<CoraRecord>(url);
        if (isMounted) {
          setError(null);
          setRecord(response.data as CoraRecord);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        setRecord(undefined);
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

    if (recordId !== undefined) fetchRecord().then();

    return () => {
      isMounted = false;
    };
  }, [presentationRecordLinkId, recordType, recordId]);

  return { isLoading, error, record, setRecord };
};

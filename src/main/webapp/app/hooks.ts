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
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { RootState, AppDispatch } from './store';
import { FormSchema } from '@/components/FormGenerator/types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface UseFormSchemaByValidationType {
  schema: FormSchema | undefined;
  isLoading: boolean;
  error: string | null;
}

export const useCoraFormSchemaByValidationType = (
  validationType: string | undefined,
  mode: 'create' | 'update' | 'view',
): UseFormSchemaByValidationType => {
  const [schema, setSchema] = useState<FormSchema>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFormSchema = async () => {
      try {
        const response = await axios.get(`/form/${validationType}/${mode}`);
        if (isMounted) {
          setError(null);
          setSchema(response.data as FormSchema);
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

    if (validationType !== undefined) fetchFormSchema().then();

    return () => {
      isMounted = false;
    };
  }, [validationType, mode]);

  return { isLoading, schema, error };
};

interface UseCoraRecordByTypeAndId {
  record?: CoraRecord;
  isLoading: boolean;
  error: string | null;
}

interface CoraUpdate {
  updateAt: string;
  updatedBy: string;
}

export interface CoraRecord {
  id?: string;
  recordType?: string;
  validationType?: string;
  createdAt?: string;
  createdBy?: string;
  updated?: CoraUpdate[];
  userRights?: string[];
  data: unknown;
  presentation?: unknown;
}

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

  return { isLoading, error, record };
};

export const useCoraRecordByType = (
  recordType: string | undefined,
): UseCoraRecordByTypeAndId => {
  const [record, setRecord] = useState<CoraRecord>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const url = `/record/${recordType}`;
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

    if (recordType !== undefined) fetchRecord().then();

    return () => {
      isMounted = false;
    };
  }, [recordType]);

  return { isLoading, error, record };
};

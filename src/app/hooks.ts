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

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { RootState, AppDispatch } from './store';
import { FormSchema } from '../components/FormGenerator/FormGenerator';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface UseFormSchemaByValidationType {
  schema: FormSchema | undefined;
  isLoading: boolean;
  error: string | null;
}

export const useCoraFormSchemaByValidationType = (
  validationType: string,
): UseFormSchemaByValidationType => {
  const [schema, setSchema] = useState<FormSchema>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFormSchema = async () => {
      try {
        const response = await axios.get(`/form/${validationType}`);
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

    fetchFormSchema().then();

    return () => {
      isMounted = false;
    };
  }, [validationType]);

  return { isLoading, schema, error };
};

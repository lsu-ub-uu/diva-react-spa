import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from 'axios';
import type { RootState, AppDispatch } from './store';
import { FormSchema } from '../components/FormGenerator/FormGenerator';
import { Option } from '../components';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface UseFormSchemaByValidationType {
  schema: FormSchema | undefined;
  isLoading: boolean;
  error: string | null;
}

interface UseCoraRecordSearch {
  setQuery: Dispatch<SetStateAction<any>>;
  options: Option[];
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

export const useCoraRecordSearch = (): UseCoraRecordSearch => {
  const [query, setQuery] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (query === '') {
      setOptions([]);
      return undefined;
    }

    // TODO protect with debounce and useMemo
    const searchCoraRecords = async () => {
      try {
        const response = await axios.get(`/search/${query}`);
        if (isMounted) {
          setError(null);
          setOptions(response.data);
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

    searchCoraRecords().then();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return { isLoading, options, error, setQuery };
};

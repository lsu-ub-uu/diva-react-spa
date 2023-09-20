import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface UseFormSchemaByValidationType {
  schema: unknown;
  isLoading: boolean;
}

export const useCoraFormSchemaByValidationType = (
  validationType: string,
): UseFormSchemaByValidationType => {
  useEffect(() => {});

  const isLoading = false;
  const schema = {};
  return { isLoading, schema };
};

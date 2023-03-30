import { useEffect } from 'react';
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  researchSubjectSelector,
  loadResearchSubjectsAsync,
} from '../../features/researchSubject';

export const ResearchSubjectPicker = () => {
  const dispatch = useAppDispatch();
  const researchSubjectState = useAppSelector(researchSubjectSelector);

  useEffect(() => {
    dispatch(loadResearchSubjectsAsync());
  }, [dispatch]);

  if (researchSubjectState.isLoading) return <span>Loading...</span>;
  if (researchSubjectState.isError)
    return <Alert severity='error'>{researchSubjectState.message}</Alert>;

  return (
    <div>{JSON.stringify(researchSubjectState.researchSubjects, null, 1)}</div>
  );
};

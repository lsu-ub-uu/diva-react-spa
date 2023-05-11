import { useEffect } from 'react';
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllResearchSubjects,
  researchSubjectSelector,
} from '../../features/researchSubject';

export const ResearchSubjectPicker = () => {
  const dispatch = useAppDispatch();
  const researchSubjectState = useAppSelector(researchSubjectSelector);

  useEffect(() => {
    dispatch(getAllResearchSubjects());
  }, [dispatch]);

  if (researchSubjectState.isLoading) return <span>Loading...</span>;
  if (researchSubjectState.isError)
    return <Alert severity='error'>{researchSubjectState.message}</Alert>;

  return (
    <pre>{JSON.stringify(researchSubjectState.researchSubjects, null, 1)}</pre>
  );
};

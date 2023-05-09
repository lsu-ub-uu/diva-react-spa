import { Alert } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { researchSubjectSelector } from '../../features/researchSubject';

export const ResearchSubjectPicker = () => {
  // const dispatch = useAppDispatch();
  const researchSubjectState = useAppSelector(researchSubjectSelector);

  if (researchSubjectState.isLoading) return <span>Loading...</span>;
  if (researchSubjectState.isError)
    return <Alert severity='error'>{researchSubjectState.message}</Alert>;

  return (
    <div>{JSON.stringify(researchSubjectState.researchSubjects, null, 1)}</div>
  );
};

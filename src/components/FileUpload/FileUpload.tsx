import {
  Box,
  Button,
  LinearProgress,
  linearProgressClasses,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const StyledLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#eee',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}));

const UploadProgress = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 600);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <StyledLinearProgress
          variant='determinate'
          color='primary'
          value={progress}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant='body2'
          color='text.secondary'
        >{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
};

export const FileUpload = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Stack spacing={2}>
      <input
        type='file'
        ref={inputRef}
        /* onChange={(event) => console.log(event)} */
        multiple={false}
        style={{ display: 'none' }}
      />
      <Button
        disableRipple
        color='primary'
        variant='contained'
        endIcon={<AddCircleOutlineIcon />}
        onClick={(): void => inputRef.current?.click()}
      >
        Choose file to upload
      </Button>
      <UploadProgress />
    </Stack>
  );
};

import {
  Alert,
  Box,
  Button,
  LinearProgress,
  linearProgressClasses,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios, { AxiosError } from 'axios';

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

interface UploadProgressProps {
  currentProgress: number;
}

const axiosInstance = axios.create({
  baseURL: `${window.location.protocol}//${window.location.host}`,
});

const UploadProgress = (props: UploadProgressProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(props.currentProgress);
  }, [props.currentProgress]);

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

enum UploadStatus {
  PENDING,
  UPLOADING,
  SUCCESS,
  FAILED,
}

export interface FileUploadProps {
  accept: string[];
}

export const FileUpload = (props: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.PENDING,
  );
  const [filename, setFilename] = useState<string>('');

  const handleSubmit = async (files: FileList) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    setFilename(files[0].name);
    setProgress(0);
    try {
      setUploadStatus(UploadStatus.UPLOADING);
      await axiosInstance.post('/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / (data.total ?? 100)));
        },
      });
      setProgress(100);
      setUploadStatus(UploadStatus.SUCCESS);
    } catch (error: any) {
      setUploadStatus(UploadStatus.FAILED);
    }
  };

  return (
    <Box sx={{ marginBottom: 10 }}>
      <Stack spacing={2}>
        <input
          type='file'
          ref={inputRef}
          accept={props.accept.join(', ')}
          onChange={async (event) => {
            const files = event.currentTarget?.files;
            if (files !== null && files.length > 0) {
              await handleSubmit(files);
            }
          }}
          multiple={false}
          style={{ display: 'none' }}
        />
        <Button
          disabled={progress > 0 && progress < 100}
          disableRipple
          color='primary'
          variant='contained'
          endIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setUploadStatus(UploadStatus.PENDING);
            setProgress(0);
            inputRef.current?.click();
          }}
        >
          Choose file to upload
        </Button>
        {uploadStatus === UploadStatus.FAILED && <span>Upload failed</span>}
        {uploadStatus === UploadStatus.SUCCESS && (
          <Alert severity='info'>
            File <i>{filename}</i> was successfully uploaded
          </Alert>
        )}

        {uploadStatus === UploadStatus.UPLOADING && (
          <UploadProgress currentProgress={progress} />
        )}
      </Stack>
    </Box>
  );
};

import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import 'dayjs/locale/en-gb';

export const DatePicker = () => {
  const [locale, setLocale] = useState('sv');

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={locale}
    >
      <MuiDatePicker
        slotProps={{
          actionBar: { actions: ['today', 'clear'] },
        }}
      />
    </LocalizationProvider>
  );
};

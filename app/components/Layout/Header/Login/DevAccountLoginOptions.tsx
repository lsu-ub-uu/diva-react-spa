/*
 * Copyright 2024 Uppsala University Library
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

import { MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Account} from './devAccounts';
import { getDevAccounts } from './devAccounts';

interface DevAccountsProps {
  onSelect: (account: Account) => void;
}

export const DevAccountLoginOptions = ({ onSelect }: DevAccountsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <MenuItem
        disabled
        sx={{ py: 0 }}
      >
        <Typography variant='overline'>
          {t('divaClient_LoginDevAccountText')}
        </Typography>
      </MenuItem>
      {getDevAccounts().map((devAccount) => (
        <MenuItem
          key={devAccount.userId}
          onClick={() => onSelect(devAccount)}
        >
          {devAccount.lastName} {devAccount.firstName}
        </MenuItem>
      ))}
    </>
  );
};

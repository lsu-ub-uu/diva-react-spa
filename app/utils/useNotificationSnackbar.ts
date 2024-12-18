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

import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useNavigation } from '@remix-run/react';
import type { Notification } from '@/.server/sessions';

export const useNotificationSnackbar = (
  notification: Notification | undefined,
) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (notification && navigation.state === 'idle') {
      enqueueSnackbar(notification.summary, {
        variant: notification.severity,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        preventDuplicate: true,
      });
    }
  }, [notification, navigation.state]);
};
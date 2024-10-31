/*
 * Copyright 2023 Uppsala University Library
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

import Router from './routes/routes';
import { Suspense } from 'react';
import './app/i18n';
import store from '@/webapp/app/store';
import { divaTheme } from '@/webapp/themes/diva';
import { CssBaseline } from '@mui/material';
import { BackdropProvider, SnackbarProvider } from '@/webapp/components';
import { ThemeProvider } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider as StateProvider } from 'react-redux';

const App = () => {
  return <Router />;
};

export default App;

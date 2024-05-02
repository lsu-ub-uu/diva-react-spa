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

import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import favicon from './assets/favicon.svg';
import dev_favicon from './assets/dev_favicon.svg';
import Router from './routes/routes';
import useI18n from './app/i18n';

const App = () => {
  const { loading } = useI18n();
  const { MODE } = import.meta.env;

  if (loading) return <h3>Waiting for DiVA 3 GUI to load...</h3>;

  return (
    <>
      <Helmet>
        <link
          rel='icon'
          type='image/svg+xml'
          href={MODE === 'development' ? dev_favicon : favicon}
        />
      </Helmet>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;

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

import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),

  route('/login', './routes/login.tsx'),
  route('/logout', './routes/logout.tsx'),

  route('/create', './routes/createRecord.tsx'),

  route('/delete/:recordType/:recordId', './routes/deleteRecord.tsx'),
  route('/view/:recordType/:recordId', './routes/viewRecord.tsx'),
  route('/update/:recordType/:recordId', './routes/updateRecord.tsx'),

  route('/search/:searchType', './routes/searchRecord.tsx'),

  route('/translations/:lang', './routes/translations.tsx'),
  route('/autocompleteSearch', './routes/autocompleteSearch.tsx'),
  route('/refreshDefinitions', './routes/refreshDefinitions.tsx'),
] satisfies RouteConfig;

// export default flatRoutes() satisfies RouteConfig;

import { route, type RouteConfig } from '@remix-run/route-config';

export default [
  route('/', './routes/home.tsx'),

  route('/login', './routes/login.tsx'),
  route('/logout', './routes/logout.tsx'),

  route('/create', './routes/createRecord.tsx'),
  route('/delete/:recordType/:recordId', './routes/deleteRecord.tsx'),
  route('/view/:recordType/:recordId', './routes/viewRecord.tsx'),
  route('/update/:recordType/:recordId', './routes/updateRecord.tsx'),
  route('/search/:searchType', './routes/searchRecords.tsx'),

  route('/translations/:lang', './routes/translations.tsx'),
  route('/autocompleteSearch', './routes/autocompleteSearch.tsx'),
  route('/record/:recordType/:recordId', './routes/getRecord.tsx'),
  route('/refreshDefinitions', './routes/refreshDefinitions.tsx'),
] satisfies RouteConfig;

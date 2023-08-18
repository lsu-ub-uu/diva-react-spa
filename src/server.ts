import express, { Application } from 'express';
import { configureServer } from './config/configureServer';
import personRoute from './routes/personRoute';
import publicationRoute from './routes/publicationRoute';
import recordTypeRoute from './routes/recordTypeRoute';
import researchSubjectsRoute from './routes/researchSubjectsRoute';
import subjectCategoriesRoute from './routes/subjectCategoriesRoute';
import searchRoute from './routes/searchRoute';
import authRoute from './routes/authRoute';
import publishRoute from './routes/publishRoute';
import binaryRoute from './routes/binaryRoute';

const PORT = process.env.PORT || 8080;

const app: Application = express();

configureServer(app);

app.use('/api/auth', authRoute);
app.use('/api/person', personRoute);
app.use('/api/publication', publicationRoute);
app.use('/api/recordtype', recordTypeRoute);
app.use('/api/researchsubjects', researchSubjectsRoute);
app.use('/api/subjectcategories', subjectCategoriesRoute);
app.use('/api/search', searchRoute);
app.use('/api/publish', publishRoute);
app.use('/api/binary', binaryRoute);

app.listen(PORT, (): void => {
  console.log(`Server running at ${PORT}`);
});

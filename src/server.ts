import express, { Application } from 'express';
import { configureServer } from './config/configureServer';
import userRoute from './routes/userRoute';
import publicationRoute from './routes/publicationRoute';
import recordTypeRoute from './routes/recordTypeRoute';
// import researchSubjectsRoute from './routes/publicationTypesRoute.js';

const PORT = process.env.PORT || 8080;

const app: Application = express();

configureServer(app);

app.use('/api/user', userRoute);
app.use('/api/publication', publicationRoute);
app.use('/api/recordtype', recordTypeRoute);
/* app.use('/api/publicationtypes', publicationTypesRoute);
app.use('/api/researchSubjects', researchSubjectsRoute); */

app.listen(PORT, (): void => {
  console.log(`Server running at ${PORT}`);
});

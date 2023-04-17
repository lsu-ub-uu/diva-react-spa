import express, { Application } from 'express';
import userRoute from './routes/userRoute';
import publicationRoute from './routes/publicationRoute';
// import researchSubjectsRoute from './routes/publicationTypesRoute.js';

const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/publication', publicationRoute);
/* app.use('/api/publicationtypes', publicationTypesRoute);
app.use('/api/researchSubjects', researchSubjectsRoute); */

app.listen(PORT, (): void => {
  console.log(`Server running at ${PORT}`);
});

import express, { Application } from 'express';
import userRouter from './routes/userRoute.js';
/* import publicationTypesRoute from './routes/researchSubjectsRoute.js';
import researchSubjectsRoute from './routes/publicationTypesRoute.js'; */

const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(express.json());

app.use('/api/user', userRouter);
/* app.use('/api/publicationtypes', publicationTypesRoute);
app.use('/api/researchSubjects', researchSubjectsRoute); */

app.listen(PORT, (): void => {
  console.log(`Server Running here at ${PORT}`);
});

import { BrowserRouter } from 'react-router-dom';
import './app/i18n';
import Router from './routes/routes';

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Router />
    </BrowserRouter>
  );
};

export default App;

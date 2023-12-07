import { BrowserRouter } from 'react-router-dom';
import Router from './routes/routes';
import useI18n from './app/i18n';

const App = () => {
  const { loading } = useI18n();

  if (loading) return <h3>Waiting for DiVA 3 GUI to load...</h3>;

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Router />
    </BrowserRouter>
  );
};

export default App;

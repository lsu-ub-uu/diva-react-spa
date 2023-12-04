import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import './app/i18n';
import Router from './routes/routes';

const App = () => {
  const location = window.location.href;
  return (
    <>
      <Helmet>
        {location.startsWith('http://localhost') === true ? (
          <link
            rel='icon'
            type='image/svg+xml'
            href='/dev_favicon.svg'
          />
        ) : (
          <link
            rel='icon'
            type='image/svg+xml'
            href='/favicon.svg'
          />
        )}
      </Helmet>

      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;

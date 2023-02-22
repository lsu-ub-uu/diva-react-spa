import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Layout, Section } from './components';
import { HomePage, ListUsersPage } from './pages';
import './app/i18n';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Layout />}
        >
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path='about'
            element={
              <div>
                <p>
                  <Section title='Test'>
                    <Outlet />
                  </Section>
                </p>
              </div>
            }
          >
            <Route
              path='tech'
              element={<p>sub about tech page</p>}
            />
          </Route>
          <Route
            path='users'
            element={<ListUsersPage />}
          />
          <Route
            path='*'
            element={<p>404 not found</p>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

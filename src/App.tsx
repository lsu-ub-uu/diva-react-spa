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
                <Section title='Test'>
                  <Outlet />
                </Section>
              </div>
            }
          >
            <Route
              path='tech'
              element={<div>sub about tech page</div>}
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

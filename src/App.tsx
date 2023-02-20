import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Layout, Section } from './components';

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
            element={<p>home page</p>}
          />
          <Route
            path='about'
            element={
              <p>
                about page <br /> <br /> <br />
                <Section title='Test'>
                  <Outlet />
                </Section>
              </p>
            }
          >
            <Route
              path='tech'
              element={<p>sub about tech page</p>}
            />
          </Route>
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

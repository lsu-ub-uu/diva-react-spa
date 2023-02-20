import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Layout } from './components';

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
                about page <br />
                <Outlet />
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

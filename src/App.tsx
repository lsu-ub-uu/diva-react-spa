import reactLogo from './assets/react.svg';
import './App.css';
import { Button } from './components';

function App() {
  return (
    <div className='App'>
      <div>
        <a
          href='https://vitejs.dev'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/vite.svg'
            className='logo'
            alt='Vite logo'
          />
        </a>
        <a
          href='https://reactjs.org'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src={reactLogo}
            className='logo react'
            alt='React logo'
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Button label='test' />
      <div className='card'>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;

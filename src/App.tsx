import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

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
      <div className='card'>
        <button
          onClick={() => setCount((cnt) => cnt + 1)}
          type='button'
        >
          count is {count}
        </button>
        <p>
          Hej! test Edit <code>src/App.tsx</code> and save to test HMR{' '}
          <a href='#test'>test</a> Edit <code>src/App.tsx</code> and save to
          test HMR <a href='#test'>test</a> Edit <code>src/App.tsx</code> and
          save to test HMR <a href='#test'>test</a> Edit{' '}
          <code>src/App.tsx</code> and save to test HMR <a href='#test'>test</a>
        </p>
      </div>
    </div>
  );
}

export default App;

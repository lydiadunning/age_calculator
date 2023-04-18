import { useState } from 'react'

import './App.css'

function App() {
  const [day, setDay] = useState('DD')
  const [month, setMonth] = useState('MM')
  const [year, setYear] = useState('YYYY')

  return (
    <div className="App">
      {/* components:
      app- the container.
      form structure/ input
        individual form
      divider with button
      output
        output rows

      */}
      <Inputs/>
      <Divider/>
      <div className='divider'>
        <hr/>
        <img src="./assets/images/icon-arrow.svg"/>
      </div>
      <Outputs/>

      
    </div>
  )
}

export default App

// Steps: 
// 1. create components with placeholder style
// 2. create initial style


/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */
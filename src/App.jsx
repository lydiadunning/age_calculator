import { useState } from 'react'
import arrowUrl from './assets/images/icon-arrow.svg'
import './App.css'

function App() {
  const [form, setForm] = useState({
    day: '',
    month: '',
    year: '',
  })

  const [output, setOutput] = useState({
    day: '',
    month: '',
    year: '',
  })

  const calculateAge = (birthDate) => {
    const today = new Date()
    // month - 1 because the monthIndex starts at 0 
    const birthDay = new Date(birthDate.year, birthDate.month - 1, birthDate.day)
    const ageInMilliseconds = today - birthDay

    const millisecondsInDay = 86400000
    const daysInYear = 365.25
    const daysInMonth = 30.44


    // I added a function to see if it improves these repetitive calculations. I don't think it does.
    const findElapsed = (units, daysInUnit = 1) => {
      return Math.floor(units / daysInUnit)
    }

    const daysElapsedTotal = Math.floor(ageInMilliseconds / millisecondsInDay)
    const yearsElapsed = findElapsed(daysElapsedTotal, daysInYear)
    const yearsRemainder = daysElapsedTotal - (yearsElapsed * daysInYear)
    const monthsElapsed = findElapsed(yearsRemainder, daysInMonth)
    const monthsRemainder = yearsRemainder - (monthsElapsed * daysInMonth)
    const daysElapsed = findElapsed(monthsRemainder)

    return (
      {
        day: daysElapsed,
        month: monthsElapsed,
        year: yearsElapsed
      }
    )

    // 1000 ms in s, 60 s in m, 60 m in h, 24 h in day, 365.25 days in a year
    // ~30.44 days in a month.
    // Between 28 and 31 days in a month, so I'm not thrilled with the accuracy
    // of this method. But I'm doing this to practice react and css, so I don't 
    // have sufficient justification to find a more accurate date calculation resource.
  }

  const clickHandler = (event, ) => {
    setOutput(
      calculateAge(form)
    )
    console.log(output)
  }

  return (
    <div className='app'>
      <form className="input">
        <label>day
          <input type='number' placeholder='DD' value={ form.day } onChange={e => {
            setForm({...form, day: e.target.value})
          }} />
        </label>
        <label >month
          <input type='number' placeholder='MM' value={ form.month } onChange={e => {
            setForm({...form, month: e.target.value})
          }} />
        </label>
        <label>year
          <input  type='number' placeholder='YYYY' value={ form.year } onChange={e => {
            setForm({...form, year: e.target.value})
          }} />
        </label>
      </form>
      <div className='divider'>
      <hr/>
      <input type='image' src={ arrowUrl } className='arrow' onClick={ clickHandler } /></div> 
      <div className='output'>
        <p className='big-bold'><span className='purple'>{ output.year }</span> years</p>
        <p className='big-bold'><span className='purple'>{ output.month }</span> months</p>
        <p className='big-bold'><span className='purple'>{ output.day }</span> days</p>
      </div>
    </div>
  )
}

export default App

// Steps: 
// X 1. create components with placeholder content
// X 2. create initial style - layout and font, set color variables
// X 3. begin managing state - input
// X 4. manage state for output, return 100-input (that's a minus)
// X 5. style inputs and outputs
// X 6. replace placeholder output function with a real now-input function
// 7. refine styling with border-radius, sizing, and colors
// 8. add error messaging
// 9. style error messaging
// 10. add hover and other conditional styles
// 11. add animation on result
// 12. confirm mobile design, tweak as necessary
// 12. test according to readme
// 13. fix issues identified in testing


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
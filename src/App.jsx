import { useState } from 'react'
import arrowUrl from './assets/images/icon-arrow.svg'
import './App.css'
import Inputs from './components/Inputs.jsx'
import { isExists, intervalToDuration } from 'date-fns'
import OutputRow from './components/OutputRow.jsx'


function App() {
  const currentYear = new Date().getFullYear()
  const monthStrings = {
    day: '',
    month: '',
    year: '',
  }

  const [form, setForm] = useState(monthStrings)
  const [output, setOutput] = useState(monthStrings)
  const [errors, setErrors] = useState(monthStrings)

  const calculateAge = (birthDate) => {
    // initially, I calculated this myself using Date objects. However, date objects can't identify invalid dates,
    // even using methods which exist for that specific purpose, at least in my current broswer. I solved this 
    // issue, and improved the quality of this calculation considerably, by making use of the library date-fns.
    const pastDateExists = isExists(parseInt(birthDate.year), parseInt(birthDate.month-1), parseInt(birthDate.day))

    return new Promise((resolve, reject) => {
      if (pastDateExists) {

        const today = new Date()
        const dateIsoString = `${birthDate.year.padStart(4, '0')}-${birthDate.month.padStart(2, '0')}-${birthDate.day.padStart(2, '0')}`
        const birthDay = new Date(dateIsoString)

        const difference = intervalToDuration({
          start: today,
          end: birthDay
        })

        resolve({
          day: difference.days.toString(),
          month: difference.months.toString(),
          year: difference.years.toString()
        });

      } else {
        console.log('date does not exist, in else in promise')
        // month and year strings in errors get a space to add styling to the month and year form elements, in Entry
        setErrors({
          day: 'Must be a valid date',
          month: " ",
          year: ' '
        })
        reject('Invalid Date')
      }
    })
  } 
    

  const formValidator = () => {
    /*
    - Receive validation errors if:
    - Any field is empty when the form is submitted
    - The day number is not between 1-31
    - The month number is not between 1-12
    - The year is in the future
    - The date is invalid e.g. 31/04/1991 (there are 30 days in April) 
    */
    const today = new Date()

    const requiredError = 'This field is required'
    const dayError = form.day === '' ? requiredError
                      : (form.day <= 0 || form.day > 31) ? 'Must be a valid day' : '';
    const monthError = form.month === '' ? requiredError
                      : (form.month <= 0 || form.month > 12) ? 'Must be a valid month' : '';
    const yearError = form.year === '' ? requiredError
                      : form.year > today.getFullYear() ? 'Must be in the past' : '';
    const allErrors = {day: dayError, month: monthError, year: yearError}
    const noErrors = Object.values(allErrors).every(error => error === '') 
    // This is my first time adding a promise to my own project. I have doubts about whether
    // handling errors here instead of after rejecting the promise is acceptable
    return new Promise((resolve, reject) => {
      if (noErrors) {
        resolve(setErrors(allErrors));
      } else {
        Object.entries(allErrors).forEach(([errorField, errorString]) => {
          if (errorString != '') {
            console.error(`${errorField}: ${errorString}`)
          }
        setErrors(allErrors)
        reject('Errors in form validation');
        })
      }
    });
  }

  const clickHandler = (event) => {
    // event.preventDefault();
    formValidator(form)
      .then(() => calculateAge(form))
      .then((ageOutput) => setOutput(ageOutput))
      .catch(error => {
        setOutput(monthStrings)
        console.error(error)
      })
  }

  return (
    <div className='app'>
      <Inputs form={ form } setForm={ setForm } errors={ errors } />
      <div className='divider'>
        <hr/>
        <input type='image' src={ arrowUrl } className='arrow' onClick={ clickHandler } />
        <hr className='mobile-only'/>
      </div> 
      <div className='output'>
        <OutputRow output={ output } field={ 'year' } />
        <OutputRow output={ output } field={ 'month' } /> 
        <OutputRow output={ output } field={ 'day' } /> 
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
// X 7. refine styling with border-radius, sizing, and colors
// X 8. add data validation and error messaging
// X 9. style error messaging
// X 10. add hover and other conditional styles
// X11. add animation on result
// 12. confirm mobile design, tweak as necessary
// 12. test according to readme - test data validation with first and last day of year
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
import { useState } from 'react'
import arrowUrl from './assets/images/icon-arrow.svg'
import './App.css'
import Inputs from './components/Inputs.jsx'
import { isExists, compareDesc, intervalToDuration } from 'date-fns' // https://date-fns.org/docs/
import OutputRow from './components/OutputRow.jsx'

function App() {
  const currentYear = new Date().getFullYear()
  const initialObject = {
    day: '',
    month: '',
    year: '',
  }

  const [form, setForm] = useState(initialObject)
  const [output, setOutput] = useState(initialObject)
  const [errors, setErrors] = useState(initialObject)

  const calculateAge = (birthDate) => {
    // initially, I calculated this myself using Date objects. 
    // However, date objects can't identify invalid dates, even 
    // using methods which exist for that specific purpose, at 
    // least in my current broswer. I solved this issue and 
    // improved the quality of this calculation by using date-fns.
    const pastDateExists = isExists(parseInt(birthDate.year), parseInt(birthDate.month-1), parseInt(birthDate.day))
    if (pastDateExists) {

      const today = new Date()
      const dateIsoString = `${birthDate.year.padStart(4, '0')}-${birthDate.month.padStart(2, '0')}-${birthDate.day.padStart(2, '0')}`
      const birthDay = new Date(dateIsoString)

      const isAfter = compareDesc(birthDay, today) // returns -1 if today is before birthday
      if (isAfter >= 0) {
        const difference = intervalToDuration({
          start: today,
          end: birthDay
        })
  
        return Promise.resolve({
          day: difference.days.toString(),
          month: difference.months.toString(),
          year: difference.years.toString()
        });  

      } else {
        return Promise.reject({
          day: 'Date must be in the past',
          month: ' ',
          year: ' '
        })
      }
    } else {
      // month and year strings in errors get a space to add styling to the month and year form elements, 
      // in Entry
      return Promise.reject({
        day: 'Must be a valid date',
        month: ' ',
        year: ' '
      })
    }
  } 
    

  const formValidator = (form) => {
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

    return new Promise((resolve, reject) => {
      if (noErrors) {
        resolve();
      } else {
        // I previously logged these errors to the console, but removed that behavior.
        // I prefer to reserve console logs for software errors, and address user errors
        // in the GUI.
        reject(allErrors)
      }
    });
  }

  const clickHandler = (event) => {
    formValidator(form)                               // Are forms filled out correctly?
      .then(() => calculateAge(form))                 // Calculate the age, or reject.
      .then((ageOutput) => {
        setOutput(ageOutput)                          // Set output to value returned by calculateAge
        setErrors(initialObject)                       // Reset errors to blank
      })      
      .catch(error => {
        setOutput(initialObject)                       // Reset output to blank
        setErrors(error)                              // Set errors to relevant error messages.
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


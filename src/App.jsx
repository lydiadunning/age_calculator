import { useState } from 'react'
import arrowUrl from './assets/images/icon-arrow.svg'
import './App.css'
import Inputs from './components/Inputs.jsx'
import OutputRow from './components/OutputRow.jsx'
import formValidator from './functions/formValidator.js'
import calculateAge from './functions/calculateAge.js'

function App() {
  const currentYear = new Date().getFullYear()
  // This project addresses day, month, and year in sequence, 
  // rather than consolidating changes to these properties in 
  // a forEach or something. I believe that with only three
  // properties, consistent parallelism is easier to read and 
  // understand than the alternatives, with no significant 
  // drawbacks.
  const initialObject = {
    day: '',
    month: '',
    year: '',
  }

  const [form, setForm] = useState(initialObject)
  const [output, setOutput] = useState(initialObject)
  const [errors, setErrors] = useState(initialObject)

  const clickHandler = (event) => {
    formValidator(form)                               // Are forms filled out correctly?
      .then(() => calculateAge(form))                 // Calculate the age, or reject.
      .then((ageOutput) => {
        console.log(ageOutput)
        setOutput(ageOutput)                          // Set output to value returned by calculateAge
        setErrors(initialObject)                       // Reset errors to blank
      })      
      .catch(error => {
        console.log(error)
        setOutput(initialObject)                       // Reset output to blank
        setErrors(error)                              // Set errors to relevant error messages.
      })
  }

  return (
    <div className='app'>
      <Inputs form={ form } setForm={ setForm } errors={ errors } setErrors={ setErrors } />
      <div className='divider'>
        <hr/>
        <input type='image' src={ arrowUrl } className='arrow' onClick={ clickHandler } />
        <hr className='narrow-only'/>
      </div> 
      <div className='output'>
        <OutputRow output={ output } field= 'year' />
        <OutputRow output={ output } field= 'month' /> 
        <OutputRow output={ output } field= 'day' /> 
      </div>
    </div>
  )
}

export default App


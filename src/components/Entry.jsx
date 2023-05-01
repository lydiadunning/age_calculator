const Entry = ({ entry, placeholder, form, setForm, errors, setErrors }) => {
  const error = errors[entry];

  const ErrorMessage = ({ error }) => {
		if (error.length > 0) { 
			return <p className='error'>{ error }</p>
		}
	}
	
	const getClass = (error) => {
		return error.length > 0 ? 'hasError' : ''
	}

  return (
    <label className={ getClass(error) } >{ entry }
      <input type='text' inputMode='numeric' placeholder={ placeholder } 
        value={ form[ entry ] } onChange={ e =>  
        { setForm({ ...form, [entry]: e.target.value })
        // added the ability to change errors to reset red error styling on
        // entering new values. It would be better if I implemented input 
        // validation here, but that would take a lot of work.
          setErrors({
            day: '',
            month: '',
            year: '',
          })
        }} />
      <ErrorMessage error={ error } />
    </label>
  )
}

export default Entry
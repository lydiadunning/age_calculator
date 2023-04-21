const Entry = ({ entry, placeholder, error, form, setForm }) => {

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
        }} />
      <ErrorMessage error={error} />
    </label>
  )
}

export default Entry
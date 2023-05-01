import Entry from './Entry.jsx'

const Inputs = ({ form, setForm, errors, setErrors }) => {

  return(
		<form className="input">
			{/* I don't like passing six props here, but I'm not sure how to separate it out. Maybe using context would help? */}
			<Entry entry='day' placeholder='DD' 
						 form={ form } setForm={ setForm }
						  errors={ errors } setErrors={ setErrors }/>
			<Entry entry='month' placeholder='MM' 
						 form={ form } setForm={ setForm } 
						 errors={ errors } setErrors={ setErrors }/>
			<Entry entry='year' placeholder='YYYY'
						 form={ form } setForm={ setForm } 
						 errors={ errors }  setErrors={ setErrors }/>
	</form>
	)
}

export default Inputs;
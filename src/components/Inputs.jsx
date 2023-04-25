import Entry from './Entry.jsx'

const Inputs = ({ form, setForm, errors }) => {

  return(
		<form className="input">
			<Entry entry='day' placeholder='DD' error={ errors.day } 
						 form={ form } setForm={ setForm }/>
			<Entry entry='month' placeholder='MM' error={ errors.month } 
						 form={ form } setForm={ setForm } />
			<Entry entry='year' placeholder='YYYY' error={ errors.year } 
						 form={ form } setForm={ setForm } />
	</form>
	)
}

export default Inputs;
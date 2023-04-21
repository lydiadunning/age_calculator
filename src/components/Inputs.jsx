import Entry from './Entry.jsx'

const Inputs = ({ form, setForm, errors }) => {



	// const formChangeHandler = ( e ) => {
	// 	setForm({ ...form, [entry]: e.target.value.padStart(entry === 'year' ? 4 : 2, '0') })
	// }
	

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
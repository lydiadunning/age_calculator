const formValidator = (form) => {
  const today = new Date()

  const requiredError = 'This field is required'
  const dayError = form.day === '' ? requiredError
                    : (form.day <= 0 || form.day > 31) ? 'Must be a valid day' : '';
  const monthError = form.month === '' ? requiredError
                    : (form.month <= 0 || form.month > 12) ? 'Must be a valid month' : '';
  const yearError = form.year === '' ? requiredError
                    : form.year > today.getFullYear() ? 'Must be in the past' : '';
  const allErrors = {
    day: dayError, 
    month: monthError, 
    year: yearError
  }
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

export default formValidator
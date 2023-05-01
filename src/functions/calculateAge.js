import { isExists, compareDesc, intervalToDuration } from 'date-fns' // https://date-fns.org/docs/

const calculateAge = (birthDate) => {
  console.log('in calculate age')
  console.log(birthDate)
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
    console.log(isAfter)
    if (isAfter >= 0) {
      const elapsed = intervalToDuration({ // returns time elapsed by years, months, days, etc.
        start: today,
        end: birthDay
      })
      console.log({
        day: elapsed.days.toString(),
        month: elapsed.months.toString(),
        year: elapsed.years.toString()
      })
      return Promise.resolve({
        day: elapsed.days.toString(),
        month: elapsed.months.toString(),
        year: elapsed.years.toString()
      });  

    } else {
    // month and year strings in errors get a space to add styling to the month and year form elements, 
    // in the Entry component
      console.log({
        day: 'Date must be in the past',
        month: ' ',
        year: ' '
      })
      return Promise.reject({
        day: 'Date must be in the past',
        month: ' ',
        year: ' '
      })
    }
  } else {
    // month and year strings in errors get a space to add styling to the month and year form elements, 
    // in the Entry component
    console.log({
      day: 'Must be a valid date',
      month: ' ',
      year: ' '
    })
    return Promise.reject({
      day: 'Must be a valid date',
      month: ' ',
      year: ' '
    })
  }
} 
  
export default calculateAge
const FMAttribution = () => {
  const fmLink = 'https://www.frontendmentor.io?ref=challenge'
  const challengeLink = 'https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q'
  const portfolioLink = 'https://lydiadunning.github.io/Portfolio/'

  return(
    <div className="attribution"> 
      <a href={ challengeLink } target='_blank'>Challenge</a>  by <a href={ fmLink } target="_blank">Frontend Mentor</a>. 
      Coded by <a href={ portfolioLink }>Lydia Dunning</a>.
    </div>
  )
}

export default FMAttribution
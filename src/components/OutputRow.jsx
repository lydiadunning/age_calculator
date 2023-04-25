const OutputRow = ({ output, field }) => {
  // OutputRow makes a worthwhile component because of its fiddly conditional details.
  // Multiple changes occur depending on one value, so the hook for this component needs
  // very few props, where equivalent jsx in the parent document would require several 
  // extra lines or a lengthy element definition.
  // This feels like one of those use-cases React was designed for.
  const textOutput = output[field] ? output[field] : '- -'
  const classes = output[field] ? 'purple' : 'purple no-output'

  return (
    <p><span className={ classes }>{ textOutput }</span><span> {`${field}s`}</span></p>
  )
}

export default OutputRow;
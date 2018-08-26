import React from 'react'
import './Suggestions.scss'

class Suggestions extends React.Component {
  render() {
    return(
      <div className="suggestions">
        <div className="title">Have a suggestion?</div>
        <textarea />
        <button>Send</button>
      </div>
    )
  }
}

export default Suggestions

import React from 'react'
import { withRouter } from 'react-router'
import './Suggestions.scss'

class Suggestions extends React.Component {
  send = () => {
    this.props.history.push('/')
  }
  render() {
    return(
      <div className="suggestions">
        <div className="panel">
          <div className="title">Send your suggestion</div>
          <textarea placeholder="Suggestion" />
          <button onClick={this.send}>Send</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Suggestions)

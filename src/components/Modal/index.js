import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import './Modal.scss'

class Modal extends React.Component {
  close() {

  }

  render() {
    const {children, modal} = this.props
    const showHide = modal ? 'modal display-block' : 'modal display-none'
    return (
      <div className={showHide}>
        <section className='modal-main'>
          {children}
          <button onClick={this.close}>close</button>
        </section>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    modal: store.modal
  }
}

export default connect(mapStateToProps, actions)(Modal)

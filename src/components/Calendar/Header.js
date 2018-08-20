import React, { PureComponent } from 'react'

class Header extends PureComponent {
  render() {
    const { title, next, prev } = this.props

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prev}>chevron_left</div>
        </div>
        <div className="col col-center">
          <span>{title}</span>
        </div>
        <div className="col col-end" onClick={next}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }
}

export default Header

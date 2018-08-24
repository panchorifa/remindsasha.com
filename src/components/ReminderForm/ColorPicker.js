import React from 'react'

class ColorPicker extends React.Component {
  state = {
    selectedColor: null
  }

  handleClick(color) {
    this.setState({selectedColor: color})
  }

  render() {
    const {colors} = this.props
    const {selectedColor} = this.state
    const colorBalls = colors.map(color =>
      <div className='color'
        onClick={() => this.handleClick(color)}
        style={{
          opacity: selectedColor === color ? 1 : .3,
          backgroundColor: color}}/>
    )
    return (
      <div className='colors'>
        {colorBalls}
      </div>
    )
  }
}

export default ColorPicker

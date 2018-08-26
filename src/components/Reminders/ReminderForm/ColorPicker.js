import React from 'react'
import './ColorPicker.scss'

class ColorPicker extends React.Component {
  render() {
    const {colors, selectedColor} = this.props
    const colorBalls = colors.map(color =>
      <div key={color} className='color'
        onClick={() => this.props.onClick(color)}
        style={{
          opacity: selectedColor === color ? 1 : .1,
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

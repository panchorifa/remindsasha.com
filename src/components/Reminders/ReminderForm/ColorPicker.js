import React from 'react'
import './ColorPicker.scss'

class ColorPicker extends React.Component {
  render() {
    const {colors, selectedColor} = this.props

    const colorBalls = colors.map(color =>
      <div key={color} className='color'
        onClick={() => this.props.onClick(color)}
        style={{
          // border: selectedColor === color ? '6px solid #888' : '6px solid #fff',
          // opacity: selectedColor === color ? 1 : .1,
          backgroundColor: color}}>
            <span
              style={{display: selectedColor === color ? 'block' : 'none'}}
              className="material-icons md-24">check</span>
          </div>
    )
    return (
      <div className='colors'>
        {colorBalls}
      </div>
    )
  }
}

export default ColorPicker

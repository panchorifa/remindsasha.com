import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Routes from './Routes'
import './App.scss';

class App extends Component {

  render() {
    return (
      <div className='app'>
        <div className='app-header'>
          <Header/>
        </div>
        <div className='app-content'>
          <div className="content">
            <Routes/>
          </div>
        </div>
        <div className='app-footer'>
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App

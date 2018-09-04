import React  from "react"
import Header from "./Header"
import Routes from "./Routes"
import Footer from "./Footer"
import "./App.scss"

export default () =>
  <div className="app content">
    <Header/>
    <Routes/>
    <Footer/>
  </div>

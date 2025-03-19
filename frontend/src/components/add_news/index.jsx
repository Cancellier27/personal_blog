import "./add_news.css"
import NavBar from "../nav_bar"
import axios from "axios"
import {useNavigate} from "react-router"
import {useState} from "react"

export default function AddNews() {
  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">ADD NEWS</div>
    </div>
  )
}

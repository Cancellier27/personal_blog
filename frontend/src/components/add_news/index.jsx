import "./add_news.css"
import NavBar from "../nav_bar"
import axios from "axios"
import {useNavigate} from "react-router"
import {useState} from "react"

export default function AddNews() {
  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">

        <div>
          <form action="" className="add-news-form">
            <label htmlFor="cardTitle">Card Title</label>
            <input type="text" id="cardTitle" name="cardTitle" />
            <label htmlFor="cardDescription">Card news description</label>
            <textarea type="text" id="cardDescription" name="cardDescription" />
            <button type="button" >Upload thumbnail</button>
            <br />
            <br />
            <label htmlFor="newsTitle">News Title</label>
            <input type="text" id="newsTitle" name="newsTitle" />
            <label htmlFor="newsContent">News Title</label>
            <textarea type="text" id="newsContent" name="newsContent" />
            <button type="button" >Upload image</button>
            <button type="submit" >Submit</button>
          </form>
        </div>
        
        </div>
    </div>
  )
}

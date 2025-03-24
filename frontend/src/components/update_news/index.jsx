import "./update_news.css"
import NavBar from "../nav_bar"
import axiosInstance from "../../tools/axios_instance"
import {useNavigate} from "react-router"
import {useEffect, useState} from "react"
import {getTodayDate, getUser} from "../../tools/utils"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash, faPen} from "@fortawesome/free-solid-svg-icons"

export default function EditNews() {
  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <h2>Update news:</h2>

        <div className="update-card-main-container">

          <div className="update-card-container">
            <div className="update-card-titles">
              <h5>News card title</h5>
              <h5>News title</h5>
            </div>
            <div className="update-card-icons">
              <FontAwesomeIcon icon={faPen} className="update-card-pen" color="red" />
              <FontAwesomeIcon icon={faTrash} className="update-card-trash" /> 
            </div>
          </div>

          <div className="update-card-container">
            <div className="update-card-titles">
              <h5>News card title</h5>
              <h5>News title</h5>
            </div>
            <div className="update-card-icons">
              <FontAwesomeIcon icon={faPen} className="update-card-pen" />
              <FontAwesomeIcon icon={faTrash} className="update-card-trash" /> 
            </div>
          </div>


        </div>
      </div>
    </div>
  ) 
}

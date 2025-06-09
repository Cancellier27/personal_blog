import {NavLink, useNavigate} from "react-router"
import {useState, useEffect} from "react"
import "./footer.css"
import axiosInstance from "../../tools/axios_instance"
import {getUserLogged} from "../../tools/utils"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faMagnifyingGlass,
  faPaperPlane,
  faRightToBracket,
  faXmark,
  faUser,
  faFileLines,
  faPen
} from "@fortawesome/free-solid-svg-icons"

export default function MainFooter() {
  return (
    <section id="footer-section">
      <div className="footer-container">
        <h4>FCC</h4>
        <p>All rights reserved &#169; </p>
      </div>
    </section>
  )
}

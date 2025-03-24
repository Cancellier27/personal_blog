import "./update_news.css"
import NavBar from "../nav_bar"
import UpdateCard from "./update_card"
import axiosInstance from "../../tools/axios_instance"
import {useEffect, useState} from "react"

export default function EditNews() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const getNews = async () => {
      try {
        await axiosInstance.get("/newsInformation").then((res) => {
          let dataArr = []
          Object.keys(res.data).forEach((key) => {
            // create a news array with the updated news from backend
            dataArr.push([key, res.data[key]])
          })
          setNews(dataArr)
        })
      } catch (error) {
        console.error("Error while fetching the news data!", error)
      }
    }
    getNews()
  }, [])

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <h2>Update news:</h2>

        <div className="update-card-main-container">
          {news.map((item) => {
            return (
              <UpdateCard
                cardTitle={item[1].card.title}
                newsTitle={item[1].news.title}
                newsId={item[0]}
                key={item[0]}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

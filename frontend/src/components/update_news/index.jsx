import "./update_news.css"
import NavBar from "../nav_bar"
import UpdateCard from "./update_card"
import axiosInstance from "../../tools/axios_instance"
import { useEffect, useState } from "react"

export default function UpdateNews() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axiosInstance.get("/newsInformation")
        let dataArr = Object.keys(res.data).map((key) => [key, res.data[key]])
        setNews(dataArr)
      } catch (error) {
        console.error("Error while fetching the news data!", error)
      }
    }
    getNews()
  }, [])

  const handleDelete = (deletedId) => {
    setNews((prevNews) => prevNews.filter(([id]) => id !== deletedId))
  }

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <h2>Update news:</h2>

        <div className="update-card-main-container">
          {news.map(([id, item]) => (
            <UpdateCard
              key={id}
              cardTitle={item.card.title}
              newsTitle={item.news.title}
              newsId={id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

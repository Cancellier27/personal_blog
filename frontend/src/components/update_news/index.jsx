import "./update_news.css"
import NavBar from "../nav_bar"
import UpdateCard from "./update_card"
import axiosInstance from "../../tools/axios_instance"
import { useEffect, useState } from "react"

export default function UpdateNews() {
  const [newsData, setNewsData] = useState([])

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axiosInstance.get("/newsInformation")
        setNewsData([...res.data])
      } catch (error) {
        console.error("f. Error while fetching the news data!", error)
      }
    }
    getNews()
  }, [])

  // update the frontend state when a news is deleted
  const handleDelete = (deletedId) => {
    setNewsData(newsData.filter((news) => news.news_id !== deletedId))
  }

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <h2>Update news:</h2>

        <div className="update-card-main-container">
          {newsData.map((news, index) => (
            <UpdateCard
              key={news.news_id + "-" + index}
              cardTitle={news.card_title}
              newsTitle={news.news_title}
              newsId={news.news_id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

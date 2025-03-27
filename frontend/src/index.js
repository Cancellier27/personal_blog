import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import {BrowserRouter, Routes, Route} from "react-router"

// components
import App from "./App"
import NewsPage from "./components/news_page"
import LoginPage from "./components/login"
import AddNews from "./components/add_news"
import UpdateNews from './components/update_news'
import EditNews from './components/edit_news'

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/news/:newsId" element={<NewsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/add-news" element={<AddNews />} />
      <Route path="/update-news" element={<UpdateNews />} />
      <Route path="/update-news/:newsId" element={<EditNews />} />
    </Routes>
  </BrowserRouter>
)

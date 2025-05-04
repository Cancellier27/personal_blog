import React from "react"
import ReactDOM from "react-dom/client"
import {BrowserRouter, Routes, Route} from "react-router"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"

// Pages
import App from "./App"
import NewsPage from "./pages/news-page/newsPage.jsx"
import LoginPage from "./pages/login/login.jsx"
import AddNews from "./pages/add-news/addNews.jsx"
import ToUpdateNews from './pages/to-update-news/toUpdateNews.jsx'
import EditNews from './pages/edit-news/editNews.jsx'
import SearchNews from './pages/search-news/searchNews.jsx'

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/news/:newsId" element={<NewsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/add-news" element={<AddNews />} />
      <Route path="/update-news" element={<ToUpdateNews />} />
      <Route path="/update-news/:newsId" element={<EditNews />} />
      <Route path="/search-news" element={<SearchNews />} />
    </Routes>
  </BrowserRouter>
)

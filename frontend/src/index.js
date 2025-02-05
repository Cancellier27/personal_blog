import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import {BrowserRouter, Routes, Route} from "react-router"
import App from "./App"
import NewsPage from "./components/news_page"
import LoginPage from "./components/login"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
)

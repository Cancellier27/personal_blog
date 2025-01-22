const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 8000

let UsingName = "FILIPE"


app.use(express.json())
app.use(cors())

app.get("/home", (req, res) => {
  res.json({message: UsingName})
})

app.post("/name", (req, res) => {
  
  const { name } = req.body
  
  UsingName = name

  res.status(201).json(`Name updated to ${name}`)
  
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

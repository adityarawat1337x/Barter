require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const router = require("./Router")
require("colors")
const cors = require("cors")

const corsOptions = {
  credentials: true,
  origin: [process.env.CLIENT_URL],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

//Starting Server
app.listen(port, () => {
  console.log(`\nServer is up on port ${port}`.blue.inverse)
})

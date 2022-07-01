require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const router = require("./Router")
const server = require("http").createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST"],
  },
})

require("colors")
const cors = require("cors")
const {
  putBidOnSocket,
  createSocketProduct,
} = require("./controllers/SocketConstroller")

const corsOptions = {
  credentials: true,
  origin: [process.env.CLIENT_URL],
}

io.on("connection", (socket) => {
  console.log("socket is active: ", socket.id)
  socket.on("bid-update", (payload) => {
    putBidOnSocket(payload).then((resp) => {
      io.emit("bid-updated", resp)
    })
  })

  socket.on("bid-create", (payload) => {
    createSocketProduct(payload).then((resp) => {
      io.emit("bid-created", resp)
    })
  })
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

//Starting Server
server.listen(port, () => {
  console.log(`\nServer is up on port ${port}`.blue.inverse)
})

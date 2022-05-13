require("dotenv").config()
const express = require("express")
const router = express.Router()

const connectDB = require("./DB/mongoose")
const {
  createUser,
  loginUser,
  getUser,
} = require("./controllers/UserController")
const {
  createBid,
  updateBid,
  getAllBids,
  getBid,
} = require("./controllers/BidContoller")

//*Connecting Database
connectDB()

//* USER ROUTES
router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/user/:id", getUser)

//* BIDDING ROUTES
router.post("/bids/create", createBid)
router.post("/bids/:id", updateBid)
router.get("/bids", getAllBids)
router.get("/bids/:id", getBid)

module.exports = router

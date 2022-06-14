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
  createProduct,
  getAllProducts,
  getProduct,
} = require("./controllers/ProductController")
const { putBidOn, getUserBids } = require("./controllers/BidContoller")

//*Connecting Database
connectDB()

//* USER ROUTES
router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/user/:id", getUser)

//* BIDDING ROUTES
router.post("/bids/create", createProduct)
router.get("/bids/user/:id", getUserBids)
router.post("/bids/:id", putBidOn)
router.get("/bids", getAllProducts)
router.get("/bids/:id", getProduct)

module.exports = router

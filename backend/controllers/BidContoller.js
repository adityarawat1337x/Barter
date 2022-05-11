const Bidding = require("../models/biddingModel")
const User = require("../models/userModel")

const createBid = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    if (user) {
      res.cookie("user", user)
      res.status(201).send(user)
    } else res.status(401).send("User Not Found")
  } catch (err) {
    console.log(err.message)
    res.status(400).send(err.message)
  }
}

const updateBid = async (req, res) => {
  const userId = req.body.userId
  const biddingPrice = req.body.price
  const bidId = req.params.id
  const BIDDING = await Bidding.findById(bidId)
  const USER = await User.findById(userId)

  if (!USER || !BIDDING) res.status(404).send("User or Bid not found")

  try {
    //modifying the bid
    if (USER.biddings.length > 0) {
      const oldBid = USER.biddings.find(
        (userBid) => userBid.bid.toString() === bidId.toString()
      )
      if (oldBid === undefined)
        res.status(401).send("You are not allowed to bid on this product")
      USER.cash += oldBid.price
      USER.biddings.splice(USER.biddings.indexOf(oldBid), 1)
      const oldUserBid = BIDDING.bids.find(
        (bidderId) => bidderId.toString() === userId
      )
      BIDDING.bids.splice(BIDDING.bids.indexOf(oldUserBid), 1)

      await BIDDING.save()
      await USER.save()
    }
    //Creating a new Bid
    if (USER.cash >= BIDDING.price) {
      if (biddingPrice < BIDDING.price)
        res.status(401).send("You cannot bid less than the current price")

      USER.cash -= biddingPrice
      USER.biddings.push({
        bid: BIDDING._id,
        price: biddingPrice,
      })
      BIDDING.bids.push(USER._id)
      console.log("check")
      await BIDDING.save()
      await USER.save()
      res.status(201).send(USER)
    } else res.status(401).send("Insufficient Funds")
  } catch (err) {
    res.status(400).send({ Error: err })
  }
}

const getBid = async (req, res) => {
  try {
    const bid = await Bidding.findById(req.params.id)
    res.send(bid)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

const getAllBids = async (req, res) => {
  try {
    const bids = await Bidding.find()
    res.send(bids)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

module.exports = { createBid, updateBid, getBid, getAllBids }

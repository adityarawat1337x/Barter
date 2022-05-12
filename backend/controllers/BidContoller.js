const Bidding = require("../models/biddingModel")
const User = require("../models/userModel")

// {
//   "name": "car",
//   "price": 12000,
//   "ownerId": "627b83ce426df4205e8a0b3d",
//   "photo": "awdawda"
// }

const createBid = async (req, res) => {
  const { name, price, ownerId, photo, expire } = req.body
  const data = { name, price, ownerId, photo, expire }
  try {
    const resp = await Bidding.create(data)
    res.status(201).send(resp)
  } catch (err) {
    res.status(400).send(err)
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
    //modifying if bid is already made
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

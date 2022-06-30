const User = require("../models/userModel")
const Product = require("../models/ProductModel")
const Bidding = require("../models/BiddingsModel")
const { updatePrice } = require("./ProductController")

const getUserBids = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const bids = await Bidding.find({ user: user._id })
    res.send(bids)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

const updatePreviousBid = async (res, USER, PRODUCT, biddingPrice, oldBid) => {
  console.log(oldBid)
  if (USER.funds >= PRODUCT.price - oldBid.price) {
    if (biddingPrice <= PRODUCT.price) {
      return res.status(401).send({
        error: "You cannot bid less than or equal to the current price",
      })
    }
    USER.funds -= PRODUCT.price - oldBid.price
    oldBid.price = biddingPrice
    await oldBid.save()
    await USER.save()
    await updatePrice(PRODUCT)
    return res.status(201).send(oldBid)
  } else {
    return res.status(401).send({ error: "Insufficient Funds" })
  }
}

const createNewBid = async (res, USER, PRODUCT, biddingPrice) => {
  if (USER.funds >= PRODUCT.price) {
    if (biddingPrice <= PRODUCT.price)
      return res.status(401).send({
        error: "You cannot bid less than or equal to the current price",
      })

    USER.funds -= biddingPrice
    const newBid = Bidding.create({
      user: USER._id,
      product: PRODUCT._id,
      price: biddingPrice,
    })
    await USER.save()
    await updatePrice(PRODUCT)
    return res.status(201).send(newBid)
  } else return res.status(401).send({ error: "Insufficient Funds" })
}

const putBidOn = async (req, res) => {
  const userId = req.body.userId
  const biddingPrice = req.body.price
  const bidId = req.body.id
  const PRODUCT = await Product.findById(bidId)
  const USER = await User.findById(userId)

  if (!USER || !PRODUCT)
    res.status(404).send({ error: "User or Product not found" })

  try {
    const oldBid = await Bidding.findOne({ user: userId, product: bidId })
    let resp
    if (oldBid) {
      return updatePreviousBid(res, USER, PRODUCT, biddingPrice, oldBid)
    } else {
      return createNewBid(res, USER, PRODUCT, biddingPrice)
    }
  } catch (err) {
    res.status(400).send({ Error: "Unknown Error" })
  }
}

const putBidOnSocket = async (bid) => {
  const userId = bid.userId
  const biddingPrice = bid.price
  const bidId = bid.id
  const PRODUCT = await Product.findById(bidId)
  const USER = await User.findById(userId)

  if (!USER || !PRODUCT)
    res.status(404).send({ error: "User or Product not found" })

  try {
    const oldBid = await Bidding.findOne({ user: userId, product: bidId })
    let res = {}
    if (oldBid) {
      if (USER.funds >= PRODUCT.price - oldBid.price) {
        if (biddingPrice <= PRODUCT.price) {
          return {
            error: "You cannot bid less than or equal to the current price",
          }
        }
        USER.funds -= PRODUCT.price - oldBid.price
        oldBid.price = biddingPrice
        await oldBid.save()
        await USER.save()
        return await updatePrice(PRODUCT)
      } else {
        return { error: "Insufficient Funds" }
      }
    } else {
      if (USER.funds >= PRODUCT.price) {
        if (biddingPrice <= PRODUCT.price)
          return res.status(401).send({
            error: "You cannot bid less than or equal to the current price",
          })

        USER.funds -= biddingPrice
        const newBid = Bidding.create({
          user: USER._id,
          product: PRODUCT._id,
          price: biddingPrice,
        })
        await USER.save()
        await updatePrice(PRODUCT)
        return newBid
      } else return { error: "Insufficient Funds" }
    }
  } catch (err) {
    return { Error: "Unknown Error" }
  }
}
module.exports = { putBidOn, getUserBids, putBidOnSocket }

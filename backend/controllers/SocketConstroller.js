const User = require("../models/userModel")
const Product = require("../models/ProductModel")
const Bidding = require("../models/BiddingsModel")
const { updatePrice } = require("./ProductController")

const chooseWinner = async (newProduct) => {
  try {
    const bidding = await Bidding.find({ productId: newProduct._id })
    const highestBid = bidding.sort((a, b) => b.price > a.price)[0]
    const winnerUser = await User.findById(highestBid.user)
    winnerUser.wins.push(newProduct._id)
    await winnerUser.save()
    console.log("winner", winnerUser)
    bidding.map((bid) => {
      bid.remove()
    })
  } catch (e) {
    console.error(e)
  }
}

const createSocketProduct = async (item) => {
  const { name, price, ownerId, photo, expire } = item

  try {
    const newProduct = await Product.create(item)
    const owner = await User.findById(ownerId)
    owner.selling.push({ _id: newProduct._id, price: newProduct.price })
    await owner.save()
    let sec = parseInt(new Date(newProduct.expire) - new Date())
    console.log(sec)
    setTimeout(() => {
      chooseWinner(newProduct)
    }, sec)
    return newProduct
  } catch (err) {
    return err
  }
}

const updatePreviousBid = async (USER, PRODUCT, biddingPrice, oldBid) => {
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
}

const createNewBid = async (USER, PRODUCT, biddingPrice) => {
  if (USER.funds >= PRODUCT.price) {
    if (biddingPrice <= PRODUCT.price)
      return {
        error: "You cannot bid less than or equal to the current price",
      }

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

const putBidOnSocket = async (bid) => {
  const userId = bid.userId
  const biddingPrice = bid.price
  const bidId = bid.id
  const PRODUCT = await Product.findById(bidId)
  const USER = await User.findById(userId)

  if (!USER || !PRODUCT) return { error: "User or Product not found" }

  try {
    const oldBid = await Bidding.findOne({ user: userId, product: bidId })
    if (oldBid) {
      return updatePreviousBid(USER, PRODUCT, biddingPrice, oldBid)
    } else {
      return createNewBid(USER, PRODUCT, biddingPrice)
    }
  } catch (err) {
    return { Error: "Unknown Error" }
  }
}

module.exports = { putBidOnSocket, createSocketProduct }

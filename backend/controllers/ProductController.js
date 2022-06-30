const Bidding = require("../models/BiddingsModel")
const Product = require("../models/ProductModel")
const User = require("../models/userModel")

const chooseWinner = async (newProduct) => {
  try {
    const bidding = await Bidding.find({ productId: newProduct._id })
    console.log(bidding)
    const highestBid = bidding.sort((a, b) => b.price > a.price)[0]
    const winnerUser = await User.findById(highestBid.user)
    winnerUser.wins.push(newProduct._id)
    await winnerUser.save()
    bidding.map((bid) => {
      bid.remove()
    })
  } catch (e) {
    console.error(e)
  }
}

const createProduct = async (req, res) => {
  const { name, price, ownerId, photo, expire } = req.body
  const data = { name, price, ownerId, photo, expire }

  try {
    const newProduct = await Product.create(data)
    const owner = await User.findById(ownerId)
    owner.selling.push({ _id: newProduct._id, price: newProduct.price })
    await owner.save()
    let sec = parseInt(new Date(newProduct.expire) - new Date())
    setTimeout(() => {
      chooseWinner(newProduct)
    }, sec)
    res.status(201).send(newProduct)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getAllProducts = async (req, res) => {
  try {
    const bids = await Product.find()
    bids.filter((bid) => {
      bid.expire > Date.now()
    })
    res.send(bids)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

const getProduct = async (req, res) => {
  try {
    const bid = await Product.findById(req.params.id)
    res.send(bid)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

const updatePrice = async (product) => {
  try {
    const bids = await Bidding.find({ product: product._id })
    const highestBid = bids.reduce((a, b) => (a.price > b.price ? a : b))
    product.price = highestBid.price
    await product.save()
    return product
  } catch (e) {
    console.log(e)
  }
}

module.exports = { createProduct, getProduct, getAllProducts, updatePrice }

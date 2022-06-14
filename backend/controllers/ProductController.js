const Bidding = require("../models/BiddingsModel")
const Product = require("../models/ProductModel")
const User = require("../models/userModel")

const createProduct = async (req, res) => {
  const { name, price, ownerId, photo, expire } = req.body
  const data = { name, price, ownerId, photo, expire }
  try {
    const resp = await Product.create(data)
    const owner = await User.findById(ownerId)
    owner.selling.push({ _id: resp._id, price: resp.price })
    await owner.save()
    res.status(201).send(resp)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getAllProducts = async (req, res) => {
  try {
    const bids = await Product.find()
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
  } catch (e) {
    console.log(e)
  }
}

module.exports = { createProduct, getProduct, getAllProducts, updatePrice }

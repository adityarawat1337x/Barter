const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const BiddingSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    product: {
      type: ObjectId,
      ref: "Product",
    },
    price: Number,
  },
  {
    timestamps: true,
  }
)

const Bidding = mongoose.model("Bidding", BiddingSchema)
module.exports = Bidding

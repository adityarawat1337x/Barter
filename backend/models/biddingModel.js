const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const BiddingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    bids: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    photo: {
      type: String,
      // required: true,
    },
    expire: {
      type: {
        date: Date,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Bidding = mongoose.model("Bidding", BiddingSchema)

module.exports = Bidding

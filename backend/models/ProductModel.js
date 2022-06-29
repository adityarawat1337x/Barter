const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ProductSchema = new Schema(
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
    photo: {
      type: String,
      // required: true,
    },
    expire: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

//ProductSchema.index({ expire: 1 }, { expireAfterSeconds: 0 })

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product

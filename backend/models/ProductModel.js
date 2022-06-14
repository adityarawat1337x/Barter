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
      date: {
        type: Date,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
)

// ProductSchema.pre("save", async function (next) {
//   const doc = this
//   const sec = (new Date(doc.expire.date) - new Date()) / 1000
//   ProductSchema.index({ createdAt: 1 }, { expireAfterSeconds: sec })
//   next()
// })

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product

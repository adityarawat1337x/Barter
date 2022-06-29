const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
    },
    selling: [
      {
        _id: {
          type: ObjectId,
          ref: "Bidding",
        },
        price: Number,
      },
    ],
    funds: {
      type: Number,
      default: 10000000,
    },
    wins: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
)

//Encrypting password before saving to database
userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8)
  next()
})

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email })
  if (!user) throw new Error("Invaild email!")
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invaild password!")
  return user
}

const User = mongoose.model("User", userSchema)

module.exports = User

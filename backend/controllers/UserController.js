const User = require("../models/userModel")

const createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  try {
    //Saving data to database
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    if (user) {
      res.cookie("user", user)
      res.status(201).send(user)
    } else res.status(401).send("User Not Found")
  } catch (err) {
    console.log(err.message)
    res.status(400).send(err.message)
  }
}

module.exports = { loginUser, createUser }

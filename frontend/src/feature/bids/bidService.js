import axios from "axios"

const API_URL = "http://localhost:5000/bids"

const create = async (bid) => {
  const response = await axios.post(API_URL + "/create", bid)
  return response.data
}

const update = async (bid, bid_id) => {
  const response = await axios.post(API_URL + "/" + bid_id, bid)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const getBid = async (bid_id) => {
  const response = await axios.get(API_URL + "/" + bid_id)
  return response.data
}

const getUserBids = async (user_id) => {
  const response = await axios.get(API_URL + "/user/" + user_id)
  return response.data
}

const bidService = {
  create,
  update,
  getAll,
  getBid,
  getUserBids,
}
export default bidService

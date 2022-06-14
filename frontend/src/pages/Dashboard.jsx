import { VStack, Heading, Spacer, Wrap, WrapItem } from "@chakra-ui/react"
import { React, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import BiddingModal from "../components/BiddingModal"
import CreateBid from "../components/CreateBid"
import { getUser } from "../feature/auth/authSlice"
import { getAllBids, getUserBids } from "../feature/bids/bidSlice"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { user, isLoading } = useSelector((state) => state.auth)
  const { sell: userSellProducts } = useSelector((state) => state.items.bids)
  const { buy: userBuyProducts } = useSelector((state) => state.items.bids)

  useEffect(() => {
    if (!user && !isLoading && location.pathname === "/") {
      toast.error("You must be logged in to view this page")
      navigate("/login")
    }
  }, [user, isLoading])

  useEffect(() => {
    if (user) {
      dispatch(getUser(user._id))
      dispatch(getUserBids(user._id))
    }
  }, [])

  return user ? (
    <AnimatedRouteWrapper>
      <VStack>
        <CreateBid />
        <Spacer />
        {selling(user)}
        {bidding(userBuyProducts)}
      </VStack>
    </AnimatedRouteWrapper>
  ) : (
    <></>
  )
}

const selling = (user) => (
  <>
    <Heading
      w="100%"
      justifyContent="flex-start"
      display={user && user.selling && user.selling[0] ? "block" : "none"}
    >
      You are selling
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {user && user.selling && user.selling[0] ? (
        user.selling.map((product, idx) => (
          <WrapItem key={idx}>
            <BiddingModal productId={product._id}></BiddingModal>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

const bidding = (userBuyProducts) => (
  <>
    <Heading
      w="100%"
      justifyContent="flex-start"
      display={userBuyProducts ? "block" : "none"}
    >
      You are bidding on
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {userBuyProducts ? (
        userBuyProducts.map((bid, idx) => (
          <WrapItem key={idx}>
            <BiddingModal bid={{ _id: bid.product }}></BiddingModal>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

export default Dashboard

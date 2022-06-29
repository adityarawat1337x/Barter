import { VStack, Heading, Spacer, Wrap, WrapItem } from "@chakra-ui/react"
import { React, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import BiddingModal from "../components/BiddingModal"
import CreateBid from "../components/CreateBid"
import bidService from "../feature/bids/bidService"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { user, isLoading } = useSelector((state) => state.auth)
  const [userBids, setUserBids] = useState([])
  useEffect(() => {
    if (!user && !isLoading && location.pathname === "/") {
      toast.error("You must be logged in to view this page")
      navigate("/login")
    }
  }, [user, isLoading])

  useEffect(() => {
    if (user) {
      const f = async () => {
        const bids = await bidService.getUserBids(user._id)
        console.log("bids", bids)
        setUserBids(bids)
      }

      f()
    }
  }, [user])

  console.log(user)
  return user ? (
    <AnimatedRouteWrapper>
      <VStack>
        <CreateBid />
        <Spacer />
        {selling(user)}
        {bidding(userBids)}
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

const bidding = (userBids) => (
  <>
    <Heading
      w="100%"
      justifyContent="flex-start"
      display={userBids && userBids[0] ? "block" : "none"}
    >
      You are Bidding on
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {userBids && userBids[0] ? (
        userBids.map((product, idx) => (
          <WrapItem key={idx}>
            <BiddingModal productId={product.product}></BiddingModal>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

export default Dashboard

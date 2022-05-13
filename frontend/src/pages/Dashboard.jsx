import { VStack, Heading, Spacer, Wrap, WrapItem } from "@chakra-ui/react"
import { React, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Card from "../components/Card"
import CreateBid from "../components/CreateBid"
import { getUser } from "../feature/auth/authSlice"
import { getAllBids } from "../feature/bids/bidSlice"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { user, isLoading } = useSelector((state) => state.auth)
  const { bids } = useSelector((state) => state.items)

  useEffect(() => {
    if (!user && !isLoading && location.pathname === "/") {
      toast.error("You must be logged in to view this page")
      navigate("/login")
    }
  }, [user, isLoading, location, dispatch, bids, navigate])

  useEffect(() => {
    dispatch(getAllBids())
  }, [])

  useEffect(() => {
    if (user) dispatch(getUser(user._id))
  }, [bids])

  return user ? (
    <AnimatedRouteWrapper>
      <VStack>
        {user ? <CreateBid /> : <></>}
        <Spacer />
        {selling(user)}
        {bidding(user)}
        {allBiddings(bids)}
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
      display={user && user.selling[0] ? "block" : "none"}
    >
      You are selling
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {user && user.selling[0] ? (
        user.selling.map((bid, idx) => (
          <WrapItem key={idx}>
            <Card bid={bid} />
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

const bidding = (user) => (
  <>
    <Heading
      w="100%"
      justifyContent="flex-start"
      display={user && user.biddings[0] ? "block" : "none"}
    >
      You are bidding on
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {user && user.biddings[0] ? (
        user.biddings.map((bid, idx) => (
          <WrapItem key={idx}>
            <Card bid={bid}></Card>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

const allBiddings = (bids) => (
  <>
    <Heading w="100%" justifyContent="flex-start">
      All Biddings
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {bids[0] ? (
        bids.map((bid, idx) => (
          <WrapItem key={idx}>
            <Card item={bid}></Card>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)
export default Dashboard

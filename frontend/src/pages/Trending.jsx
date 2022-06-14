import { VStack, Heading, Spacer, Wrap, WrapItem } from "@chakra-ui/react"
import { React, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import BiddingModal from "../components/BiddingModal"
import CreateBid from "../components/CreateBid"
import { getUser } from "../feature/auth/authSlice"
import { getAllBids } from "../feature/bids/bidSlice"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"

const Trending = () => {
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
        {allBiddings(bids.all)}
      </VStack>
    </AnimatedRouteWrapper>
  ) : (
    <></>
  )
}

const allBiddings = (bids) => (
  <>
    <Heading w="100%" justifyContent="flex-start">
      All Biddings
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {bids[0] ? (
        bids.map((bid, idx) => (
          <WrapItem key={idx}>
            <BiddingModal bid={bid._id} item={bid}></BiddingModal>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

export default Trending

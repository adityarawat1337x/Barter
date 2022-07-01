import { VStack, Heading, Spacer, Wrap, WrapItem } from "@chakra-ui/react"
import { React, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import BiddingModal from "../components/BiddingModal"
import CreateBid from "../components/CreateBid"
import { getUser } from "../feature/auth/authSlice"
import { getAllBids, updateBid } from "../feature/bids/bidSlice"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"

const Trending = (props) => {
  const { socket } = props
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { user, isLoading } = useSelector((state) => state.auth)
  const bids = useSelector((state) => state.items.bids.all)

  useEffect(() => {
    if (!socket) return
    const handler = (payload) => {
      dispatch(updateBid(payload))
    }
    socket.on("bid-updated", handler)
    return () => {
      socket.off("bid-updated", handler)
    }
  }, [socket])

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
        {user ? <CreateBid socket={socket} /> : <></>}
        <Spacer />
        {allBiddings(
          bids.filter((bid) => new Date(bid.expire) > new Date()),
          socket
        )}
      </VStack>
    </AnimatedRouteWrapper>
  ) : (
    <></>
  )
}

const allBiddings = (bids, socket) => (
  <>
    <Heading w="100%" justifyContent="centre">
      Trending{" "}
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {bids && bids[0] ? (
        bids.map((bid, idx) => (
          <WrapItem key={idx}>
            <BiddingModal
              socket={socket}
              bidId={bid._id}
              item={bid}
            ></BiddingModal>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

export default Trending

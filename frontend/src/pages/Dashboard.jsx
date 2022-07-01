import { VStack, Heading, Spacer, Wrap, WrapItem } from "@chakra-ui/react"
import { React, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import BiddingModal from "../components/BiddingModal"
import CreateBid from "../components/CreateBid"
import {
  getAllBids,
  getUserBids,
  getUserItems,
  updateBid,
} from "../feature/bids/bidSlice"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"

const Dashboard = (props) => {
  const { socket } = props
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { user, isLoading } = useSelector((state) => state.auth)
  const { sell, buy, all } = useSelector((state) => state.items.bids)

  useEffect(() => {
    if (!user && !isLoading && location.pathname === "/") {
      toast.error("You must be logged in to view this page")
      navigate("/login")
    }
  }, [user, isLoading])

  useEffect(() => {
    if (!socket) return
    const handler = (payload) => {
      dispatch(updateBid({ userId: user._id, ...payload }))
    }
    socket.on("bid-updated", handler)
    return () => {
      socket.off("bid-updated", handler)
    }
  }, [socket])

  useEffect(() => {
    if (all.length === 0) {
      dispatch(getAllBids())
      dispatch(getUserBids(user._id))
    } else {
      dispatch(getUserItems(user._id))
    }
  }, [all])

  return user ? (
    <AnimatedRouteWrapper>
      <VStack>
        <CreateBid socket={socket} />
        <Spacer />
        {display(
          "You are selling",
          sell.filter((bid) => new Date(bid.expire) > new Date()),
          socket
        )}
        {display(
          "You are bidding",
          buy.filter((bid) => new Date(bid.expire) > new Date()),
          socket
        )}
      </VStack>
    </AnimatedRouteWrapper>
  ) : (
    <></>
  )
}

const display = (msg, sell, socket) => (
  <>
    <Heading
      w="100%"
      justifyContent="flex-start"
      display={sell && sell[0] ? "block" : "none"}
    >
      {msg}
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {sell && sell[0] ? (
        sell.map((product, idx) => (
          <WrapItem key={idx}>
            <BiddingModal
              socket={socket}
              bidId={product._id}
              item={product}
            ></BiddingModal>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

export default Dashboard

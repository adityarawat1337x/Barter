import {
  VStack,
  Spinner,
  Heading,
  Spacer,
  Wrap,
  WrapItem,
  Flex,
} from "@chakra-ui/react"
import axios from "axios"
import { React, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import BiddingModal from "../components/BiddingModal"
import CreateBid from "../components/CreateBid"
import { getUser } from "../feature/auth/authSlice"
import { getAllBids } from "../feature/bids/bidSlice"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"
import FourZeroFour from "./FourZeroFour"

const Winner = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { user, isLoading } = useSelector((state) => state.auth)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!user && !isLoading && location.pathname === "/") {
      toast.error("You must be logged in to view this page")
      navigate("/login")
    }
  }, [user, isLoading, location, dispatch, navigate])

  useEffect(() => {
    const f = async () => {
      let data = await axios.get("http://localhost:5000/bids")
      data = data.data
      let ids = []
      user.wins.forEach((id) =>
        ids.push(data[data.findIndex((element) => element._id === id)])
      )
      setItems(ids)
    }
    f()
  }, [user])

  return user ? (
    <AnimatedRouteWrapper>
      <VStack>
        {user ? <CreateBid /> : <></>}
        <Spacer />
        {allBiddings(items)}
      </VStack>
    </AnimatedRouteWrapper>
  ) : (
    <></>
  )
}

const allBiddings = (bids) => (
  <>
    <Heading w="100%" justifyContent="flex-start">
      Bids Won
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {bids[0] ? (
        bids.map((bid, idx) => (
          <WrapItem key={idx}>
            <BiddingModal timer={true} item={bid}></BiddingModal>
          </WrapItem>
        ))
      ) : (
        <>
          <Flex
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="100%"
            maxH="90vh"
            maxW="90vw"
            spacing={4}
          >
            <Spinner size="xl" />
          </Flex>
        </>
      )}
    </Wrap>
  </>
)

export default Winner

import { VStack, Heading, Spacer, Wrap, WrapItem } from "@chakra-ui/react"
import { React, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import BiddingModal from "../components/BiddingModal"
import CreateBid from "../components/CreateBid"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { user, isLoading } = useSelector((state) => state.auth)
  const { sell, buy } = useSelector((state) => state.items.bids)

  useEffect(() => {
    if (!user && !isLoading && location.pathname === "/") {
      toast.error("You must be logged in to view this page")
      navigate("/login")
    }
  }, [user, isLoading])

  useEffect(() => {
    if (!buy || !sell) {
    }
    // if (!buy) {
    //   const f = async () => {
    //     if (item === undefined) {
    //       const data = await axios.get("http://localhost:5000/bids/" + bidId)
    //       setBid({
    //         userId: user._id,
    //         price: data.data.price,
    //         id: bidId,
    //         ownerId: data.data.ownerId,
    //       })
    //       setItem(data.data)
    //       return
    //     }
    //     setBid({
    //       userId: user._id,
    //       price: Item.price,
    //       id: Item._id,
    //       ownerId: Item.ownerId,
    //     })
    //     setItem(item)
    //   }
    //   f()
    // }
    // if (!sell) {
    //   const f = async () => {
    //     const data = await axios.get("http://localhost:5000/items/" + productId)
    //     setBid({
    //       userId: user._id,
    //       price: data.data.price,
    //       id: data.data._id,
    //       ownerId: data.data.ownerId,
    //     })
    //     setItem(data.data)
    //   }
    //   f()
    // }
  }, [])

  console.log(user)
  return user ? (
    <AnimatedRouteWrapper>
      <VStack>
        <CreateBid />
        <Spacer />
        {selling(sell)}
        {bidding(buy)}
      </VStack>
    </AnimatedRouteWrapper>
  ) : (
    <></>
  )
}

const selling = (sell) => (
  <>
    <Heading
      w="100%"
      justifyContent="flex-start"
      display={sell && sell[0] ? "block" : "none"}
    >
      You are selling
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {sell && sell[0] ? (
        sell.map((product, idx) => (
          <WrapItem key={idx}>
            <BiddingModal bidId={product._id} item={product}></BiddingModal>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

const bidding = (buy) => (
  <>
    <Heading
      w="100%"
      justifyContent="flex-start"
      display={buy && buy[0] ? "block" : "none"}
    >
      You are Bidding on
    </Heading>
    <Wrap spacing="5" w="100%" maxW="90vw">
      {buy && buy[0] ? (
        buy.map((product, idx) => (
          <WrapItem key={idx}>
            <BiddingModal bidId={product._id} item={product}></BiddingModal>
          </WrapItem>
        ))
      ) : (
        <></>
      )}
    </Wrap>
  </>
)

export default Dashboard

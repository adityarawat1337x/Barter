import { Stack, VStack, Heading, Spacer, Box, Text } from "@chakra-ui/react"
import { React, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Card from "../components/Card"
import CreateBid from "../components/CreateBid"
import { getAllBids, reset } from "../feature/bids/bidSlice"
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

  return (
    <AnimatedRouteWrapper>
      <VStack>
        <Spacer />
        <Heading>Sell</Heading>
        <VStack>
          {user ? <CreateBid /> : <></>}
          <Stack direction={["column", "row", "row"]}>
            {bids[0] ? (
              bids.map((bid, idx) => <Card key={idx} item={bid}></Card>)
            ) : (
              <></>
            )}
          </Stack>
        </VStack>
      </VStack>
    </AnimatedRouteWrapper>
  )
}

export default Dashboard

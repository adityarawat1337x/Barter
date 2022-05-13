import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getBid } from "../feature/bids/bidSlice"

const IMAGE = "https://source.unsplash.com/random"

export default function Card(props) {
  let { bid, item } = props
  const [Item, setItem] = useState(item)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const f = async () => {
      if (item === undefined) {
        const data = await axios.get("http://localhost:5000/bids/" + bid.bid)
        setItem(data.data)
      }
    }
    f()
  }, [])

  useEffect(() => {
    const Interval = setInterval(() => {
      setTimer(timer - 1)
    }, 1000)
    return () => {
      clearInterval(Interval)
    }
  }, [timer])

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      m={4}
      maxW="300px"
      maxH="350px"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
    >
      {Item ? (
        <>
          <Box rounded={"lg"}>
            <Image
              w="200px"
              h="200px"
              rounded={"lg"}
              objectFit={"cover"}
              src={IMAGE}
              m={4}
            />
          </Box>
          <Stack align={"center"}>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              {Item.name}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800} fontSize={"xl"}>
                ${Item.price}
              </Text>
              <Text textDecoration={"line-through"} color={"gray.600"}>
                {timer}
              </Text>
            </Stack>
          </Stack>
        </>
      ) : (
        <></>
      )}
    </Stack>
  )
}

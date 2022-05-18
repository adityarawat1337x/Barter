import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
const IMAGE = "https://source.unsplash.com/random"

export default function Card(props) {
  let { Item, click } = props
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let sec = parseInt((new Date(Item.expire.date) - new Date()) / 1000)
    setTimer(sec)
  }, [])

  useEffect(() => {
    const Interval = setInterval(() => {
      setTimer(timer - 1)
    }, 1000)
    return () => {
      clearInterval(Interval)
    }
  }, [timer])

  const format = (timer) => {
    const days = parseInt(timer / 60 / 60 / 24)
    timer -= days * 24 * 60 * 60
    const hr = parseInt(timer / 60 / 60)
    timer -= hr * 60 * 60
    const min = parseInt(timer / 60)
    timer -= min * 60
    const sec = parseInt(timer)
    let str = ""
    if (days) {
      str += `${days}  d `
    }
    if (hr) {
      str += `${hr}  h `
    }
    if (min) {
      str += `${min}  m `
    }
    if (sec) {
      str += `${sec} s`
    }

    return str
  }
  return (
    <Stack
      onClick={click}
      alignItems="center"
      justifyContent="center"
      m={4}
      maxW="400px"
      maxH="400px"
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
            <Heading
              m="-1"
              fontSize={"2xl"}
              fontFamily={"body"}
              fontWeight={500}
            >
              {Item.name}
            </Heading>
            <VStack align={"center"}>
              <Text fontWeight={800} fontSize={"xl"}>
                ${Item.price}
              </Text>
              <Text background="tomato" p="1" borderRadius="md">
                {format(timer)}
              </Text>
            </VStack>
          </Stack>
        </>
      ) : (
        <></>
      )}
    </Stack>
  )
}

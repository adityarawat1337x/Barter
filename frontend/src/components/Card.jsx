import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  VStack,
  Spacer,
} from "@chakra-ui/react"
import Timer from "./Timer"
const IMAGE = "https://source.unsplash.com/random"

export default function Card(props) {
  let { Item, timer, click } = props

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
              src={Item.photo}
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
              {timer ? <Spacer /> : <Timer Item={Item} />}
            </VStack>
          </Stack>
        </>
      ) : (
        <></>
      )}
    </Stack>
  )
}

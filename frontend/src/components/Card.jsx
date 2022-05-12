import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Spacer,
} from "@chakra-ui/react"

const IMAGE = "https://source.unsplash.com/random"

export default function Card(props) {
  let item = props.item
  return (
    <>
      <Spacer />
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${IMAGE})`,
              filter: "blur(10px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(10px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={IMAGE}
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              Brand
            </Text>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              {item.name}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800} fontSize={"xl"}>
                ${item.price}
              </Text>
              <Text textDecoration={"line-through"} color={"gray.600"}>
                ${item.price + 9000}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
      <Spacer />
    </>
  )
}

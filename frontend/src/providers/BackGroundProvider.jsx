import { useColorModeValue, Box, useColorMode, Image } from "@chakra-ui/react"
import React from "react"
import light from "../assets/lines3.svg"
import dark from "../assets/lines2.svg"

const BackGroundProvider = (props) => {
  const bgI = useColorModeValue(light, light)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box overflow="hidden" h="100vh">
      <Image
        src={bgI}
        w="100vw"
        h="100vh"
        zIndex="-1"
        position="absolute"
        filter={
          colorMode === "dark" ? "hue-rotate(200deg)" : "hue-rotate(0deg)"
        }
      />
      {props.children}
    </Box>
  )
}

export default BackGroundProvider

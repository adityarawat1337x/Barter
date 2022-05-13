import { useColorModeValue, Box, useColorMode, Image } from "@chakra-ui/react"
import React from "react"
import light from "../assets/lines3.svg"
import dark from "../assets/lines2.svg"

const BackGroundProvider = (props) => {
  const bgI = useColorModeValue(light, light)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box transition="1s ease" h="100%">
      {props.children}
    </Box>
  )
}

export default BackGroundProvider

import React, { useState, useEffect } from "react"
import {
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  useDisclosure,
  ModalContent,
  ModalCloseButton,
  Box,
  Text,
  Stack,
  Image,
  VStack,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react"
import Card from "./Card"
import axios from "axios"
import { useDispatch } from "react-redux"
const IMAGE = "https://source.unsplash.com/random"

const BiddingModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let { bid, item } = props
  const [Bid, setBid] = useState(item)
  const [Item, setItem] = useState(item)
  const dispatch = useDispatch()

  useEffect(() => {
    const f = async () => {
      if (item === undefined) {
        const data = await axios.get("http://localhost:5000/bids/" + bid.bid)
        setBid(data.data)
        setItem(data.data)
      }
    }
    f()
  }, [])

  const submit = async () => {
    try {
      //TODO add phtoto here
      if (
        !Bid.expire ||
        Bid.expire.date <= Date.now() ||
        !Bid.name ||
        !Bid.price ||
        !Bid.ownerId
      )
        return
      console.log("send request")
      dispatch(update(Bid))
      onClose()
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      {Item ? (
        <>
          <Card bid={bid} Item={Item} click={onOpen}>
            aaaaa
          </Card>
          <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{Item.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack>
                  <Box rounded={"lg"}>
                    <Image
                      w="200px"
                      h="200px"
                      rounded={"lg"}
                      objectFit={"cover"}
                      src={IMAGE}
                    />
                  </Box>
                  <Stack align={"center"}>
                    <VStack align={"center"}>
                      <Text fontSize={"xl"}>{`Current: $${Item.price}`}</Text>
                      <Text fontSize={"xl"}>{`Your: $${Bid.price}`}</Text>
                      <NumberInput w="50%">
                        <NumberInputField
                          placeholder="New bidding price"
                          value={Item.price + 50}
                          onChange={(e) => {
                            const val = parseInt(e.target.value)
                            setBid((prev) => ({ ...prev, price: val }))
                          }}
                        ></NumberInputField>
                      </NumberInput>
                      <Button background="tomato" p="1" borderRadius="md">
                        Purchase
                      </Button>
                    </VStack>
                  </Stack>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default BiddingModal

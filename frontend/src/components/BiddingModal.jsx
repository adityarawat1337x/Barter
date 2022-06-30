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
import { useDispatch, useSelector } from "react-redux"
import { updateBid } from "../feature/bids/bidSlice"
import { toast } from "react-toastify"
const IMAGE = "https://source.unsplash.com/random"

const BiddingModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector((state) => state.auth.user)
  let { bidId, item, productId, socket } = props
  const [Bid, setBid] = useState({})
  const [Item, setItem] = useState(item)
  const dispatch = useDispatch()

  useEffect(() => {
    if (item) {
      setItem(item)
      setBid({
        userId: user._id,
        price: item.price,
        id: item._id,
        ownerId: item.ownerId,
      })
      return
    }
    if (bidId) {
      const f = async () => {
        if (item === undefined) {
          const data = await axios.get("http://localhost:5000/bids/" + bidId)
          setBid({
            userId: user._id,
            price: data.data.price,
            id: bidId,
            ownerId: data.data.ownerId,
          })
          setItem(data.data)
          return
        }
        setBid({
          userId: user._id,
          price: Item.price,
          id: Item._id,
          ownerId: Item.ownerId,
        })
        setItem(item)
      }
      f()
    } else if (productId) {
      const f = async () => {
        const data = await axios.get("http://localhost:5000/items/" + productId)
        setBid({
          userId: user._id,
          price: data.data.price,
          id: data.data._id,
          ownerId: data.data.ownerId,
        })
        setItem(data.data)
      }
      f()
    }
  }, [item])

  const submit = async () => {
    try {
      //TODO add phtoto here
      console.log(Bid)
      if (!Bid.id || !Bid.price || !Bid.userId || !Bid.ownerId) return
      if (Bid.userId === Bid.ownerId) {
        toast.error("Self bidding not allowed")
        onClose()
        return
      }
      console.log("Send request")
      onClose()
      socket.emit("bid-update", Bid)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      {Item ? (
        <>
          <Card Item={Item} click={onOpen}></Card>
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
                          value={Bid.price}
                          onChange={(e) => {
                            const val = parseInt(e.target.value)
                            setBid((prev) => ({ ...prev, price: val }))
                          }}
                        ></NumberInputField>
                      </NumberInput>
                      <Button
                        onClick={submit}
                        colorScheme="whatsapp"
                        p="1"
                        borderRadius="md"
                      >
                        Bid
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

import { useEffect, useState } from "react"
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { create } from "../feature/bids/bidSlice"
import Time from "./Time"

const CreateBid = (props) => {
  const { socket } = props
  const [item, setItem] = useState({
    name: "",
    price: 0,
    photo: "",
    ownerId: "",
    expire: Date.now(),
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user._id) setItem((prev) => ({ ...prev, ownerId: user._id }))
  }, [user])

  useEffect(() => {
    if (!socket) return
    const handler = (payload) => {
      dispatch(create(payload))
    }
    socket.on("bid-created", handler)
    return () => {
      socket.off("bid-created", handler)
    }
  }, [socket])

  const submit = async () => {
    try {
      //TODO add phtoto here
      if (
        !item.expire ||
        item.expire <= Date.now() ||
        !item.name ||
        !item.price ||
        !item.ownerId ||
        !item.photo
      )
        return
      onClose()

      console.log("socket sends:", item)
      socket.emit("bid-create", item)
    } catch (e) {
      console.log(e.message)
    }
  }

  return user ? (
    <>
      <Button onClick={onOpen} variant="solid" colorScheme="whatsapp">
        Want to sell?
      </Button>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent padding="auto">
          <ModalCloseButton />
          <ModalBody>
            <ModalHeader>Create a Bid</ModalHeader>
            <Input
              w="90%"
              placeholder="Name of Item"
              variant="filled"
              value={item.name}
              onChange={(e) => {
                const val = e.target.value
                setItem((prev) => ({ ...prev, name: val }))
              }}
              type="text"
            />
            <NumberInput variant="filled">
              <NumberInputField
                w="90%"
                placeholder="Price of Item"
                value={item.price}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  setItem((prev) => ({ ...prev, price: val }))
                }}
              ></NumberInputField>
            </NumberInput>
            <Input
              w="90%"
              placeholder="Date"
              variant="filled"
              value={
                item.expire > Date.now()
                  ? item.expire.toISOString().substring(0, 10)
                  : ""
              }
              onChange={(e) => {
                let val = new Date(e.target.value)
                setItem((prev) => ({ ...prev, expire: val }))
              }}
              type="date"
            />
            {item.expire > Date.now() ? (
              <Time setDate={setItem} actualDate={item.expire} />
            ) : (
              <></>
            )}
            <Input
              w="90%"
              onChange={(e) => {
                const img = e.target.files[0]
                const reader = new FileReader()
                reader.readAsDataURL(img)

                reader.onloadend = (e) => {
                  setItem((prev) => ({ ...prev, photo: reader.result }))
                }
              }}
              placeholder="Photo"
              variant="filled"
              type="file"
            />
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Button
              colorScheme="green"
              mr={3}
              variant="outline"
              onClick={submit}
            >
              Lets Sell 🚀
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  ) : (
    <></>
  )
}

export default CreateBid

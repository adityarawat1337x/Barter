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
  Spacer,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { create } from "../feature/bids/bidSlice"

const CreateBid = () => {
  const [item, setItem] = useState({
    name: "",
    price: 0,
    photo: "",
    ownerId: "",
    expire: {
      date: new Date().toDateString(),
      time: new Date().getTime(),
    },
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user._id) setItem((prev) => ({ ...prev, ownerId: user._id }))
  }, [user])

  const submit = async () => {
    console.log(item)
    try {
      //TODO add phtoto here
      if (!item.expire || !item.name || !item.price || !item.ownerId) return
      console.log("send request")
      dispatch(create(item))
      onClose()
    } catch (e) {
      console.log(e.message)
    }
  }

  return user ? (
    <>
      <Button onClick={onOpen} variant="solid" colorScheme="green">
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
            <Spacer />
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
            <Spacer />
            <Input
              w="90%"
              placeholder="Price of Item"
              variant="filled"
              value={item.price}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                setItem((prev) => ({ ...prev, price: val }))
              }}
              type="text"
            />
            <Spacer />
            <Input
              w="90%"
              placeholder="Timer"
              variant="filled"
              value={item.expire.date}
              onChange={(e) => {
                const val = e.target.value
                var parts = val.split("-")
                var mydate = new Date(parts[0], parts[1] - 1, parts[2])
                setItem((prev) => ({ ...prev.expire, date: mydate }))
              }}
              type="date"
            />
            <Input
              w="90%"
              placeholder="Timer"
              variant="filled"
              value={item.expire.time}
              onChange={(e) => {
                const val = e.target.value
                setItem((prev) => ({
                  ...prev,
                  expire: { ...prev.expire, time: val },
                }))
              }}
              type="time"
            />
            <Spacer />
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

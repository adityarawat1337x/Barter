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

const CreateBid = () => {
  const [item, setItem] = useState({
    name: "",
    price: 0,
    photo: "",
    ownerId: "",
    expire: {
      date: Date.now(),
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
      if (
        !item.expire ||
        item.expire.date <= Date.now() ||
        !item.name ||
        !item.price ||
        !item.ownerId
      )
        return
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
                item.expire.date > Date.now()
                  ? item.expire.date.toISOString().substring(0, 10)
                  : ""
              }
              onChange={(e) => {
                let val = new Date(e.target.value)
                setItem((prev) => ({
                  ...prev,
                  expire: { ...prev.expire, date: val },
                }))
              }}
              type="date"
            />
            {item.expire.date > Date.now() ? (
              <Time setDate={setItem} actualDate={item.expire.date} />
            ) : (
              <></>
            )}
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

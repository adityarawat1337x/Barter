import { Text } from "@chakra-ui/react"
import { React, useState, useEffect } from "react"

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

function Timer(props) {
  const { Item } = props
  const [timer, setTimer] = useState(
    parseInt((new Date(Item.expire) - new Date()) / 1000)
  )

  useEffect(() => {
    const Interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => {
      clearInterval(Interval)
    }
  }, [])

  return (
    <Text background="tomato" p="1" borderRadius="md">
      {format(timer)}
    </Text>
  )
}

export default Timer

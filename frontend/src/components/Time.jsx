import { Button, HStack, Select } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"

const Time = (props) => {
  let { actualDate, setDate } = props
  const [hr, setHr] = useState(12)
  const [min, setMin] = useState(12)
  const [am, setAm] = useState("pm")

  useEffect(() => {
    let date = new Date(actualDate)
    date.setHours(hr)
    date.setMinutes(min)
    console.clear()
    console.log(date)
    setDate((prev) => ({
      ...prev,
      expire: {
        ...prev.expire,
        date: date,
      },
    }))
  }, [hr, min, am])

  let minuteArray = []
  for (let i = 0; i < 60; i++) {
    minuteArray.push(i)
  }
  return (
    <HStack w="90%">
      <Select
        onChange={(e) => {
          if (parseInt(e.target.value) >= 12) {
            setAm("pm")
          } else {
            setAm("am")
          }
          setHr(parseInt(e.target.value))
        }}
        value={hr}
        variant="filled"
        bg="tomato"
      >
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
        <option value={11}>11</option>
        <option value={12}>12</option>
        <option value={13}>1</option>
        <option value={14}>2</option>
        <option value={15}>3</option>
        <option value={16}>4</option>
        <option value={17}>5</option>
        <option value={18}>6</option>
        <option value={19}>7</option>
      </Select>
      <Select
        value={min}
        variant="filled"
        bg="tomato"
        onChange={(e) => setMin(parseInt(e.target.value))}
      >
        {minuteArray.map((val, id) => (
          <option key={id} value={val}>
            {val}
          </option>
        ))}
      </Select>
      <Button variant="filled" disabled bg="tomato">
        {am}
      </Button>
    </HStack>
  )
}

export default Time

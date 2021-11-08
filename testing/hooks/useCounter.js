import { useState } from 'react'

export function useCounter() {
  const [counter, setCounter] = useState(1)

  const add = () => {
    setCounter(counter + 1)
  }

  const subtract = () => {
    setCounter(counter - 1)
  }

  return { add, subtract }
}

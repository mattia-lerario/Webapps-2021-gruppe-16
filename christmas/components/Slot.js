/* eslint-disable no-ternary */
/* eslint-disable no-nested-ternary */

import { useEffect, useState } from 'react'

import axios from 'axios'

const Slot = ({ slot, user }) => {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [opened, setOpened] = useState(false)
  const [userSlot, setUserSlot] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
  const calculateTimeLeft = () => {
    const difference = +new Date(slot.openAt) - +new Date()

    if (difference > 0 && !open) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    setOpen(true)

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => {
      clearTimeout(timer)
      if (loading) setLoading(false)
    }
  })

  const timeDescription =
    (timeLeft?.days > 1 && 'dager') ||
    (timeLeft?.days > 0 && 'dag') ||
    (timeLeft?.hours > 0 && 'timer') ||
    (timeLeft?.minutes > 0 && 'minutter') ||
    (timeLeft?.seconds > 0 && 'sekunder')

  const timeValue =
    (timeLeft?.days > 0 && timeLeft?.days) ||
    (timeLeft?.hours > 0 && timeLeft?.hours) ||
    (timeLeft?.minutes > 0 && timeLeft?.minutes) ||
    (timeLeft?.seconds > 0 && timeLeft?.seconds)

  const generateCode = () => {
    let code = ''

    for (let i = 0; i < 4; i += 1) {
      code += String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    }
    for (let i = 0; i < 4; i += 1) {
      code += Math.floor(Math.random() * 10)
    }

    return code
  }

  const handleOpened = async () => {
    if (userSlot) {
      setOpened(true)

      return
    }

    await axios
      .get(`/api/userslots/${user?.user?.id}`)
      .then((response) => {
        if (response?.data?.length > 0) {
          setUserSlot(response.data)
        } else {
          const code = generateCode()

          setUserSlot({
            coupon: code,
            userId: user?.user?.id,
            slotId: slot?.id,
          })
        }
        setOpened(true)
      })
      .catch((error) => {
        console.warn(
          `${error}\nMessage: Failed to fetch userslot data for user id ${user?.user?.id}`
        )
      })
  }

  const handleOpen = () => {
    if (!open) return
    setOpened(true)
  }

  const handleClose = () => {
    if (!open) return
    setOpened(false)
  }

  const closedComponent = () => (
    <section className="slot" onClick={handleOpen}>
      <h1>{slot?.id}</h1>
      <time>
        Åpner om {timeValue} {timeDescription}
      </time>
    </section>
  )
  const openComponent = () => (
    <section className="slot open" onClick={handleOpened}>
      <h1>{slot?.id}</h1>
    </section>
  )

  const openedComponent = () => (
    <section className="slot opened" onClick={handleClose}>
      <div>{userSlot?.coupon}</div>
    </section>
  )

  return loading ? (
    <span className="slot">loading...</span>
  ) : opened ? (
    openedComponent()
  ) : !open ? (
    closedComponent()
  ) : (
    openComponent()
  )
}

export default Slot

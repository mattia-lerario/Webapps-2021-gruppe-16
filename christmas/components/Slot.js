/* eslint-disable no-ternary */

import { useEffect, useState } from 'react'

import axios from 'axios'

const Slot = ({ slot, user }) => {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [opened, setOpened] = useState(false)
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

    for (let i = 0; i < 4; i++) {
      code += String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    }
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10)
    }

    return code
  }

  const handleOpen = async () => {
    await axios
      .get(`/api/userslots/${user?.user?.id}`)
      .then((response) => {
        if (response.data) {
          console.log('Ja')
        } else {
          console.log('nei')
        }
      })
      .catch((error) => {
        console.warn(
          `${error}\nMessage: Failed to fetch userslot data for user id ${user?.user?.id}`
        )
      })
  }

  const closedComponent = () => (
    <>
      <h1>{slot?.id}</h1>
      <time>
        Åpner om {timeValue} {timeDescription}
      </time>
    </>
  )
  const openComponent = () => <h1>{slot?.id}</h1>

  const openedComponent = () => <div>{generateCode()}</div>

  const handleClick = () => {
    if (!open) return
    setOpened(true)
    // Save that user clicked slot
    // Animation?
    // Show user slug?
  }

  return loading ? (
    <span className="slot">loading...</span>
  ) : (
    <section className={!open ? 'slot' : 'slot open'} onClick={handleClick}>
      {opened ? openedComponent() : !open ? closedComponent() : openComponent()}
    </section>
  )
}

export default Slot

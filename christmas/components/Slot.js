/* eslint-disable no-ternary */

import { useEffect, useState } from 'react'

const Slot = ({ slot }) => {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
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

  const closedComponent = () => (
    <time>
      Åpner om {timeValue} {timeDescription}
    </time>
  )
  const openComponent = () => {}

  const handleClick = () => {
    if (!open) return
    // Save that user clicked slot
    // Animation?
    // Show user slug?
  }

  return loading ? (
    <span className="slot">loading...</span>
  ) : (
    <section className={!open ? 'slot' : 'slot open'} onClick={handleClick}>
      <h1>{slot?.id}</h1>
      {!open ? closedComponent() : openComponent()}
    </section>
  )
}

export default Slot

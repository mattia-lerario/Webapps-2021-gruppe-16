/* eslint-disable no-ternary */

import { useEffect, useState } from 'react'

const Slot = ({ slot }) => {
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

    return setOpen(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timeDescription =
    (timeLeft?.days > 0 && 'dager') ||
    (timeLeft?.minutes > 0 && 'minutter') ||
    (timeLeft?.seconds > 0 && 'sekunder')

  const timeValue =
    (timeLeft?.days > 0 && timeLeft?.days) ||
    (timeLeft?.minutes > 0 && timeLeft?.minutes) ||
    (timeLeft?.seconds > 0 && timeLeft?.seconds)

  return (
    <section className={!open ? 'slot' : 'slot open'}>
      <h1>{slot?.id}</h1>
      {!open && (
        <time>
          Åpner om {timeValue} {timeDescription}
        </time>
      )}
    </section>
  )
}

export default Slot

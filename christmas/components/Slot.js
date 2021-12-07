/* eslint-disable no-ternary */

import { useEffect, useState } from 'react'

import axios from 'axios'

const Slot = ({ slot }) => {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [slotCode, setSlotCode] = useState('')
  const [user, setUser] = useState(null)

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

  // function that returns a string with 4 random numbers and 4 random letters the code must be unique
  // https://stackoverflow.com/questions/45828805/generate-string-characters-in-javascript/45828844
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

  const createCode = () => {
    const code = generateCode()

    // check if code is unique
    if (open) {
      return code
    }
    createCode()
  }

  const openSlot = async () => {
    if (open) {
      // create card for user
      const date = new Date()
      const code = createCode()

      if (!slotCode) {
        setSlotCode(code)
      } else {
        console.warn('Slot has already been opened')
      }

      const userSlot = {
        date: date.toLocaleDateString(),
        status: 'open',
        userId: 1,
        slotId: slot.id,
        coupon: code,
      }

      // send slot to server
      await axios
        .post('/api/userSlots/', userSlot)
        .then((response) => {
          const { data } = response

          // stringify data to be able to use it in the slot component
          setUser(data)
        })
        .catch((error) => {
          console.warn(`${error}\nMessage: Failed to create slot for user ${1}`)
        })
    } else {
      console.warn(`this slot is not open yet ${1}`)
    }
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

  return loading ? (
    <span className="slot">loading...</span>
  ) : (
    <section
      key={slot?.id}
      className={!open ? 'slot' : 'slot open'}
      onClick={openSlot}
    >
      <h1>{slot?.id}</h1>
      {!open && (
        <time>
          Åpner om {timeValue} {timeDescription}
        </time>
      )}
      {open && (
        <div className="code">
          <p>{slotCode}</p>
        </div>
      )}
    </section>
  )
}

export default Slot

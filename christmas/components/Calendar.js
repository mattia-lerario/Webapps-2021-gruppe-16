import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/router'
import Slot from './Slot'
const Calendar = (date, userInfo) => {
  //set slots data based on data from useEffect hook
  const [slots, setSlots] = useState('')
  const [status, setStatus] = useState('')
  const [user, setUser] = useState('')
  const router = useRouter()

  //generate slots array with 24 items

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('/api/slots')
        .then((response) => {
          const data = response.data
          //stringify data to be able to use it in the slot component

          setSlots(data)
        })
        .catch((error) => {
          console.warn(
            `${error}\nMessage: Failed to fetch slots data for calendar id ${calendar?.id}`
          )
        })
    }

    fetch()
  }, [])

  // return a calendar item that loops 24 times and displays the current date

  return (
    <article className="calendar">
      {slots &&
        slots.map((element) => {
          return <Slot key={element?.id} slot={element} />
        })}
    </article>
  )
}

export default Calendar

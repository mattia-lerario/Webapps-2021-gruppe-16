import react, { useEffect } from 'react'
import { useState } from 'react'
import Slot from './Slot'
import axios from 'axios'
const Calendar = (id, calendarName, createdDate, userInfo) => {
  const [calendarId, setCalendarId] = useState()
  const [name, setName] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [slots, setSlots] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    setCalendarId(id)
    setName(calendarName)
    setCreatedAt(createdDate)
  }, [id, calendarName, createdAt])

  const openCard = () => {
    //open card for specific user and set status

    setStatus('open')
  }

  return (
    <div>
      <Slot></Slot>
    </div>
  )
}

export default Calendar

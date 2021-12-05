import Slot from '@/components/Slot'
import AdminDashboard from '@/components/AdminDashboard'
<<<<<<< HEAD
import Calendar from '@/components/Calendar'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [slots, setSlots] = useState([])

  //get slots from database and set state to slots

  /*useEffect(() => {
    const fetchSlots = async () => {
      const response = await axios.get('/api/slots')
      const data = await response.json()
      setSlots(data)
    }
    fetchSlots()
  }, [])*/

=======
export default function Home() {
>>>>>>> parent of c79d1f7 (Added APi for Slots and Calendars.)
  return (
    <div>
      <h1>Julekalender eksamen 2021</h1>
      <Slot></Slot>
    </div>
  )
}

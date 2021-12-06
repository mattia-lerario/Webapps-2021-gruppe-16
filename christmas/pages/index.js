import Slot from '@/components/Slot'
import AdminDashboard from '@/components/AdminDashboard'
import Calendar from '@/components/Calendar'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [slots, setSlots] = useState([])

  //get slots from database and set state to slots

  return (
    <div>
      <h1>Julekalender eksamen 2021</h1>
      <Slot></Slot>
    </div>
  )
}

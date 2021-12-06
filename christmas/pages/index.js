import Calendar from '@/components/Calendar'
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function Home() {
  //get slots from database and set state to slots
  const date = new Date()

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios('/api/slots')

        if (response?.data?.success) {
          setSlots(response.data.slots)
          console.log(response.data.slots, 'sss')
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSlots()
  }, [])
  return (
    <div>
      <h1>Julekalender eksamen 2021</h1>
      <Calendar
        id="4"
        name="Julekalender"
        createdAt={date}
        userInfo="x"
      ></Calendar>
    </div>
  )
}

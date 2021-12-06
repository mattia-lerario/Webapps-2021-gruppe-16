import Calendar from '@/components/Calendar'
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function Home() {
  //get slots from database and set state to slots
  const date = new Date()
  //use effect that fetches slots from database
  useEffect(() => {
    axios
      .get('/api/slots')
      .then((res) => {
        setSlots(res.data)
      })
      .catch((err) => console.log(err))
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

import Slot from '@/components/Calendar'
import AdminDashboard from '@/components/AdminDashboard'
import Calendar from '@/components/Calendar'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  //get slots from database and set state to slots

  return (
    <div>
      <h1>Julekalender eksamen 2021</h1>
      <Calendar></Calendar>
    </div>
  )
}

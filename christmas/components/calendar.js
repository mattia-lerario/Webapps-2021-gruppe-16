import User from './User'
import { useState } from 'react'
import axios from 'axios'
import {calendarItem} from './calendarItem'
const Calendar = (props) => {
  const [chosenDate, setChosenDate] = useState('')
  const [selectedDate, setSelectedDate] = useState(false)
  const [selectedDates, setSelectedDates] = useState([])
  const [user, setUser] = useState(new User())
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //create a function to handle the date selection
  const handleDateClick = (date) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date))
    } else {
      setSelectedDates([...selectedDates, date])
    }
  }

  //create a function to handle the submit button
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedDates.length === 0) {
      alert('Please select at least one date')
    } else {
      axios
        .post('/api/v1/reservations', {
          date: selectedDates,
          user_id: user.id,
        })
        .then((res) => {
          setChosenDate('')
          setSelectedDates([])
          setSelectedDate(false)
          setUser(new User())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  //create a function to handle the login button
  const handleLogin = (e) => {
    e.preventDefault()
    axios
      .post('/api/v1/login', {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        setUser(new User(res.data.user))
        setIsLoggedIn(true)
        alert('You are now logged in')
      })
      .catch((err) => {
        console.log(err)
        alert('Error logging in')
      })
  }

  return (

    <calendarItem></calendarItem>
  )


}
export default Calendar

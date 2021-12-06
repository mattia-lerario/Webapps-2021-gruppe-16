import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import router from 'next/router'
const Slot = (slotData, userInfo) => {
  //set slots data based on data from useEffect hook
  const [slots, setSlots] = useState([slotData])
  const [status, setStatus] = useState('')
  const [user, setUser] = useState(userInfo)
  const [daysLeft, setDaysLeft] = useState()
  const [date, setDate] = useState()

  const openCard = () => {
    //open card for specific user and set status

    setStatus('open')
  }

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
    let code = generateCode()
    //check if code is unique
    if (
      users.find(
        (user) => user.find((slot) => slot.code === code) === undefined
      )
    ) {
      return code
    } else {
      createCode()
    }
  }

  const daySlotStatus = (slot) => {
    //check if slot is locked
    if (slot.date != Date.now()) {
      //return days left from date now until slot date
      const daysLeft = Math.ceil(
        (new Date(slot.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
      setDaysLeft(daysLeft)
      return daysLeft
    } else {
      daysLeft = slot.date.slice(8, 10) - new Date().getDate()
      return daysLeft
    }
  }

  const createUserSlot = async (slot) => {
    //create card for user
    let date = new Date()
    let code = createCode()
    let userSlot = {
      coupon: code,
      createdAt: date.toLocaleDateString(),
      slotId: slot.id,
      userId: user.id,
    }
    const selectedUser = user
    try {
      //axios post request to create user slot in database based on user id
      const res = await axios.post(`/api/users/${selectedUser.id}`, userSlot)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }

    openCard()

    console.log(users)
  }
  const slot = {
    //create slot object
    id: '',
    date: '',
    code: '',
    status: '',
  }

  // return a calendar item that loops 24 times and displays the current date

  return (
    <div
      className={`card-${slot.status}`}
      onClick={createUserSlot}
      key={slot.id}
    >
      <div className="card">
        <h5 className="card-title date">{slot.date.slice(8, 10)}</h5>

        <div>
          <div className="row">
            <div className="col-6">{slot.date}</div>
            <div className="col-6">
              <p className="card-text">{slot.code}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slot

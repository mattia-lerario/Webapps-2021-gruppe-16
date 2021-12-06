import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/router'

const Calendar = (date, userInfo) => {
  //set slots data based on data from useEffect hook
  const [slots, setSlots] = useState([])
  const [status, setStatus] = useState('')
  const [user, setUser] = useState('')
  const router = useRouter()
  const openCard = () => {
    //open card for specific user and set status

    setStatus('open')
  }
  //generate slots array with 24 items

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('/api/slots')
        .then((response) => {
          setSlots(response.data)
          console.log(slots)
        })
        .catch((error) => {
          console.warn(
            `${error}\nMessage: Failed to fetch slots data for calendar id ${4}`
          )
          setSlots([response.data])
        })
    }

    fetch()

    return () => {
      /* cleanup */
    }
  }, [4])
  /*useEffect(() => {
    let arr = []
    for (let i = 0; i < 24; i++) {
      arr.push(i)
    }
    setSlots(arr)
  }, [])*/
  //get all users

  const users = [
    {
      id: 1,
      name: 'John Doe',
      userSlots: [
        {
          id: 1,
          date: '2020-12-12',
          status: 'open',
          code: 'abcd1234',
        },
      ],
    },
  ]

  //function that returns a string with 4 random numbers and 4 random letters the code must be unique
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
    if (!user) {
      return code
    } else {
      createCode()
    }
  }

  const createUserSlot = async () => {
    //create card for user
    let date = new Date()
    let code = createCode()
    let userSlot = {
      id: user.id,
      date: date.toLocaleDateString(),
      status: 'open',
      code: code,
    }

    openCard()
    console.log(users)
  }

  // return a calendar item that loops 24 times and displays the current date

  return (
    <div className="calendar-Grid">
      {slots?.data?.map((e, slot) => {
        //set date to start first december of the year 2021
        const date = new Date(2021, 11, 1, 0, 0, 0, 0)
        date.setDate(date.getDate() + slot)
        console.log(slots)
        return (
          // return a calendar card box with the current date and time
          <div
            className={`card-${status}`}
            onClick={createUserSlot}
            key={slot.id}
          >
            <div className="card">
              <h5 className="card-title date">
                {date.toLocaleString('en-US', { month: 'long' })}{' '}
                {date.getDate()}
              </h5>

              <div className={`card-content`}>
                <div className="row">
                  <div className="col-6"></div>
                  <div className="col-6">
                    <p className="card-text"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Calendar

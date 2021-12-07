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
          const data = response.data
          //stringify data to be able to use it in the slot component

          setSlots(data)
        })
        .catch((error) => {
          console.warn(
            `${error}\nMessage: Failed to fetch slots data for calendar id ${4}`
          )
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
    <article className="calendar">
      {slots &&
        slots.map((element) => {
          return <Slot key={element?.id} slot={element} />
        })}
    </article>
  )
}

export default Calendar

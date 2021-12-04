import React from 'react'
import { useState } from 'react'
const Slot = (id, date, userInfo) => {
  const [isOpen, setIsOpen] = useState(true)
  let [cardStatus, setCardStatus] = useState('')
  //get all users

  const users = [
    {
      id: 1,
      name: 'John Doe',
      cardSlots: [
        {
          id: 1,
          date: '2020-12-12',
          status: 'open',
          code: 'abcd1234',
        },
      ],
    },
  ]

  const openCard = () => {
    //open card for specific user and set status
    if (isOpen) {
      setCardStatus('card-open')
      setIsOpen(false)
    } else {
      setCardStatus('card-closed')
      setIsOpen(true)
    }
  }

  //create function that returns a string with 4 random numbers and 4 random letters
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

  const createCard = () => {
    //create card for user
    let date = new Date()
    let code = generateCode()
    let newCard = {
      id: users[0].cardSlots.length + 1,
      date: date.toLocaleDateString(),
      status: 'open',
      code: code,
    }
    users[0].cardSlots.push(newCard)
    openCard()
    generateCode()
    console.log(users[0].cardSlots)
  }

  // return a calendar item that loops 24 times and displays the current date

  return (
    <div className="calendar-Grid">
      {[...Array(24)].map((e, i) => {
        //set date to start first december of the year 2021
        const date = new Date(2021, 11, 1, 0, 0, 0, 0)
        date.setDate(date.getDate() + i)
        return (
          // return a calendar card box with the current date and time
          <div className="card-body" key={i} id={i}>
            <div className="card" onClick={createCard}>
              <h5 className="card-title date">
                {date.toLocaleString('en-US', { month: 'long' })}{' '}
                {date.getDate()}
              </h5>

              <div className={`card-content ${cardStatus}`}>
                <div className="row">
                  <div className="col-6">
                    <div className="card-text">
                      {users.map((user) => {
                        return (
                          <div key={user.code}>
                            <p>{user.name}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
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

export default Slot

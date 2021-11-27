import React from 'react'
import { useState } from 'react'
const Slot = (id, date, userInfo) => {
  const [isOpen, setIsOpen] = useState(true)
  let [cardColor, setCardColor] = useState('')
  //get all users

  const users = [
    {
      id: 1,
      name: 'John Doe',
    },
  ]

  const openCard = () => {
    //open card and change cardColor to green
    const cardClose = 'card-close'

    setIsOpen(true)
    setCardColor(cardClose)
  }

  // return a calendar item that loops 24 times and displays the current date
  // and time in the format: MMM DD, YYYY hh:mm a
  return (
    <div className="calendar-ItemCard">
      {[...Array(24)].map((e, i) => {
        //set date to start first december of the year 2021
        const date = new Date(2021, 11, 1, 0, 0, 0, 0)
        date.setDate(date.getDate() + i)
        return (
          // return a calendar card box with the current date and time
          <div className={cardColor} key={i}>
            <div className="card-body">
              <h5 className="card-title">
                {date.toLocaleString('en-US', { month: 'long' })}{' '}
                {date.getDate()}
              </h5>
              <p className="card-text">
                {date.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </p>
              <div className="row">
                <div className="col-6">
                  <div className="card-text">
                    {users.map((user) => {
                      return (
                        <div key={user.id}>
                          <p>{user.name}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="col-6">
                  <p className="card-text">
                    <button
                      className="btn btn-primary"
                      onClick={() => openCard()}
                    >
                      OPEN
                    </button>
                  </p>
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

import react, { useEffect, useState } from 'react'

const Calendar = ({ id, name, createdAt }) => {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    const fetchSlots = async () => {
      const res = await fetch(`/api/calendar/${id}`)
      const data = await res.json()
      setSlots(data)
    }
    fetchSlots()
  }, [id])

  // return a calendar that has a name, id, and slots based on slot.js file
  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>{name}</h2>
      </div>
      <div className="calendar-body">
        {slots.map((slot) => {
          return <Slot id={slot.id} date={slot.date} userInfo={userInfo} />
        })}
      </div>
    </div>
  )
}

export default Calendar

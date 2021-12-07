/* eslint sort-imports: ["error", { "ignoreDeclarationSort": true }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import { useEffect, useState } from 'react'

import axios from 'axios'

import Slot from './Slot'

const Calendar = ({ calendar, user }) => {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`/api/slots/${calendar?.id}`)
        .then((response) => {
          console.log(response.data)
          setSlots(response.data)
        })
        .catch((error) => {
          console.warn(
            `${error}\nMessage: Failed to fetch slots data for calendar id ${calendar?.id}`
          )
          setSlots([])
        })
    }

    fetch()
  }, [calendar.id])

  return (
    <article className="calendar">
      {slots &&
        slots.map((element) => {
          return <Slot key={element?.id} slot={element} user={user} />
        })}
    </article>
  )
}

export default Calendar

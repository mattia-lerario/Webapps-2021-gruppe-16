import { useEffect, useState } from 'react'

import axios from 'axios'

/* eslint sort-imports: ["error", { "ignoreDeclarationSort": true }] */
import Slot from './Slot'

const Calendar = ({ calendar }) => {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('/api/slots', {
          params: { id: calendar?.id },
        })
        .then((response) => {
          setSlots(response.data)
        })
        .catch((error) => {
          /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
          console.warn(
            `${error}\nMessage: Failed to fetch slots data for calendar id ${calendar?.id}`
          )
          setSlots([])
        })
    }

    fetch()

    return () => {
      /* cleanup */
    }
  }, [calendar.id])

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

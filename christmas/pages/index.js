/* eslint sort-imports: ["error", { "ignoreDeclarationSort": true }] */
import { useEffect, useState } from 'react'

import axios from 'axios'

import Calendar from '@/components/Calendar'

export default function Home() {
  const [calendarData, setCalendarData] = useState(false)
  const [calendarId, setCalendarId] = useState(1)

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`/api/calendars/${calendarId}`)
        .then((response) => {
          setCalendarData(response.data)
        })
        .catch((error) => {
          /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
          console.warn(`${error}\nMessage: Failed to fetch calendar data`)
          setCalendarData(false)
        })
    }

    fetch()
  }, [calendarId])

  return (
    <main>
      <h1>Julekalender eksamen 2021</h1>
      {calendarData && <Calendar calendar={calendarData} />}
    </main>
  )
}

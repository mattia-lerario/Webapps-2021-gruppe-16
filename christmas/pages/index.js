/* eslint sort-imports: ["error", { "ignoreDeclarationSort": true }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import { useEffect, useState } from 'react'

import axios from 'axios'

import Calendar from '@/components/Calendar'

export default function Home() {
  const [calendarData, setCalendarData] = useState(false)

  /* eslint-disable no-unused-vars */
  const [calendarId, setCalendarId] = useState(1) // Planning ahead in case we have more than 1 calendar in the future
  const [user, setUser] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('/api/dummy')
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          console.warn(`${error}\nMessage: Failed to fetch dummy user data`)
          setUser(false)
        })
    }

    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`/api/calendars/${calendarId}`)
        .then((response) => {
          setCalendarData(response.data)
        })
        .catch((error) => {
          console.warn(`${error}\nMessage: Failed to fetch calendar data`)
          setCalendarData(false)
        })
    }

    fetch()
  }, [calendarId])

  return (
    <main>
      <h1>Julekalender eksamen 2021</h1>
      {calendarData && <Calendar calendar={calendarData} user={user} />}
    </main>
  )
}

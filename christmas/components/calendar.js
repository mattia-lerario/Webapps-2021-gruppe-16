import react, { useEffect } from 'react'
import { useStat } from 'react'

const Calendar = (id, name, createdAt, slots) => {
  const [createdAt, setCreatedAt] = useState(createdAt)
  const [name, setName] = useStat(name)
}

export default Calendar

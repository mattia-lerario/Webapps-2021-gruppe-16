import react, { useEffect } from 'react'
import { useStat } from 'react'

const Calendar = (id, name, createdAt) => {
  const [createdAt, setCreatedAt] = useState(createdAt)
  const [name, setName] = useStat(name)
  const [id, setId] = useStat(id)
}

export default Calendar

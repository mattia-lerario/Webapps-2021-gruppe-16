import axios from 'axios'
import router from 'next/router'

const fetchCalendarSlots = () => {
  //set slots data based on data from useEffect hook
  const [slots, setSlots] = useState([])
  const [status, setStatus] = useState('')
  const [user, setUser] = useState()
  const [daysLeft, setDaysLeft] = useState()

  const openCard = () => {
    //open card for specific user and set status

    setStatus('open')
  }

  useEffect(() => {
    const fetchSlots = async () => {
      //fetch slots from database
      const response = await axios.get('/api/slots')
      let data = response.data
      setSlots(data.slots)
      //return lost of slots
      console.log(sloots, 'slots')
      return slots
    }
    const fetchUser = async () => {
      //fetch slots from database
      const response = await axios.get('/api/users')
      console.log(response.data, 'response')
      const data = await response.data
      console.log(userInfo, 'userInfo')
      setUser(data)
      return data
    }
    fetchUser()
    fetchSlots()
    // fetchDaysLeft()
  }, [])
  //export function
  return {
    openCard,
    slots,
    status,
    user,
    daysLeft,
  }
}

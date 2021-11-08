import { useEffect, useState } from 'react'

import axios from 'axios'

import { getUserFromCookie, isAdmin, setUserCookie } from '@/lib/utils/user'

export const useUser = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({ id: '', username: '' })
  const [admin, setAdmin] = useState(false)

  const setSelectedUser = (selectedUser) => {
    setUserCookie('user', selectedUser)
  }

  useEffect(() => {
    if (users && users.length > 0) return
    const getAllUsers = async () => {
      try {
        const response = await axios('/api/users')

        if (response?.data?.success) {
          setUsers(response.data.users)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAllUsers()
  }, [users])

  useEffect(() => {
    if (user?.username) return
    const refreshUser = async () => {
      const userFromCookie = await getUserFromCookie()
      const adminFromCookie = await isAdmin()

      if (userFromCookie) {
        setUser(JSON.parse(userFromCookie))
        if (adminFromCookie && adminFromCookie) {
          setAdmin(true)
        }
      }
    }

    refreshUser()
  }, [user])

  return { admin, user, users, setSelectedUser }
}

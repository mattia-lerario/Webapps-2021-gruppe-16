import SupportList from '@/components/SupportList'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Issues() {
  const [issues, setIssues] = useState([])
  const [departments, setDepartments] = useState([])

  useEffect(async () => {
    const response = await axios.get('/api/issues')

    setIssues(response?.data)

    return () => {} // Cleanup
  }, [])

  useEffect(async () => {
    const response = await axios.get('/api/departments')

    setDepartments(response?.data.map((department) => department))

    return () => {} // Cleanup
  }, [])

  return !(issues && departments) ? (
    <h1>Loading...</h1>
  ) : (
    <main>
      <SupportList issues={issues} departments={departments} />
    </main>
  )
}

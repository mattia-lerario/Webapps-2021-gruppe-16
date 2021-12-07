import SupportList from '@/components/SupportList'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Issues() {
  const [issues, setIssues] = useState([])
  const [departments, setDepartments] = useState([])

  const handleResolve = (id) => {
    setIssues(
      issues.map((element) =>
        element.id === id ? { ...element, isResolved: true } : element
      )
    )
  }
  useEffect(async () => {
    const response = await axios.get('/api/issues')
    setIssues(response?.data)
    return () => {} // Cleanup
  }, [])

  useEffect(async () => {
    const response = await axios.get('/api/departments')
    setDepartments(response?.data)
    return () => {} // Cleanup
  }, [])

  return !(issues && departments) ? (
    <h1>Loading...</h1>
  ) : (
    <main>
      <SupportList
        issues={issues}
        handleResolve={handleResolve}
        departments={departments}
      />
    </main>
  )
}

import SupportItem from '@/components/SupportItem'
import { useRouter } from 'next/dist/client/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Issue() {
  // ROUTER FOR ISSUE ID
  const router = useRouter()
  const { id } = router.query

  // STATE
  const [issue, setIssue] = useState()
  const [departments, setDepartments] = useState([])

  // FETCHING ISSUE AND DEPARTMENT
  useEffect(async () => {
    if (id) {
      const response = await axios.get(`/api/issues/${id}`)
      setIssue(response?.data)
    }
    return () => {} // Cleanup
  }, [id])

  useEffect(async () => {
    const response = await axios.get('/api/departments')
    setDepartments(response?.data.map((department) => department))
    return () => {} // Cleanup
  }, [])

  return !(issue && departments) ? (
    <p>loading...</p>
  ) : (
    <main>
      <SupportItem
        issue={issue}
        department={departments.find((dept) => dept.id == issue?.departmentId)}
        initialShowComment={true}
      />
    </main>
  )
}

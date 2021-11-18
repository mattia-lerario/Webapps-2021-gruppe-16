import SupportItem from './SupportItem'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SupportList = () => {
  // const SupportList = ({ issues }) => {
  const [filters, setFilters] = useState({
    severity: '',
    category: '',
  })

  const [issues, setIssues] = useState([])

  useEffect(async () => {
    const response = await axios.get('/api/issues')
    setIssues(response?.data)

    return () => {
      // Cleanup
    }
  }, [])

  return !issues ? (
    <p>Loading</p>
  ) : (
    <section className="issues">
      <div id="issuesHeader">
        <div id="issuesTitle">
          <h2>Henvendelser</h2>
        </div>
        <div id="issuesFilters">
          <select
            name="severity"
            defaultValue={''}
            onChange={(e) =>
              setFilters({ ...filters, severity: e.target.value })
            }
          >
            <option value="">Alle</option>
            <option value="low">Lav</option>
            <option value="medium">Medium</option>
            <option value="high">Høy</option>
          </select>

          <select
            name="category"
            defaultValue={''}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">Alle</option>
            <option value="it">IT</option>
            <option value="design">Design</option>
            <option value="salg">Salg</option>
          </select>
        </div>
      </div>

      <ul>
        {issues
          .filter(
            (issue) =>
              (!filters.severity && !filters.category) ||
              (!filters.severity && issue.department == filters.category) ||
              (issue.severity == filters.severity && !filters.category) ||
              (issue.severity == filters.severity &&
                issue.department == filters.category)
          )

          .map((issue) => (
            <SupportItem key={issue.id} issue={issue} />
          ))}
      </ul>
    </section>
  )
}

export default SupportList

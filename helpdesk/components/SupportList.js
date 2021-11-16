import SupportItem from './SupportItem'
import { useState } from 'react'

const SupportList = ({ issues }) => {
  const [filters, setFilters] = useState({
    severity: '',
    category: '',
  })

  return (
    <section className="issues">
      <h2>Henvendelser</h2>
      <div className="filters">
        <select
          name="severity"
          defaultValue={''}
          onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
        >
          <option value="">Alle</option>
          <option value="low">Lav</option>
          <option value="medium">Medium</option>
          <option value="high">Høy</option>
        </select>

        <select
          name="category"
          defaultValue={''}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Alle</option>
          <option value="it">IT</option>
          <option value="design">Design</option>
          <option value="salg">Salg</option>
        </select>
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

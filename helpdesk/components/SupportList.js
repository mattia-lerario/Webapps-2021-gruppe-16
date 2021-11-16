import SupportItem from './SupportItem'
import { useState } from 'react'
const SupportList = ({ issues }) => {
  const [filters, setFilters] = useState({
    severity: '',
    category: '',
  })
  console.log(issues)
  return (
    <section className="issues">
      <h2>Henvendelser</h2>
      <div className="filters">
        <select
          name="severity"
          onChange={(e) => setFilters({ severity: e.target.value })}
        >
          <option value="" disabled hidden defaultValue>
            Viktighet
          </option>
          <option value="" selected>
            Alle
          </option>
          <option value="low">Lav</option>
          <option value="medium">Medium</option>
          <option value="high">Høj</option>
        </select>

        <select
          name="category"
          onChange={(e) => setFilters({ category: e.target.value })}
        >
          <option value="" disabled hidden defaultValue>
            Avdeling
          </option>
          <option value="" selected>
            Alle
          </option>
          <option value="it">IT</option>
          <option value="design">Design</option>
          <option value="salg">Salg</option>
        </select>
      </div>
      <ul>
        {issues
          .filter(
            (issue) =>
              issue.severity == filters.severity ||
              filters.severity == '' ||
              issue.department == filters.category ||
              filters.category == ''
          )

          .map((issue) => (
            <SupportItem key={issue.id} issue={issue} />
          ))}
      </ul>
    </section>
  )
}

export default SupportList

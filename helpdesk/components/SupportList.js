import SupportItem from './SupportItem'
import { useState } from 'react'
const SupportList = ({ issues }) => {
  const [severityF, setFilters] = useState({
    severity: '',
    category: '',
  })
  return (
    <section className="issues">
      <h2>Henvendelser</h2>
      <select
        name="severity"
        onChange={(e) => setFilters({ severity: e.target.value })}
      >
        <option value="">Alle</option>
        <option value="low">Lav</option>
        <option value="medium">Medium</option>
        <option value="high">Høj</option>
      </select>

      <h2>Henvendelser</h2>
      <select
        name="category"
        onChange={(e) => setFilters({ category: e.target.value })}
      >
        <option value="">Alle</option>
        <option value="low">IT</option>
        <option value="medium">Medium</option>
        <option value="high">Høj</option>
      </select>
      <ul>
        {issues
          .filter(
            (issue) =>
              issue.severity == severityF.severity || severityF.severity == ''
          )
          .map((issue) => (
            <SupportItem key={issue.id} issue={issue} />
          ))}
      </ul>
    </section>
  )
}

export default SupportList

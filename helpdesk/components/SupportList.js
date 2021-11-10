import SupportItem from './SupportItem'
import { useState } from 'react'
const SupportList = ({ issues }) => {
  const [severityF, setSeverity] = useState({
    severity: '',
  })
  return (
    <section className="issues">
      <h2>Henvendelser</h2>
      <select
        name="severity"
        onChange={(e) => setSeverity({ severity: e.target.value })}
      >
        <option value="">Alle</option>
        <option value="low">Lav</option>
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

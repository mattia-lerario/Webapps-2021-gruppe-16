import SupportItem from './SupportItem'
import { useState } from 'react'

const SupportList = ({ issues, departments }) => {
  const [filters, setFilters] = useState({
    severity: '',
    department: '',
  })

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
            name="department"
            defaultValue={''}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
          >
            <option value="">Alle</option>
            {departments?.map((department) => {
              return (
                <option key={department.name} value={department.id}>
                  {department.name}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      <ul>
        {issues
          .filter(
            (issue) =>
              (!filters.severity && !filters.department) ||
              (!filters.severity && issue.departmentId == filters.department) ||
              (issue.severity == filters.severity && !filters.department) ||
              (issue.severity == filters.severity &&
                issue.departmentId == filters.department)
          )

          .map((issue) => (
            <SupportItem
              key={issue.id}
              issue={issue}
              department={departments.find(
                (dept) => dept.id == issue.departmentId
              )}
            />
          ))}
      </ul>
    </section>
  )
}

export default SupportList

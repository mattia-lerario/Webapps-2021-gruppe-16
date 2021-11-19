import SupportItem from './SupportItem'
import { useState } from 'react'

const SupportList = ({ issues, departments }) => {
  const [filters, setFilters] = useState({
    severity: '',
    department: '',
  })

  return !(issues && departments) ? (
    ''
  ) : (
    <section className="issues">
      <div className="issues_header">
        <div className="issues_title">
          <h2>Henvendelser</h2>
        </div>
        <div className="issues_filters">
          <select
            name="severity"
            defaultValue={'default'}
            onChange={(e) =>
              setFilters({ ...filters, severity: e.target.value })
            }
          >
            <option value="default" disabled hidden>
              Viktighet
            </option>
            <option value="">Alle</option>
            <option value="low">Lav</option>
            <option value="medium">Medium</option>
            <option value="high">Høy</option>
          </select>

          <select
            name="department"
            defaultValue={'default'}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
          >
            <option value="default" disabled hidden>
              Avdeling
            </option>
            <option value="">Alle</option>
            {departments?.map((department) => {
              return (
                <option key={department?.name} value={department?.id}>
                  {department?.name}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      <ul className="issues_list">
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
              initialShowComment={false}
            />
          ))}
      </ul>
    </section>
  )
}

export default SupportList

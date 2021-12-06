import SupportItem from './SupportItem'
import { useState } from 'react'

const SupportList = ({ issues, handleResolve, departments }) => {
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
<<<<<<< HEAD
        <div id="issuesFilters">

=======
        <div className="issues_filters">
>>>>>>> main
          <select
            name="severity"
            defaultValue={'default'}
            onChange={(e) =>
              setFilters({ ...filters, severity: e.target.value })
            }
          >
<<<<<<< HEAD
            <option value="">Viktighet</option>
=======
            <option value="default" disabled hidden>
              Viktighet
            </option>
            <option value="">Alle</option>
>>>>>>> main
            <option value="low">Lav</option>
            <option value="medium">Medium</option>
            <option value="high">Høy</option>
          </select>
          <p class="arrow"></p>


          <select
            name="department"
            defaultValue={'default'}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
          >
<<<<<<< HEAD
            <option value="">Avdeling</option>
=======
            <option value="default" disabled hidden>
              Avdeling
            </option>
            <option value="">Alle</option>
>>>>>>> main
            {departments?.map((department) => {
              return (
                <option key={department?.name} value={department?.id}>
                  {department?.name}
                </option>
              )
            })}
          </select>
          <p class="arrow"></p>

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
              handleResolve={handleResolve}
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

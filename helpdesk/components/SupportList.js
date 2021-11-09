import SupportItem from './SupportItem'

const severityInput = ''
const SupportList = ({ issues, severity }) => {
  return (
    <section className="issues">
      <h2>Henvendelser</h2>
      <form>
        <select
          name="severity"
          onChange={(e) => severityInput == e.target.value}
        >
          <option value="">Alle</option>
          <option value="low">Lav</option>
          <option value="medium">Medium</option>
          <option value="high">Høj</option>
        </select>
      </form>

      <ul>
        {issues
          .filter((issue) => issue.severity == severityInput)
          .map((issue) => {
            return <SupportItem key={issue.id} issue={issue} />
          })}
      </ul>
    </section>
  )
}

export default SupportList

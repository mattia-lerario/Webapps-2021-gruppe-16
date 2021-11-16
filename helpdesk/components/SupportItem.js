/* eslint-disable no-ternary */
const SupportItem = ({ issue: item }) => {
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null
  const statusCompleted = item?.status === 'completed' ? 'Ferdig' : null
  const statusInProgress =
    item?.status === 'in_progress' ? 'Under arbeid' : null

  console.log(item) // REMOVE

  return (
    <li className="issue">
      <div className="meta">
        <span>{item?.department}</span>
        <span>{severityHigh ?? severityMedium ?? severityLow}</span>
      </div>
      <h3>
        {item?.title} {item?.isResolved ? '(løst)' : null}
      </h3>
      <p>{item?.description}</p>
      <span>{item?.creator}</span>
      <footer>
        <p>{item?.createdAt}</p>
        <div className="issue_actions">
          <button type="button">Se kommentarer (2)</button>
          <button type="button">Legg til kommentar</button>
          <button type="button">Avslutt</button>
        </div>
      </footer>
      <div className="commentForm">
        <form hidden>
          <textarea
            name="comment"
            id={item?.id}
            cols="30"
            rows="10"
            placeholder="Skriv en kommentar"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </li>
  )
}

export default SupportItem

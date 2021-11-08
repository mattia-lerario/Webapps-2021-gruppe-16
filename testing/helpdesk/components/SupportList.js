import SupportItem from './SupportItem'

const SupportList = ({ issues }) => {
  return (
    <section className="issues">
      <h2>Henvendelser</h2>
      <ul>
        {issues?.map((issue) => (
          <SupportItem key={issue.id} item={issue} />
        ))}
      </ul>
    </section>
  )
}

export default SupportList

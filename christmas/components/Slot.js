const Slot = ({ slot }) => {
  /* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
  console.log(slot)

  return (
    <section className="slot">
      <h1>{slot?.id}</h1>
    </section>
  )
}

export default Slot

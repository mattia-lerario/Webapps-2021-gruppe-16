//create slot component based on calendar
import Calendar from './Calendar'

const Slot = (
  id,
  key,
  slug,
  createdAt,
  openedAt,
  calendarId,
  userSlot,
  status
) => {
  const slugs = slug
  return (
    <div className={`card${status}`} key={id}>
      <div className="card">
        <h5 className="card-title date">{slugs}</h5>

        <div className={`card-content`}>
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6">
              <p className="card-text">s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slot

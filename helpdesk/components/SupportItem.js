/* eslint-disable no-ternary */
import { create } from 'middleware/database'
import { useState } from 'react'
import SupportComment from './SupportComment'

const SupportItem = ({ issue: item }) => {
  // TRANSLATE ENGLISH TO NORWEGIAN ???
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null

  // STATE AND HANDLERS FOR SHOWING COMMENT & ADD COMMENT SECTION
  const [showComments, setShowComments] = useState(false)
  const [showAddComment, setShowAddComment] = useState(false)
  const [comment, setComment] = useState({ description: '' })

  const handleShowComments = () => setShowComments(!showComments)
  const handleShowAddComment = () => setShowAddComment(!showAddComment)

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setComment({ [name]: value })

  const handleAddComment = (event) => {
    event.preventDefault()
    console.log(comment?.description)
    // 1. Validate comment
    // 2. Add comment to issue (REMINDER: Add ID to h5)
    // 3. Update comment through API in DB
    return
  }

  return (
    <>
      {/* SHOW ISSUE INFORMATION */}
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
            <button type="button" onClick={handleShowComments}>
              Se kommentarer ({item?.comments ? item.comments.length : 0})
            </button>
            <button type="button" onClick={handleShowAddComment}>
              Legg til kommentar
            </button>
            <button
              type="button"
              // onClick={item?.isResolved == '(løst)'} // Creates Errors
            >
              Avslutt
            </button>
          </div>
        </footer>
      </li>

      {/* SHOW COMMENTS SECTION */}
      {showComments && item?.comments && (
        <section>
          {item?.comments?.map((comment) => (
            <SupportComment key={comment.id} comment={comment} />
          ))}
        </section>
      )}

      {/* SHOW ADD COMMENT SECTION */}
      {showAddComment && (
        <section className="issue_comment_add">
          <h5>Legg til kommentar</h5>
          <form onSubmit={handleAddComment}>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Skriv her"
              maxLength="250"
              onChange={handleInputOnChange}
              required
            />
            <button type="sumbit">Send</button>
          </form>
        </section>
      )}
    </>
  )
}

export default SupportItem

/* eslint-disable no-ternary */
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

  const handleShowComments = () => setShowComments(!showComments)
  const handleShowAddComment = () => setShowAddComment(!showAddComment)
  const handleAddComment = () => {
    // 1. Validate comment
    // 2. Add comment to issue
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
            <button type="button" onClick={item?.isResolved == '(løst)'}>
              Avslutt
            </button>
          </div>
        </footer>
      </li>

      {/* SHOW COMMENTS SECTION */}
      {showComments && (
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
          <input type="textfield" />
          <button type="button" onClick={handleAddComment}>
            Send
          </button>
        </section>
      )}
    </>
  )
}

export default SupportItem

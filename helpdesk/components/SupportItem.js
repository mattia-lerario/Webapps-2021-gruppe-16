/* eslint-disable no-ternary */
import { useState } from 'react'
import SupportComment from './SupportComment'

const SupportItem = ({ issue: item }) => {
  // TRANSLATE ENGLISH TO NORWEGIAN ???
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null

  // STATE AND HANDLERS FOR SHOWING COMMENT & ADD COMMENT SECTION
  const [showComments, setShowComments] = useState(true)
  const [showAddComment, setShowAddComment] = useState(false)
  const [showIssue, setShowIssue] = useState(true)
  const [comment, setComment] = useState({ description: '' })
  const handleShowComments = () => setShowComments(!showComments)
  const handleShowAddComment = () => setShowAddComment(!showAddComment)
  const handleShowIssue = () => setShowIssue(!showIssue)

  //create function that removes and hides issues from list

  const handleDeleteIssue = (e) => {
    e.preventDefault()
    handleShowIssue(!showIssue)
    if (showIssue === false) {
      setShowComments(false)
      setShowAddComment(false)
    }
  }
  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setComment({ [name]: value })
  // handle resolve and remove issue from list

  const handleAddComment = (event) => {
    event.preventDefault()

    // 1. Give comment an ID
    let id = item?.comments ? item.comments.length + 1 : 1

    // 2. Add comment to issue (REMINDER: Add ID to h5)
    if (item?.comments) {
      item.comments.push({ id: id, ...comment })
    } else {
      item['comments'] = [{ id: id, ...comment }]
    }

    // 4. Clear comment input
    setComment({ description: '' })

    // 4. Close comment field
    setShowAddComment(false)

    // 5. Show comments
    setShowComments(true)
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
            <button type="button" onClick={handleDeleteIssue}>
              {item?.isResolved ? '(løst)' : 'Avslutt'}
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

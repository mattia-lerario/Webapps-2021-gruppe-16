/* eslint-disable no-ternary */
import { useRouter } from 'next/dist/client/router'
import { useState, useEffect } from 'react'
import SupportComment from './SupportComment'
import axios from 'axios'

const SupportItem = ({
  issue: item,
  handleResolve,
  department,
  initialShowComment,
}) => {
  // ROUTER
  const router = useRouter()

  // STATE AND HANDLERS FOR COMMENTS
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({
    comment: '',
    issueId: item.id,
  })
  const [showComments, setShowComments] = useState(initialShowComment)
  const [showAddComment, setShowAddComment] = useState(false)
  const handleShowComments = () =>
    comments.length > 0 && setShowComments(!showComments)
  const handleShowAddComment = () => setShowAddComment(!showAddComment)

  // FETCH COMMENTS WHEN COMPONENT LOADS
  useEffect(async () => {
    const temp = []
    const response = await axios.get('/api/comments')

    response?.data.map((comment) => {
      if (comment.issueId === item.id) {
        temp.push(comment)
      }
    })
    setComments(temp)

    return () => {} // cleanup
  }, [])

  // HANDLE NEW COMMENT
  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setNewComment({ ...newComment, [name]: value })

  // HANDLE CREATING NEW COMMENT AND ADDING TO ISSUE
  const handleAddComment = async (event) => {
    event.preventDefault()

    // Create new comment entry via api
    const response = await axios.post('/api/comments', newComment)
    setComments([...comments, response.data])

    // Add new comment to issue and reset forms
    setNewComment({ ...newComment, comment: '' })
    setShowAddComment(false)
    setShowComments(true)
  }

  // HANDLE RESOLVING ISSUE
  const handleResolveIssue = async (event) => {
    event.preventDefault()

    if (item.isResolved) return // Don't send if already resolved.

    await axios.put(`/api/issues/${item.id}`, {
      ...item,
      isResolved: true,
    })
    handleResolve(item.id)
  }

  // HANDLE CLICK TITLE
  const handleTitleClick = (event) => {
    event.preventDefault()
    router.push(`/issues/${item.id}`)
  }

  // Taken from: https://stackoverflow.com/questions/39401504/javascript-react-dynamic-height-textarea-stop-at-a-max
  const handleAdjustTextArea = (event) => {
    event.target.style.height = 'inherit'
    event.target.style.height = `${event.target.scrollHeight}px`
  }

  // FORMAT VALUES
  const date = item?.createdAt
  const formatedDate = new Date(date).toLocaleDateString()
  const departmentName =
    department?.name.charAt(0).toUpperCase() + department?.name.slice(1)

  // SEVERITY OPTIONS
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null
  const severityColor = `issue_main_severity issue_main_severity_${item?.severity}`

  return !(item && department) ? (
    ''
  ) : (
    <>
      {/* CONTAINER FOR ISSUE, COMMENTS, AND NEW COMMENT */}
      <li className="issue">
        {/* SHOW ISSUE INFORMATION */}
        <section className="issue_main">
          <header className="issue_main_header">
            <span className="issue_main_department">{departmentName}</span>
            <span className={severityColor}>
              {severityHigh ?? severityMedium ?? severityLow}{' '}
              <span className="issue_main_severity_dot">&nbsp;&#9679;</span>
            </span>
          </header>
          <h3 className="issue_main_title" onClick={handleTitleClick}>
            {item?.title} {item?.isResolved ? '(løst)' : null}
          </h3>
          <p className="issue_main_description">{item?.description}</p>
          <p className="issue_main_creator">{item?.creator}</p>
          <footer className="issue_main_footer">
            <p className="issue_main_date">{formatedDate}</p>
            <div className="issue_main_actions">
              {!comments.length > 0 ? (
                ''
              ) : (
                <a
                  type="button"
                  className={showComments ? 'active' : ''}
                  onClick={handleShowComments}
                >
                  {showComments ? 'Skjul' : 'Se'} kommentarer (
                  {comments?.length})
                </a>
              )}
              <a
                type="button"
                className={showAddComment ? 'active' : ''}
                onClick={handleShowAddComment}
              >
                Legg til kommentar
              </a>
              {!item?.isResolved && (
                <a type="button" onClick={handleResolveIssue}>
                  Avslutt
                </a>
              )}
            </div>
          </footer>
        </section>

        {/* SHOW ADD COMMENT SECTION */}
        {showAddComment && (
          <section className="issue_add">
            <header className="issue_add_header">
              <h5 className="issue_add_title">Legg til kommentar</h5>
              <a
                className="issue_add_close"
                type="button"
                onClick={handleShowAddComment}
              >
                X
              </a>
            </header>
            <form id="issue_add_form" onSubmit={handleAddComment}>
              <textarea
                className="issue_add_comment"
                type="text"
                id="comment"
                name="comment"
                placeholder="Skriv kommentaren her..."
                maxLength="250"
                onKeyUp={handleAdjustTextArea}
                onChange={handleInputOnChange}
                value={newComment.comment}
                required
              />
              <footer className="issue_add_footer">
                <button className="issue_add_submit" type="sumbit">
                  Send
                </button>
              </footer>
            </form>
          </section>
        )}

        {/* SHOW COMMENTS SECTION */}
        {showComments && comments.length > 0 && (
          <section className="issue_comments">
            {comments?.map((comment) => (
              <SupportComment key={comment.id} comment={comment} />
            ))}
          </section>
        )}
      </li>
    </>
  )
}

export default SupportItem

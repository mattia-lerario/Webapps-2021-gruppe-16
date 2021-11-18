/* eslint-disable no-ternary */
import { useRouter } from 'next/dist/client/router'
import { useState, useEffect } from 'react'
import SupportComment from './SupportComment'
import axios from 'axios'

const SupportItem = ({ issue: item, department, initialShowComment }) => {
  // ROUTER
  const router = useRouter()

  // TRANSLATE ENGLISH TO NORWEGIAN ???
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null

  // STATE AND HANDLERS FOR COMMENTS
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({
    comment: '',
    issueId: item.id,
  })
  const [showComments, setShowComments] = useState(initialShowComment)
  const [showAddComment, setShowAddComment] = useState(false)
  const handleShowComments = () => setShowComments(!showComments)
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

    return () => {
      // cleanup
    }
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

  // HANDLE CLICK TITLE
  const handleTitleClick = (event) => {
    event.preventDefault()
    router.push(`/issues/${item.id}`)
  }

  // FORMAT VALUES
  const date = item?.createdAt
  const formatedDate = new Date(date).toLocaleDateString()
  const departmentName =
    department?.name.charAt(0).toUpperCase() + department?.name.slice(1)

  return !(item && department) ? (
    <p>Loading...</p>
  ) : (
    <>
      {/* SHOW ISSUE INFORMATION */}
      <li className="issue">
        <div className="meta">
          <span>{departmentName}</span>
          <span>{severityHigh ?? severityMedium ?? severityLow}</span>
        </div>
        <h3 onClick={handleTitleClick}>
          {item?.title} {item?.isResolved ? '(løst)' : null}
        </h3>
        <p>{item?.description}</p>
        <span>{item?.creator}</span>
        <footer>
          <p className="issue_date">Opened: {formatedDate}</p>
          <div className="issue_actions">
            <button type="button" onClick={handleShowComments}>
              Se kommentarer ({comments ? comments.length : 0})
            </button>
            <button type="button" onClick={handleShowAddComment}>
              Legg til kommentar
            </button>
            <button type="button">
              {item?.isResolved ? '(løst)' : 'Avslutt'}
            </button>
          </div>
        </footer>
      </li>

      {/* SHOW COMMENTS SECTION */}
      {showComments && comments && (
        <section>
          {comments?.map((comment) => (
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
              id="comment"
              name="comment"
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

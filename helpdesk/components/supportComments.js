//make const that takes all comments found in issues and shows them
import { useState } from 'react'
const SupportComments = ({ issue }) => {
  return (
    <div className="support-comments">
      <SupportComment issue={issue} />
      <div className="support-comments-list">
        {issue.comments.map((item) => (
          <SupportComment key={item.id} issue={item} />
        ))}
      </div>
    </div>
  )
}

//function that takes comments and return them in a list

//Form to send comments
const SupportCommentForm = ({ issue, onSubmit }) => {
  const [comment, setComment] = useState('')

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(issue.id, comment)
  }

  return (
    <form className="support-comment-form" onSubmit={handleSubmit}>
      <textarea
        className="support-comment-form-textarea"
        placeholder="Leave a comment"
        onChange={handleChange}
        value={comment}
      />
      <button className="support-comment-form-button">Submit</button>
    </form>
  )
}

export default (SupportComments, SupportCommentForm)

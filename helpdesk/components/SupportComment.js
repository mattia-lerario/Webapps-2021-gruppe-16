import { useState } from 'react'

export const SupportComment = ({ comment }) => {
  const date = comment?.createdAt
  const formatedDate = new Date(date).toLocaleDateString()

  return (
    <div className="issue_comment">
      <h5>Kommentar {comment?.id}</h5>
      <p>{comment?.comment}</p>
      <p className="issue_comment_date">Posted at: {formatedDate}</p>
    </div>
  )
}

export default SupportComment

import { useState } from 'react'

export const SupportComment = ({ comment }) => {
  return (
    <div className="issue_comment">
      <h5>Kommentar {comment?.id}</h5>
      <p>{comment?.description}</p>
    </div>
  )
}

export default SupportComment

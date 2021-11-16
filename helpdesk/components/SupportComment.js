import { useState } from 'react'

const SupportComments = ({ comment }) => {
  return (
    <div className="issue_comment">
      <h5>{comment?.title}</h5>
      <p>{comment?.description}</p>
    </div>
  )
}

export default SupportComments

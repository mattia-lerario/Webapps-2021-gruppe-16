export const SupportComment = ({ comment }) => {
  const date = comment?.createdAt
  const formatedDate = new Date(date).toLocaleDateString()

  return (
    <div className="comment">
      <h5 className="comment_title">Kommentar {comment?.id}</h5>
      <p className="comment_description">{comment?.comment}</p>
      <p className="comment_date">{formatedDate}</p>
    </div>
  )
}

export default SupportComment

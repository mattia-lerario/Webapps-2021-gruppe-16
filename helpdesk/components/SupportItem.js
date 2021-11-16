/* eslint-disable no-ternary */
import { useState } from 'react'
import SupportComments from './supportComments'

const SupportItem = ({ issue: item }) => {
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null

  return (
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
          <button type="button">
            Se kommentarer ({item?.comments ? item.comments.length : 0})
          </button>
          <button type="button">Legg til kommentar</button>
          <button type="button" onClick={item?.isResolved == '(løst)'}>
            Avslutt
          </button>
        </div>
      </footer>
      <div className="issue_comments">a</div>
      <div className="issue_new_comment">Legg til kommentar</div>
    </li>
  )
}

export default SupportItem

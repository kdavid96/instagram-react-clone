import React from 'react'
import './style.css'

export default function Popup({isOpen, setOpen, name, userName, auth}) {
  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <>
      {name === "post-options" ?
      <div className="add-image-popup" style={{display: isOpen ? "block" : "none"}} onClick={stopPropagation}>
        <ul className="popup-body post-popup">
          <li className="post-option">Report</li>
          <li className="post-option">Unfollow</li>
          <li className="post-option">Go to post</li>
          <li className="post-option">Tagged accounts</li>
          <li className="post-option">Share to...</li>
          <li className="post-option">Copy link</li>
          <li className="post-option">Embed</li>
          <li className="post-option">Cancel</li>
        </ul>
      </div>
      :
      <ul className="profile-options-dropdown" style={{display: isOpen ? "grid" : "none"}} onClick={() => setOpen(!isOpen)}>
        <li>Profile</li>
        <li>Saved</li>
        <li>Settings</li>
        <li>Switch Accounts</li>
        <li style={{color: 'red'}} onClick={() => auth.signOut()}>Sign out</li>
      </ul>
      }
    </>
  )
}

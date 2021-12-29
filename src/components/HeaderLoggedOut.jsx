import React from 'react'
import './style.css'

export default function HeaderLoggedOut({signInWithGoogle}) {
  return (
    <div style={{width: '100%', borderBottom: '1px solid #DBDBDB'}} className="bg-white header-container">
      <div className="inner-container mx-auto min-h-max bg-white flex flex-auto flex-row p-3">
        <div className='inner-logo-container'>
          <img src="./instagram-logo.png" style={{height: '75%', paddingTop: '5px'}} alt="logo" />
        </div>
        <div className="main-page-button-header">
          <button onClick={signInWithGoogle}>Login</button>
        </div>
      </div>
    </div>
  )
}

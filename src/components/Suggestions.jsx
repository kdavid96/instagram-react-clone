import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'

export default function Suggestions() {
  const [suggestionUsers, setSuggestionUsers] = useState([]);
  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=5')
      .then(res => setSuggestionUsers(res.data.results))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="suggestions">
      <div className='about'>
        <div className="suggestion-first-column">
          <img className='prof-img-big' src="https://randomuser.me/api/portraits/men/11.jpg" alt="profile_pic"/>
          <div className='name-display'>
            <p className='username'>example.user</p>
            <p className='name'>Example User</p>
          </div>
        </div>
        <p className="switch">Switch</p>
      </div>
      <div className='for-you'>
        <div className="for-you-header">
          <h1 className='name-bold'>Suggestions For You</h1>
          <p className='see-all'>See All</p>
        </div>
        <div className="for-you-body">
          {suggestionUsers.map( (user, index) => (
          <div className='about-suggestion' key={index}>
            <div className="suggestion-first-column">
              <img className='prof-img-medium' src={user.picture.thumbnail} alt="profile_pic"/>
              <div className='name-display'>
                <p className='username'>{user.name.first}_{user.name.last}</p>
                <p className='name'>{user.name.first} {user.name.last}</p>
              </div>
            </div>
            <p className="switch">Follow</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

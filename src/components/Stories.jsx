import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import './style.css'

function Story({url, name, setOpen, isOpen}){
  const openPopup = () => {
    console.log("OPEN STORY");
  }

  return(
    <div className="story-container" onClick={() => {setOpen(!isOpen)}}>
      <span className="story-preview-container">
        <img src={url} alt='prof-img' className='story-preview' onClick={() => openPopup()}/>
      </span>
      <p>{name}</p>
    </div>
  )
}

export default function Stories({isOpen, setOpen}) {
  const [storiesUsers, setStoriesUsers] = useState([]);
  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=20')
      .then(res => setStoriesUsers(res.data.results))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='stories-container'>
      {storiesUsers.map( (user, index) => (
          <Story key={index} url={user.picture.thumbnail} name={user.name.first} isOpen={isOpen} setOpen={setOpen}/>
          ))}
    </div>
  )
}

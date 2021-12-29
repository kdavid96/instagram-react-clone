import React from 'react'
import './style.css'
import Popup from './Popup';
import { MdHomeFilled } from 'react-icons/md'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { BsPlusSquare } from 'react-icons/bs'
import { AiOutlineCompass, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai'

export default function Header({userPhoto, isOpenAdd, setOpenAdd, isOpenProfile, setOpenProfile, userName, auth}) {
  function openAddPopup(){
    setOpenAdd(!isOpenAdd);
  }

  function openProfilePopup(){
    setOpenProfile(!isOpenProfile);
  }

  function reload(){
    window.reload();
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div style={{width: '100%', borderBottom: '1px solid #DBDBDB'}} className="bg-white header-container">
      <div className="inner-container mx-auto min-h-max bg-white flex flex-auto flex-row p-3">
        <div className='inner-logo-container'>
          <img src="./instagram-logo.png" style={{height: '75%', paddingTop: '5px'}} alt="logo" />
          <div className="flex flex-row items-center justify-center search-container">
            <span className='search-icon'><AiOutlineSearch /></span>
            <input type="text" placeholder='Search'/>
          </div>
        </div>
        <ul className="header-list flex-row">
          <li style={{fontSize: "1.5rem", cursor: 'pointer', width: '45%'}} onClick={() => reload()}><MdHomeFilled /></li>
          <li style={{fontSize: "1.5rem", cursor: 'pointer', width: '45%'}} ><IoPaperPlaneOutline /></li>
          <li style={{fontSize: "1.5rem", cursor: 'pointer', width: '45%'}} onClick={() => openAddPopup()}><BsPlusSquare /></li>
          <li style={{fontSize: "1.5rem", cursor: 'pointer', width: '45%'}}><AiOutlineCompass /></li>
          <li style={{fontSize: "1.5rem", cursor: 'pointer', width: '45%'}}><AiOutlineHeart /></li>
          <li style={{fontSize: "1.5rem", cursor: 'pointer', width: '45%'}} onClick={() => openProfilePopup()}>
            <img className='prof-img' alt="" referrerpolicy="no-referrer" src={userPhoto} />
            <div className="profile-container absolute flex justify-center items-center" style={{display: isOpenProfile ? "flex" : "none"}} onClick={() => (openProfilePopup(), stopPropagation())}>
              <div className='rotated-cube'></div>
              <Popup isOpen={isOpenProfile} setOpen={setOpenProfile} name="profile" userName={userName} auth={auth}/>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

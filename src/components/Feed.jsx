import React, { useState, useEffect } from 'react'
import './style.css'
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { BsThreeDots } from 'react-icons/bs'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { GrBookmark } from 'react-icons/gr'
import { HiOutlineEmojiHappy } from 'react-icons/hi'

function Post({profImg, name, img, text, setOpenPostOptions, isOpenPostOptions, logged, userName, postId}) {
  const likesCollectionsRef = collection(db, "likes");
  const [likes, setLikes] = useState([]);
  const [isLiked, setLiked] = useState(false);
  const [comment, setComment] = useState('');

  const sendComment = (commentInput) => {
    console.log(comment + ":::" + postId);
    setComment("");
  }

  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  }

  const likePost = async (postId) => {
    const processedName = userName.replace(/\s/g, "");
    var post = []
    likes.forEach(object => {
      if(object.id === postId){
        post = object.likes;
      }
    })

    await setDoc(doc(db, "likes", postId), {
      likes: post + ":" + processedName
    })
    setLiked(true);
    getLikes();
    console.log(likes);
  }

  const getLikes = async () => {
    const data = await getDocs(likesCollectionsRef);
    setLikes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  }

  useEffect(() =>{
    const getLikes = async () => {
      const data = await getDocs(likesCollectionsRef);
      setLikes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getLikes();
    likes.forEach(object => {
      if(object.id === postId){
        object.likes.split(":").forEach(name => {
          if(name === userName.replace(/\s/g, "")){
            setLiked(true);
          }
        })
      }
    })
  }, []);

  return (
    <div className="post">
      <div className='post-header'>
        <div className="header-content">
          <img src={profImg} referrerpolicy="no-referrer" alt='prof-img' className='post-preview'/>
          <p>{name}</p>
        </div>
        <BsThreeDots style={{cursor: 'pointer'}} onClick={() => setOpenPostOptions(!isOpenPostOptions)}/>
      </div>
      <img className='post-img' src={img} alt="post_img" />
      <div className='text-section'>
      {logged ? 
        <div className='icons'>
          <div className='left'>
            {
              isLiked ? 
              <span style={{fontSize: "1.5rem", cursor: 'pointer'}}><AiFillHeart /></span>
              :
              <span style={{fontSize: "1.5rem", cursor: 'pointer'}} onClick={() => likePost(postId, userName)}><AiOutlineHeart /></span>
            }
            <span style={{fontSize: "1.5rem"}}><FaRegComment /></span>
            <span style={{fontSize: "1.5rem"}}><IoPaperPlaneOutline /></span>
          </div>
          <div className='right'>{
            name === userName ? 
            <span style={{fontSize: "1.5rem", cursor: 'pointer'}} onClick={() => deletePost(postId)}><AiOutlineDelete /></span> : ''
          }
            <span style={{fontSize: "1.5rem"}}><GrBookmark /></span>
          </div>
        </div> : ''}
        <div className="flex flex-col">
          <span className='likes'>{likes.length === 0 ? "" : likes.length === 1 ?  <p>1 like</p> : <p>{likes.length} likes</p>}</span>
          <span className='desc'><span className='username-post'>{name}</span> {text}</span>
          <span className='comment-count'>View all 25 comments</span>
          <span className='time'>17 HOURS AGO</span>
        </div>
      </div>
      <div className='flex flex-row items-center justify-start comment-box'>
        <div className="flex flex-row items-center comment-content grow">
          <span className='comment-icon'><HiOutlineEmojiHappy /></span>
          <input id="comment-input" className="grow" type="text" placeholder='Add a comment...'/>
        </div>
        <button className="comment-button"  value={comment} onChange={event => setComment(event.target.value)} onClick={() => sendComment(document.getElementById('comment-input').data)} type='submit'>Post</button>
      </div>
    </div> 
  )
}

export default function Feed({isOpenPostOptions, setOpenPostOptions, posts, logged, userName}) {
  return (
    <div className="feed">
      {
        posts.map(post => {
          return (
            <Post img={post.imageUrl} profImg={post.profileUrl} name={post.username} text={post.caption} setOpenPostOptions={setOpenPostOptions} isOpenPostOptions={isOpenPostOptions} key={post.id} logged={logged} postId={post.id} userName={userName}/>
          )
        })
      }
    </div>
  )
}

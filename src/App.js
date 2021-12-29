import React, { useState, useEffect } from 'react';
import './App.css';
import { collection, getDocs } from 'firebase/firestore';
import 'firebase/firestore';
import 'firebase/auth';
import { db, auth } from './firebase-config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from './components/Header';
import HeaderLoggedOut from './components/HeaderLoggedOut';
import Stories from './components/Stories';
import Feed from './components/Feed';
import Popup from './components/Popup';
import ImageUpload from './components/ImageUpload';

function App() {
  const [isOpen, setOpen] = useState(false);
  const [isOpenAdd, setOpenAdd] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isOpenPostOptions, setOpenPostOptions] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userPhoto, setUserPhoto] = useState('');
  const [userName, setUserName] = useState('');
  const postCollectionsRef = collection(db, "posts");
  const [user] = useAuthState(auth); 

  useEffect(() =>{
    const getPosts = async () => {
      const data = await getDocs(postCollectionsRef);
      setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getPosts();
  }, [postCollectionsRef]);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((re) => {
        setUserPhoto(re.user.photoURL);
        setUserName(re.user.displayName);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      {user && userName !== '' ? 
        <>
          <Header userPhoto={userPhoto} isOpenAdd={isOpenAdd} setOpenAdd={setOpenAdd} isOpenProfile={isOpenProfile} setOpenProfile={setOpenProfile} userName={userName} auth={auth} />
          <div className="main-panel" onClick={() => setOpenProfile(false)}>
            <div className="flex flex-col">
              {/*<Stories isOpen={isOpen} setOpen={setOpen} />*/}
              <Feed isOpenPostOptions={isOpenPostOptions} setOpenPostOptions={setOpenPostOptions} posts={posts} logged={true} userName={userName} />
            </div>
            {/*<Suggestions />*/}
          </div>
          <div className="blur-bg flex justify-center items-center" style={{display: isOpenAdd ? "flex" : "none"}} onClick={() => setOpenAdd(!isOpenAdd)}>
            <ImageUpload isOpen={isOpenAdd} setOpen={setOpenAdd} name="add" userName={userName} userPhoto={userPhoto} />
          </div>
          <div className="blur-bg flex justify-center items-center" style={{display: isOpenPostOptions ? "flex" : "none"}} onClick={() => setOpenPostOptions(!isOpenPostOptions)}>
            <Popup isOpen={isOpenPostOptions} setOpen={setOpenPostOptions} name="post-options" />
          </div>
        </>
      :
      <>
        <HeaderLoggedOut signInWithGoogle={signInWithGoogle} />
        <div className="main-panel">
            <div className="flex flex-col">
              <Feed isOpenPostOptions={isOpenPostOptions} setOpenPostOptions={setOpenPostOptions} posts={posts} logged={false} userName=''/>
            </div>
            {/*<Suggestions />*/}
          </div>
          <div className="blur-bg flex justify-center items-center" style={{display: isOpenAdd ? "flex" : "none"}} onClick={() => setOpenAdd(!isOpenAdd)}>
            <ImageUpload isOpen={isOpenAdd} setOpen={setOpenAdd} name="add" userName={userName} userPhoto={userPhoto} logged={false} />
          </div>
          <div className="blur-bg flex justify-center items-center" style={{display: isOpenPostOptions ? "flex" : "none"}} onClick={() => setOpenPostOptions(!isOpenPostOptions)}>
            <Popup isOpen={isOpenPostOptions} setOpen={setOpenPostOptions} name="post-options" />
          </div>
      </>}
    </div>
  );
}

export default App;

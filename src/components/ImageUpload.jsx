import React, { useState } from 'react';
import { db, storage } from '../firebase-config';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import ProgressBar from '@ramonak/react-progress-bar';
import './style.css';

function ImageUpload({isOpen, userName, userPhoto, setOpen}) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);

  function stopPropagation(e) {
    e.stopPropagation();
  }

  const handleChange = async (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }

  const handleUpload = async () => {
    const promises = [];
    var dlUrl = "";
    var docRefId = "";
    try{
      console.log(serverTimestamp())
      const storageRef = ref(storage, image.name /*+ serverTimestamp()*/);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      var docRef;

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);
        }, 
        (error) => {
          console.log("unsuccessful upload: ", error);
        });
      Promise.all(promises).then(
        () => {
          docRef = getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            dlUrl = downloadURL;
          }).then(
            addDoc(collection(db, "posts"), {
              id: '',
              caption: caption,
              imageUrl: dlUrl,
              username: userName,
              timeStamp: serverTimestamp(),
              profileUrl: userPhoto
            }).then(docRef => docRefId = docRef.id)
          ).then( async () => {
            const updateRef = doc(db, "posts", docRefId);
            await updateDoc(updateRef, {
              id: docRefId,
              imageUrl: dlUrl
            })
          }
          );
          setCaption("");
          setOpen(false);
          setProgress(0);
        }
      );
    }catch(e){
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="add-image-popup" style={{display: isOpen ? "block" : "none"}} onClick={stopPropagation}>
      <div className="popup-header">
        <p>Create new post</p>
      </div>
      <div className="popup-body">
        <div className="flex flex-col justify-evenly items-center" style={{height: '100%'}}>
          <p></p>
          <label>
          <input type="file" accept="image/png, image/jpeg" onChange={handleChange} />
          Select a photo
          </label>
          <br/>
          <input type="text" placeholder='Enter a caption' style={{textAlign: 'center'}} id="caption" value={caption} onChange={event => setCaption(event.target.value)}/>  
        <button className="upload-button" onClick={handleUpload}>Upload</button>
        </div>
        <ProgressBar width='200px' completed={progress} />
      </div>
      <div>
      </div>
    </div>
  )
}

export default ImageUpload

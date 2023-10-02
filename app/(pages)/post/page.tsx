'use client'
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, storage } from '@/app/firebase/config';

import {
  getDownloadURL,
  ref,
  ref as storageRef,
  uploadBytes,
  uploadBytesResumable,
  UploadTask
} from "firebase/storage";

export const metadata = {
  title: 'Add Post - LinkThink',
  description: 'Page description',
}

export default function Post() {
  const [title, setTitle] = useState('')
  const [descr, setDescr] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [email, setEmail] = useState('')
  const [link, setLink] = useState('')
  const [titleError, setTitleError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [descrError, setDescrError] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [linkError, setLinkError] = useState(false)
  const [posted, setPosted] = useState(false)
  const [imageUpload, setImageUpload] = useState(null);
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");


  const router = useRouter()
  const dbInstance = collection(db, 'post');

  const handleForm = async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    setTitleError(false);
    setDescrError(false);
    setCategoryError(false);
    setLinkError(false);
    setTitleError(false);
    setPosted(false);
    setEmailError(false);

    console.log(category);

    if (title == '') {
      setTitleError(true);
      return;
    }
    if (descr == '') {
      setDescrError(true);
      return;
    }
    if (category == '') {
      setCategoryError(true);
      return;
    } 
    if (email == '') {
      setEmailError(true);
      return;
    }

    // uploading image 
    if (file !== null) {
      console.log("uploading image");
      const imageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //your code...
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL); 
            // sending data to firebase 
            addDoc(dbInstance, {
              title: title,
              descr: descr,
              email: email, 
              category: category,
              image: downloadURL,
              link: link,
              upvotes: 0,
              downvotes: 0,
              pp: '',
              review: "pending",
              date: Timestamp.fromDate(new Date()),
            });
            setPosted(true);
          });
        }
      );;

    }


  }
  return (
    <>
      {posted ?
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-10">
                <h1 className="h3">Your listing was added successfully</h1>
              </div>

            </div>
          </div>
        </section>
        :
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-10">
                <h1 className="h3">Add a listing</h1>
              </div>

              {/* Form */}
              <div className="max-w-lg mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="title">Title*</label>
                      <input id="title" type="text" className={titleError ? "form-input w-full text-gray-300 border-rose-500" : "form-input w-full text-gray-300"} placeholder="Add Title" onChange={event => setTitle(event.target.value)} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Description*</label>
                      <textarea id="textarea" type="textarea" rows="10" cols="70" className={descrError ? "form-input w-full text-gray-300 border-rose-500" : "form-input w-full text-gray-300"} placeholder="Description" onChange={event => setDescr(event.target.value)} required></textarea>

                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="category">Category*</label>
                      <select onChange={event => setCategory(event.target.value)} className={categoryError ? "py-3 px-4 pr-9 block w-full border-rose-500 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-rose-500 dark:text-gray-400" : "py-3 px-4 pr-9 block w-full border-gray-600 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"} >
                        <option selected>Select a category</option>
                        <option>Business</option>
                        <option>Company</option>
                        <option>App</option>
                      </select>
                    </div>

                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="images">Images</label>

                      <input id="file" type="file" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" onChange={(e) => {
                        setFile(e.target.files[0]);
                      }} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="link">Email *</label>
                      <input id="email" type="email" className={emailError ? "form-input w-full text-gray-300 border-rose-500" : "form-input w-full text-gray-300"} placeholder="john@example.com" onChange={event => setEmail(event.target.value)} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="link">Reference Link</label>
                      <input id="mainLink" type="text" className={linkError ? "form-input w-full text-gray-300 border-rose-500" : "form-input w-full text-gray-300"} placeholder="Add link to product" onChange={event => setLink(event.target.value)} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" type="submit" onClick={handleForm}>Post</button>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

      }


    </>
  )
}

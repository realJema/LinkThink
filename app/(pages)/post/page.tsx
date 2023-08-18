'use client'
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/app/firebase/config';

export const metadata = {
  title: 'Add Post - LinkThink',
  description: 'Page description',
}

export default function Post() {
  const [title, setTitle] = useState('')
  const [descr, setDescr] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [link, setLink] = useState('')
  const [titleError, setTitleError] = useState('')
  const [descrError, setDescrError] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [linkError, setLinkError] = useState(false)
  const [posted, setPosted] = useState(false)


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
    if (link == '') {
      setLinkError(true);
      return;
    }


    // sending data to firebase 
    await addDoc(dbInstance, {
      title: title,
      descr: descr,
      category: category,
      image: image,
      link: link,
      upvotes: 0,
      downvotes: 0,
      pp: '',
      date: Timestamp.fromDate(new Date()),
    })
    setPosted(true);

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
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Title*</label>
                      <input id="email" type="email" className={titleError ? "form-input w-full text-gray-300 border-rose-500" : "form-input w-full text-gray-300"} placeholder="Add Title" onChange={event => setTitle(event.target.value)} required />
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
                      <select onChange={event => setCategory(event.target.value)} className={categoryError ? "py-3 px-4 pr-9 block w-full border-rose-500 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-rose-500 dark:text-gray-400" : "py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"} >
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
                      <div className="flex items-center justify-center w-full">
                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div>

                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="link">Reference Link*</label>
                      <input id="mainLink" type="text" className={linkError ? "form-input w-full text-gray-300 border-rose-500" : "form-input w-full text-gray-300"} placeholder="Add link to product" onChange={event => setLink(event.target.value)} required />
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

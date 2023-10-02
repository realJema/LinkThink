'use client'
import Image from 'next/image'

import Link from 'next/link';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import 'react-loading-skeleton/dist/skeleton.css'
import PostLoader from './postloader';
import { useEffect, useState } from 'react';
import { useTheme } from "next-themes";

export default function PostCard(props) {
  let posts = props.posts;
  const [loading, setLoading] = useState(true);

  const handleUpvote = async (id: undefined) => {
    const getUser = doc(db, 'post', id);

    await updateDoc(getUser, {
      upvotes: increment(1),
      // upvoters: arrayUnion("user id"),  // add id of user to array
    });
    console.log("upvoted");

  }
  const handleDownvote = async (id: undefined) => {
    const getUser = doc(db, 'post', id);

    await updateDoc(getUser, {
      downvotes: increment(1),
      // downvoters: arrayUnion("user id"),  // add id of user to array
    });

    console.log("down vote");

  }

  function getVoteDifference(object) {
    return object.upvotes - object.downvotes;
  }

  function getFontSize(phrase: string | any[]) {
    if (phrase.length < 10) {
      return "text-2xl"
    } else if (phrase.length < 20) {
      return "text-xl"
    } else {
      return "text-md"
    }
  }

  useEffect(() => {
    // if(posts.length != 0){
    //   setLoading(false); 
    // }

  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 lg:gap-4 items-start lg:max-w-none">
      {posts.sort((a, b) => {
        return getVoteDifference(b) - getVoteDifference(a);
      }).map((post) => {
        return (
          <div className='flex flex-col h-96 bg-white border border-purple-800 dark:border-gray-900 dark:bg-gray-800 ease-in-out rounded-md ' data-aos="fade-up">
            <Link className='mb-auto' href={{
              pathname: '/bideas/article',
              query: { title: post.title, image: post.image, descr: post.descr, name: post.name, pp: post.pp, role: post.role, email:post.email },
            }}>
              {post.image === '' ?
                ''
                :
                <div>
                  <Image className="object-cover w-full w-full h-32" src={post.image} height={500} width={500} alt="cover1" />
                </div>
              }
              <h3 className="text-lg text-gray-900 break-words line-clamp-2 text-ellipsis max-h-16 px-6 py-3 font-bold capitalize row dark:text-white">{post.title}</h3>
              <p className={getFontSize(post.descr).concat(" text-gray-900 px-6 break-words line-clamp-3 text-ellipsis grow dark:text-white")}>— {post.descr}</p>

            </Link>
            <div className="text-gray-700 inline-flex font-medium mt-4 p-6 border-t max-h-36   border-purple-700 justify-between">
              {/* <div className="relative inline-flex">
                {post.pp === '' ?
                  ''
                  :
                  <div className="relative inline-flex flex-col">
                    <Image className="rounded-full object-cover w-7 h-7" src={post.pp} width={10} height={10} alt="Testimonial 01" />
                    <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                    </svg>
                  </div>
                }
                <p className="ml-5 text-gray-900 inline-flex text-whit  not-italic dark:text-white">{post.name}</p>
              </div> */}

              <div className="justify-between ml-auto">
                {/* Social links */}
                <ul className="flex">
                  <li className='ml-4 p-2 rounded-md border-2 border-purple-800 hover:text-gray-100 flex justify-center items-center text-purple-600 bg-gray-800  rounded-full transition duration-150 ease-in-out bg-purple-700 hover:bg-purple-600' onClick={event => handleUpvote(post.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6M5 12l7-7 7 7" /></svg>
                    <p className='ml-2 text-sm text-white'>{post.upvotes}</p>
                  </li>
                  <li className='ml-4 p-2 rounded-md border-2 border-purple-800 hover:text-gray-100 flex justify-center items-center text-purple-600 bg-gray-800  rounded-full transition duration-150 ease-in-out bg-purple-700  hover:bg-purple-600' onClick={event => handleDownvote(post.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v13M5 12l7 7 7-7" /></svg>
                    <p className='ml-2 text-sm text-white'>{post.downvotes}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      })}

    </div>

  )
}

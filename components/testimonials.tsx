'use client'
import Image from 'next/image'

import Link from 'next/link';
import { Firestore, arrayUnion, doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';

export default function Testimonials(props) {
  let posts = props.posts;

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

  return (
    <section>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="mx-auto text-left pb-12 md:pb-20">
            <h2 className="h2 mb-4">Don't take our word for it</h2>
            <p className="text-xl text-gray-400">Vitae aliquet nec ullamcorper sit amet risus nullam eget felis semper quis lectus nulla at volutpat diam ut venenatis tellus—in ornare.</p>
          </div>

          {/* Testimonials */}
          <div className="max-w-screen-2xl mx-auto grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 lg:gap-4 items-start lg:max-w-none">

            {posts.sort((a, b) => {
              return getVoteDifference(b) - getVoteDifference(a);
            }).map((post) => {
              return (
                <div className='flex flex-col h-full bg-gray-800 ease-in-out ' data-aos="fade-up">
                  <Link className='mb-auto' href={{
                    pathname: '/bideas/article',
                    query: { title: post.title, coverImage: post.coverImage, descr: post.descr, name: post.name, pp: post.pp, role: post.role },
                  }}>
                    {post.image === '' ?
                      ''
                      :
                      <div>
                        <Image className="object-cover w-full h-36" src={post.coverImage} width={0} height={100} alt="cover1" />
                      </div>
                    }
                    <blockquote className="text-lg text-gray-400 px-6 py-3 font-bold capitalize row">{post.title}</blockquote>
                    <p className="text-sm text-gray-400 px-6 h-16 pb-6 grow">— {post.descr}</p>

                  </Link>
                  <div className="text-gray-700 inline-flex font-medium mt-6 p-6 border-t max-h-36   border-gray-700 justify-between">
                    <div className="relative inline-flex">
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
                      <p className="ml-5 text-gray-200 inline-flex   not-italic">{post.user}</p>
                    </div>

                    <div className="justify-between">
                      {/* Social links */}
                      <ul className="flex">
                        <li className='ml-4 p-2 rounded-md border-2 border-purple-800 hover:text-gray-100 flex justify-center items-center text-purple-600 bg-gray-800  rounded-full transition duration-150 ease-in-out hover:bg-purple-600' onClick={event => handleUpvote(post.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5d5dff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6M5 12l7-7 7 7" /></svg>
                          <p className='ml-2 text-sm'>{post.upvotes}</p>
                        </li>
                        <li className='ml-4 p-2 rounded-md border-2 border-purple-800 hover:text-gray-100 flex justify-center items-center text-purple-600 bg-gray-800  rounded-full transition duration-150 ease-in-out hover:bg-purple-600' onClick={event => handleDownvote(post.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5d5dff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v13M5 12l7 7 7-7" /></svg>
                          <p className='ml-2 text-sm'>{post.downvotes}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>

        </div>
      </div>
    </section>
  )
}

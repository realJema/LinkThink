export const metadata = {
  title: 'Glimpse - Business Ideas',
  description: 'Get inspired by business ideas',
}

import PostCard from '@/components/postCard'
import Newsletter from '@/components/newsletter'
import getDoument from '@/app/firebase/getData';
import { useEffect } from 'react';
import { useState } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import PostLoader from '@/components/postloader';

export default function Companies() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const q = query(collection(db, "post"), where("category", "==", "Company"));
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      console.log(posts); 
    })

  }, []);


  return (
    <section>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:pt-24 md:pb-12 border-t border-gray-800">

          {/* Section header */}
          <div className="mx-auto text-left pb-12 md:pb-20">
            <h2 className="h2 mb-4">Find your future company</h2>
            <p className="text-xl text-gray-800 dark:text-white">Looking for a company which matches your skills? </p>
          </div>
          {posts != null ?
            <PostCard posts={posts} />
            :''
            // <PostLoader cards={10} />
          }
          <Newsletter />
        </div>
      </div>
    </section>
  )
}

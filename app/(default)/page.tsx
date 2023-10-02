'use client'
export const metadata = {
  title: 'Home - LinkThink',
  description: 'Page description',
}
import Newsletter from '@/components/newsletter'
import PostCard from '@/components/postCard'
import { useEffect } from 'react';
import { useState } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase/config';


export default function Home() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const q = query(collection(db, "post"));
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      console.log(posts); 
    })

  }, []);

  return (
    <section>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="py-24 md:pt-32 md:pb-12 border-t border-gray-800">

          {/* Section header */}
          <div className="mx-auto text-left pb-12 md:pb-20">
            <h2 className="h2 mb-4">Discover the amazing ideas</h2>
            <p className="text-xl text-gray-800 dark:text-white">For developers to showcase their apps and connect with potential users</p>
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

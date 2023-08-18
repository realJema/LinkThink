'use client'
export const metadata = {
  title: 'Glimpse - Business Ideas',
  description: 'Get inspired by business ideas',
}

import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import getDoument from '@/app/firebase/getData';
import { useEffect } from 'react';
import { useState } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase/config';

export default function Bideas() {
  const [posts, setPosts] = useState(null) 

  useEffect(() => {

    
    const q = query(collection(db, "post"), where("category", "==", "Business"));
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
    })

  }, []);

  
  return (
    <>
    {posts != null ?
      <Testimonials posts={posts}/>
      : ''
    }
      <Newsletter />
    </>
  )
}

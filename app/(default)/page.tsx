'use client'
export const metadata = {
  title: 'Home - LinkThink',
  description: 'Page description',
}
import Newsletter from '@/components/newsletter'
import Testimonials from '@/components/testimonials'
import getDoument from '@/app/firebase/getData';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Home() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await getDoument("Users");
      const roles = await response.newData
      // console.log(roles); 
      setPosts(roles);
    }
    getData();

  }, []);

  return (
    <>
      {posts != null ?
        <Testimonials posts={posts} name="my name" />
        : ''
      }
      <Newsletter />
    </>
  )
}

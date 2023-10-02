'use client'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function PostLoader({ cards }) {
  return (
    <div className="max-w-screen-2xl mx-auto grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 lg:gap-4 items-start lg:max-w-none">
      {Array(cards).fill(0).map((item, i) => (
        <div key={i}>

          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={230} />
          </SkeletonTheme>
        </div>
      ))}
    </div>
  )
}

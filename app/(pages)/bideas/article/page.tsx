export const metadata = {
  title: 'Glimpse - Business Ideas',
  description: 'Get inspired by business ideas',
}

import Hero from "@/components/hero";

export default function Article(context) {
  const title = context?.searchParams.title;
  const coverImage = context?.searchParams.coverImage;
  const name = context?.searchParams.name;
  const descr = context?.searchParams.descr;
  const pp = context?.searchParams.pp;
  const role = context?.searchParams.role; 
  return (
    <>
      <Hero title={title} coverImage={coverImage} name={name} descr={descr} pp={pp} role={role}/>
    </>
  )
}

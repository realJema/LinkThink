export const metadata = {
  title: 'Glimpse - Business Ideas',
  description: 'Get inspired by business ideas',
}

import Hero from "@/components/hero";

export default function Article(context) {
  const title = context?.searchParams.title;
  const image = context?.searchParams.image;
  const name = context?.searchParams.name;
  const descr = context?.searchParams.descr;
  const pp = context?.searchParams.pp;
  const role = context?.searchParams.role; 
  const email = context?.searchParams.email; 
  return (
    <>
      <Hero title={title} image={image} name={name} descr={descr} pp={pp} role={role} email={email}/>
    </>
  )
}

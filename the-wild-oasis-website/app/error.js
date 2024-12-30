"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Error() {
    const pathname = usePathname()
    const router = useRouter
    return (
      <main className='flex justify-center items-center flex-col gap-6'>
        <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
        <p className='text-lg'>ERROR!</p>
  
        <Link href={pathname} onClick={()=>{router.refresh()}} className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'>
          Try again
        </Link>
      </main>
    );
  }
  
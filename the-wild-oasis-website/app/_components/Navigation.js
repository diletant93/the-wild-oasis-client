import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
   const session = await auth()
   console.log(session)
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
         {session?.user?.image ? 
         (<Link
            href="/account"
            className="flex items-center gap-2 hover:text-accent-400 transition-colors"
          >
            <Image
             referrerPolicy="no-refferer" 
             width={32} height={32} 
             alt="user icon"
              className="rounded-full"
               src={session.user.image}/>
            <span>Guest area</span>
          </Link>
          ):(
            <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

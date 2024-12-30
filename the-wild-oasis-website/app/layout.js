
import {Josefin_Sans} from 'next/font/google'
const josefin = Josefin_Sans({
  subsets:['latin'],
  display:'swap',
})

import "@/app/_styles/globals.css"
import Header from "./_components/Header";
import { ReservationProvider } from './_components/ReservationContext';
export const metadata = {
  title:{
    template:'%s The Wild Oasis',
    default:"Welcome / The Wild Oasis"
  },
  description:'Some description m no idea why that' +
  'is important',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} relative antialiased flex flex-col bg-primary-950 text-primary-50 min-h-screen`}>
          <Header/>
          <div className='flex-1 px-8 py-12 grid'>
            <main className='max-w-7xl mx-auto w-full'>
              <ReservationProvider>
                  {children}
              </ReservationProvider>
            </main>
          </div>
          <footer>
            Copyright by the Wild Oasis
          </footer>
        </body>
    </html>
  )
}

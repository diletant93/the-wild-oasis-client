import { createGuest, getGuest } from "@/app/_lib/data-service";
import NextAuth from "next-auth";
import Google from 'next-auth/providers/google'

const authConfig = {
    providers:[
        Google({clientId:process.env.AUTH_GOOGLE_ID, clientSecret:process.env.AUTH_GOOGLE_SECRET})
    ],
    callbacks:{
        authorized({auth,request}){
            return Boolean(auth?.user)
        },
       async signIn({user,account,profile}){
            try {
                console.log('In the sign in:',user)
                const existingGuest = await getGuest(user.email)
                console.log('existing guest:',existingGuest)
                if(!existingGuest){
                    await createGuest({email:user.email,fullName:user.name})
                }
                return true
            } catch (error) {
                return false
            }
        },
        async session({session,user}){
            const guest = await getGuest(session.user.email)
            session.user.guestId = guest.id
            return session
        }
    },
    pages:{
        signIn:'/login'
    }
}

export const {
    auth,
    signIn,
    signOut,
    handlers:{GET,POST}} = NextAuth(authConfig)
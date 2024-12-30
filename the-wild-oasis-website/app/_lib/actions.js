"use server"

import { revalidatePath } from "next/cache"
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase"
import { getBookings } from "./data-service"
import { redirect } from "next/navigation"
import { revalidate } from "../about/page"

export async function updateProfile(formData){
    const session = await auth()
    if(!session?.user){
        throw new Error("You must be logged in")
    }
    const nationalID  = formData.get('nationalID')
    const [nationality, countryFlag] = formData.get('nationality').split('%')

    if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)){
        throw new Error("Please provide a valid national ID")
    }
    const updateData = {nationality, countryFlag, nationalID}

    const {error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId)

      if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
      }
    console.log('updated')
    revalidatePath('/account/profile')
}

export async function deleteReservation(bookingId) {
    const session = await auth()
    if(!session?.user){
        throw new Error("You must be logged in")
    }

    const guestBookings = await getBookings(session.user.guestId)
    const guestBookingsIds = guestBookings.map(booking => booking.id)

    if(!guestBookingsIds.includes(bookingId)) throw new Error('You are not allowed to delete this booking')

    const {error } = await supabase.from('bookings').delete().eq('id', bookingId);
    if (error) {
      console.error(error);
      throw new Error('Booking could not be deleted');
    }

    revalidatePath('/account/reservations')
}

export async function updateReservation(formData){
    const session = await auth()
    if(!session?.user) throw new Error('You must be logged in')
    
    const bookingId = formData.get('bookingId')
    console.log('Booking id:',bookingId)

    const guestBookings = await getBookings(session.user.guestId)
    const guestBookingsIds = guestBookings.map(booking => booking.id)
    if(!guestBookingsIds.includes(+bookingId)) throw new Error('You are not allowed to delete this booking')

    const numGuests = formData.get('numGuests')
    const observations = formData.get('observations')
    const updatedFields = {numGuests,observations}

    const {error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', bookingId)

    if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
    }
    
    revalidatePath(`/account/reservations/edit/${bookingId}`)
    redirect('/account/reservations')    
    
}
export async function createReservation(bookingData ,formData){
    const session = await auth()
    if(!session?.user) throw new Error('You must be logged in')
    const formDataObject = Object.fromEntries(formData)
    const newBooking = {
        ...bookingData,
        ...formDataObject,
        numGuests:+formDataObject.numGuests,
        extrasPrice:0,
        totalPrice:bookingData.cabinPrice,
        isPaid:false,
        hasBreakfast:false,
        status:'unconfirmed',
        guestId: session.user.guestId,

    }

    const { error } = await supabase
    .from('bookings')
    .insert([newBooking])

    if (error) {
        throw new Error('Booking could not be created');
    }
    revalidatePath(`/cabins/${bookingData.cabinId}`)
    redirect('/thankyou')

}
export async function signInAction(){
    await signIn('google',{redirectTo:'/account'})
}
export async function signOutAction(){
    await signOut({redirectTo:'/'})
}
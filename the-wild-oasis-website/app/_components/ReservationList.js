'use client'
import { createContext, useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";


export default function ReservationList({bookings}) {
    const [optimisticBookings,optimisticDelete] = useOptimistic(bookings,
         (currentBookings, bookingId)=>{
            return currentBookings.filter(booking => booking.id !== bookingId)
         })
    async function handleDelete(bookingId) {
        optimisticDelete(bookingId)
        deleteReservation(bookingId)
    } 
  return (
    <ul className="space-y-6">
          {optimisticBookings.map((booking) => (
            <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
          ))}
    </ul>
  );
}

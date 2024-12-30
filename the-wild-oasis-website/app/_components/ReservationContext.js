"use client"
import { createContext, useContext, useState } from "react";
const ReservationContext = createContext()

const initialState = {from:undefined, to:undefined}

function ReservationProvider({children}){
    const [range, setRange] = useState(initialState)
    const resetRange = () => setRange(initialState)
    return(
        <ReservationContext.Provider value={
           { range,
            setRange,
            resetRange,
        }
        }>{children}</ReservationContext.Provider>
    )

}

function useReservation(){
    const reservationContext = useContext(ReservationContext)
    if(!reservationContext) throw new Error ('Reservation context was used out of the provider\'scope')
    return reservationContext
}

export {ReservationProvider, useReservation}
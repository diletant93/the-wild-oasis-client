import { getBookedDatesByCabinId, getCabinPrice } from "@/app/_lib/data-service";

export async function GET(request,{params}){
   console.log(params)
   const {cabinId} = params
   try{
      const [cabin, bookedDates] = await Promise.all([
         getCabinPrice(cabinId),getBookedDatesByCabinId(cabinId)
      ])
      console.log(cabin, bookedDates)
      return Response.json({cabin,bookedDates});
   }catch(error){
      return Response.json({message:'Could not load cabins or bookDates'})
   }
}
export async function POST() {
    
}
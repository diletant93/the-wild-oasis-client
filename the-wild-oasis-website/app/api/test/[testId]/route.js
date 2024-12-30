import { getCabinPrice, getCabins, getGuest } from "@/app/_lib/data-service"

export async function GET(request,{params}){
    console.log(params)
    const {testId} = params //email
    try {
        const guest = await getGuest(testId)
        console.log(guest)
        return Response.json({guest})
    } catch (error) {
        console.log('smth went wrong getting a guest')
        return Response.json({message:'smth went wrong'})
    }
}
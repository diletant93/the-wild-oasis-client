"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const activeFilter = searchParams.get('capacity') ?? 'all'
    function handleFilter(filter){
        const params = new URLSearchParams(searchParams)
        params.set('capacity',filter)
        router.replace(`${pathname}?${params.toString()}`,{scroll:false})
    }
  return (
    <div className="border border-primary-800 flex">
       <Button activeFilter={activeFilter} filter='all' handleFilter={handleFilter}>All</Button>
       <Button activeFilter={activeFilter} filter='small' handleFilter={handleFilter}>1&mdash;3</Button>
       <Button activeFilter={activeFilter} filter='medium' handleFilter={handleFilter}>4&mdash;6</Button>
       <Button activeFilter={activeFilter} filter='large' handleFilter={handleFilter}>7+</Button>
    </div>
  );
}
function Button({activeFilter, filter, children ,handleFilter}) {

  return (
    <button className={`${activeFilter === filter ? 'bg-primary-700 text-primary-50' : ''} px-5 py-2 hover:bg-primary-700`} onClick={()=>handleFilter(filter)}>{children}</button>
  );
}

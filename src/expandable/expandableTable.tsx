import { flexRender, getCoreRowModel, getExpandedRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import {useSearchParams} from 'react-router-dom'
import { useGetCall,endpointType } from "../hooks/useApi"
import { characterColumns,weaponColumns } from "./columns"
import arrowIcon from '../assets/next.png'
import sortIcon from '../assets/sort.png'
import threeStar from '../assets/rarity-3.png'
import fourStar from '../assets/rarity-4.png'
import fiveStar from '../assets/rarity-5.png'


const ExpandableTable:React.FC = ()=>{
    const [params,setParams] = useSearchParams()
    const [activePage,setActivePage] = useState<endpointType>(()=> (params.get('type') as endpointType)||'character')
    const {data,error,isLoading} = useGetCall(activePage) 
    const [expanded,setExpanded] = useState()

    useEffect(()=>{
        setParams({type:activePage})
    },[activePage, setParams])

    const table = useReactTable({
        data:data?.data,
        state:{
            expanded:expanded
        },
        columns:activePage=='characters'?characterColumns:weaponColumns,
        getCoreRowModel:getCoreRowModel(),
        getSortedRowModel:getSortedRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        getExpandedRowModel:getExpandedRowModel()
    })
    
    if(error) return(<p>{error}</p>)

    const loaderScreen = (
        <div className="absolute bg-gray-400 flex items-center justify-center h-44 w-44 shadow-lg rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span>Loading ....</span>
        </div>
    )

    return(
        <section className="min-h-screen bg-blue-1 p-5">
            <div className="max-w-[1000px] m-auto">
                <div className="">
                    <h3 className="text-2xl font-medium text-center text-blue-500">Genshin Characters</h3>
                    <div className="btn-group flex justify-center mt-3">
                        <button onClick={()=>setActivePage('characters')} className={`font-medium text-lg rounded-l-md ${activePage=='characters'?"bg-blue-4 text-white":"bg-blue-3"} py-1 px-2 border-r-2`}>Characters</button>
                        <button onClick={()=>setActivePage('weapons')} className={`font-medium text-lg ${activePage=='weapons'?"bg-blue-4 text-white":"bg-blue-3"} py-1 px-2 border-r-2`}>Weapons</button>
                        <button onClick={()=>setActivePage('artifacts')} className={`font-medium text-lg ${activePage=='artifacts'?"bg-blue-4 text-white":"bg-blue-3"} rounded-r-md py-1 px-2`}>Artifacts</button>
                    </div>
                    <div className="custom-filters gap-3 flex items-end justify-center mt-10 w-full">
                        <input className="p-2 rounded-md shadow-lg" placeholder={`Enter ${activePage.slice(0,-1)} name`} type="text"/>
                        <article className="flex flex-col">
                            <label className="text-sm">type</label>
                            <select className="p-2 text-md rounded-md shadow-md w-24">
                                <option className="hidden" selected>-</option>
                                {['bow','catalyst','claymore','sword','sphear'].map(ele=>(
                                    <option className="h-10 p-3 font-medium text-md" value={ele} key={ele}>
                                        {ele}
                                    </option>
                                ))}
                            </select>
                        </article>
                        <article className="flex flex-col">
                            <label className="text-sm">Rarity</label>
                            <select className="p-2 text-md h-10 rounded-md shadow-md">
                                <option className="hidden" selected>-</option>
                                {[{name:"three",value:"3"},{name:"four",value:"4"},{name:"five",value:"5"}].map(ele=>(
                                    <option className="font-medium text-md" value={ele.value} key={ele.value}>
                                        <span className="flex items-center">
                                            {ele.value=='3'&&<img className="w-10 h-10" src={threeStar}/>}
                                            {ele.value=='4'&&<img className="w-10 h-10" src={fourStar}/>}
                                            {ele.value=='5'&&<img className="w-10 h-10" src={fiveStar}/>}
                                            {ele.name}
                                        </span>
                                    </option>
                                ))}
                            </select>
                        </article>
                    </div>
                </div>
                    <div className="w-full pt-5">
                        <table className="w-full" width={table.getTotalSize()}>
                            <thead className="bg-blue-5">
                                {table.getHeaderGroups().map(ele=>(
                                    <tr key={ele.id}>
                                        {ele.headers.map((cell)=>
                                            <td className="p-2  text-center text-md">
                                                <article className="flex relative items-center justify-center pe-5">
                                                        {cell.column.columnDef.header}
                                                        {cell.column.getCanSort()&&
                                                            <button onClick={cell.column.getToggleSortingHandler()} className="absolute right-1 top-1/2 -translate-y-1/2">
                                                                <img src={sortIcon} className="w-4 h-5"/>
                                                            </button>
                                                        }
                                                        {{'asc':'🔼','desc':'🔽','':''}[cell.column.getIsSorted()||'']}
                                                </article>
                                            </td>
                                        )}
                                        <td className="w-20"></td>
                                    </tr>
                                ))}
                            </thead>
                            {!data||isLoading?loaderScreen:(
                                <>
                                <tbody className="bg-blue-3">
                                {table.getRowModel().rows.map(row=>(
                                    <tr key={row.id} className="relative border-b-2">
                                        {row.getVisibleCells().map((cell)=>{
                                            return(
                                            <td className="p-2">
                                                {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                            </td>
                                            )
                                        }
                                    )}
                                        <td>
                                            {row.getCanExpand()&&(
                                                <article className="flex items-center justify-center">
                                                    <button onClick={()=>{row.toggleExpanded()}} className={`${row.getIsExpanded()} rotate-180`}>
                                                        <img src={arrowIcon} className="w-7 rotate-90"/>
                                                    </button>
                                                </article>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-blue-5">
                            <tr>
                            <td colSpan={table.getVisibleLeafColumns().length+1}>
                                <article className="flex justify-between items-center">
                                    <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()+1}</span>
                                        <article className="flex items-center justify-center">
                                            <button className='disabled:cursor-not-allowed disabled:bg-gray-500 rounded-md p-1' disabled={!table.getCanPreviousPage()} onClick={()=>{table.previousPage()}}>
                                                <img src={arrowIcon} className='w-8 h-8 rotate-180' alt="prev" />
                                            </button>
                                            <button className='disabled:cursor-not-allowed disabled:bg-gray-500 rounded-md p-1' disabled={!table.getCanNextPage()} onClick={()=>{table.nextPage()}}>
                                                <img src={arrowIcon} alt="next" className='w-8 h-8' />
                                            </button>
                                        </article>
                                    <span className="p-2">Count: {table.getState().pagination.pageSize}</span>
                                </article>
                            </td>
                            </tr>
                        </tfoot>
                        </>
                            )}
                            
                        </table>
                    </div>
            </div>
        </section>
    )
}

export default ExpandableTable
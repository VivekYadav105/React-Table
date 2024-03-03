import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import mockData from './assets/MOCK_DATA.json'
import sortIcon from './assets/sort.png'
import arrowIcon from './assets/next.png'
import { useMemo } from 'react'

const tableColumns = [
    {
        header:"First Name",
        accessorKey:"first_name",
        cell:(props)=><p className='text-center p-2'>{props.getValue()}</p>
    },
    {
        header:"Last Name",
        accessorKey:"last_name",
        cell:(props)=><p className='text-center'>{props.getValue()}</p>
    },
    {
        header:"Age",
        accessorKey:"age",
        cell:(props)=><p className='text-center'>{props.getValue()}</p>
    },
    {
        header:"Date Of Work",
        accessorKey:"date_of_work",
        cell:(props)=><p className='text-center'>{props.getValue()}</p>
    },
    {
        header:"Email",
        accessorKey:"email",
        size:50,
        cell:(props)=><p className='text-center'>{props.getValue()}</p>,
    },
    {
        header:"Gender",
        accessorKey:"gender",
        cell:(props)=><p className='text-center'>{props.getValue()}</p>
    },
    {
        header:"Country",
        accessorKey:"country",
        cell:(props)=><p className='text-center'>{props.getValue()}</p>
    },
    {
        header:"State",
        accessorKey:"state",
        cell:(props)=><p className='text-center'>{props.getValue()}</p>
    }
]

const BasicTable:React.FC = ()=>{
    const data = useMemo(()=>mockData,[])
    const columns = useMemo(()=>tableColumns,[])
    const tableData = useReactTable({
        data,
        columns,
        columnResizeMode:"onChange",
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        getSortedRowModel:getSortedRowModel(),
    })
    return(
        <section className='margin-auto min-h-screen bg-green-200 pt-5 flex flex-col justify-center items-center'>
        <div className='py-5'>
            <h3 className='text-center font-medium text-2xl'>Simple table</h3>
        </div>
        <div>
            <p className='w-full text-left'>Total No of rows: {tableData.getRowCount()}</p>
        </div>
        <table className='border-2 border-b-0 mb-3 shadow-md bg-teal-100' width={tableData.getTotalSize()}>
            <thead>
                {tableData.getHeaderGroups().map(header_group=>(
                    <tr key={header_group.id} className='border-2 border-green-600 rounded-t-lg'>
                        {header_group.headers.map(ele=>(
                            <th width={ele.getSize()} key={ele.id} className='p-3 relative group bg-primary text-white text-md font-medium text-center'>
                                <span className='flex items-center gap-2 justify-center'>
                                {ele.column.columnDef.header}   
                                {ele.column.getCanSort()&&<button onClick={ele.column.getToggleSortingHandler()} className='w-5 h-5 inline-block'><img src={sortIcon} className='w-full h-full object-contain'/></button>}             
                                {{'asc':'🔼','desc':'🔽','':''}[ele.column.getIsSorted()||'']}
                                </span>
                                {ele.column.getIsLastColumn()?<></>:
                                <div onTouchStart={ele.getResizeHandler()} onMouseDown={ele.getResizeHandler()}  className={`resizer absolute right-0 top-1/2 -translate-y-[50%] z-2 rounded-md group-hover:opacity-1 w-1 h-1/2 ${ele.column.getIsResizing()?"bg-teal-600":"bg-white"}`}></div>
                                }            
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody style={{padding:2}}>
                {tableData.getRowModel().rows.map((row)=>(
                    <tr key={row.id} className='border-b-2 border-gray-400'>
                        {  
                            row.getVisibleCells().map(col=>(
                                <td width={col.column.getSize()}>
                                    {flexRender(col.column.columnDef.cell,col.getContext())}
                                </td>
                            ))                
                        }
                    </tr>
                ))}
            </tbody>
            <tfoot className='bg-primary'>
                <tr>
                    <td className='p-2'>Page {tableData.getState().pagination.pageIndex + 1} of {tableData.getPageCount()} </td>
                    <td colSpan={6}>
                        <article className='w-full flex gap-2 items-center justify-center'>
                            <button className='disabled:cursor-not-allowed disabled:bg-gray-500 rounded-md p-1' disabled={!tableData.getCanPreviousPage()} onClick={()=>{tableData.previousPage()}}>
                                <img src={arrowIcon} className='w-8 h-8 rotate-180' alt="prev" />
                            </button>
                            <button className='disabled:cursor-not-allowed disabled:bg-gray-500 rounded-md p-1' disabled={!tableData.getCanNextPage()} onClick={()=>{tableData.nextPage()}}>
                                <img src={arrowIcon} alt="next" className='w-8 h-8' />
                            </button>
                        </article>
                    </td>
                    <td className='text-center'>
                        Count: {tableData.getState().pagination.pageSize}
                    </td>
                </tr>
            </tfoot>
        </table>        
        </section>
    )
}

export default BasicTable
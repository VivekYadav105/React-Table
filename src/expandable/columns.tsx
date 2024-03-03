import threeStar from '../assets/rarity-3.png'
import fourStar from '../assets/rarity-4.png'
import fiveStar from '../assets/rarity-5.png'

export const characterColumns = [
    {
        header:"character",
        accessorKey:"character",
        cell:(props)=><div className="text-center flex flex-col items-center">
                <img className="w-10" src={props.row.original.image}/>
                <p>{props.row.original.name}</p>
            </div>
    },
    {
        header:"Element",
        accessorKey:"element",
        cell:(props)=>(
            <p className='text-center'>
                {props.getValue()}
            </p>
        )
    },
    {
        header:"Rarity",
        accessorKey:"rarity",
        cell:(props)=>(
        <div className='flex flex-col items-center justify-center'>
            {props.getValue()=='3'&&<img className='w-8' src={threeStar}/>}
            {props.getValue()=='4'&&<img className='w-8' src={fourStar}/>}
            {props.getValue()=='5'&&<img className='w-8' src={fiveStar}/>}
        </div>
        )
    }
]

export const weaponColumns = [
    {
        header:"Weapon",
        accessorKey:"weapon",
        cell:(props)=>{
            console.log(typeof props)
            return(
            <div className="text-center flex flex-col items-center">
                <img className="w-10" src={props.row.original.image}/>
                <p>{props.row.original.name}</p>
            </div>
            )
            }
    },
    {
        header:"Attack",
        accessorKey:"attack",
        cell:(props)=><p className="text-center">{props.getValue()}</p>
    },
    {
        header:"type",
        accessorKey:"type",
        cell:(props)=><p className="text-center">{props.getValue()}</p>
    },
    {
        header:"Secondary",
        accessorKey:"secondary",
        cell:(props)=><p className="text-center">{props.getValue()}</p>
    },
    {
        header:"Rarity",
        accessorKey:"rarity",
        cell:(props)=>(
        <div className='flex flex-col items-center justify-center'>
            {props.getValue()=='3'&&<img className='w-8' src={threeStar}/>}
            {props.getValue()=='4'&&<img className='w-8' src={fourStar}/>}
            {props.getValue()=='5'&&<img className='w-8' src={fiveStar}/>}
        </div>
        )
    }
]
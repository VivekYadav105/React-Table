import { useMemo } from "react"
import useSWR from "swr"


type fetcherParamType = {
    [key:string]:string,
}

export type endpointType = 'characters'|'weapons'|'artifacts'

const fetcher = async(type:endpointType) =>{
    const endpoints = {
        'characters':'/character',
        'weapons':'/weapon',
        'artifacts':'/artifact'
    }
    const baseurl = import.meta.env.BASEURL || 'http://localhost:8000'
    const url = baseurl+endpoints[type]
    const response = await fetch(url)
    console.log(url,response)
    const data = response.json()
    return data;
}

const useGetCall = (type:endpointType,fetcherParams?:fetcherParamType[])=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const key:any[] = [type]
    console.log(key)
    console.log(type)
    if(fetcherParams) fetcherParams.forEach((ele)=>key.push({[ele.key]:ele.value}))

    const {data,error,isLoading,isValidating} = useSWR(JSON.stringify(key),async()=>await fetcher(type))
    console.log(data,error)
    return useMemo(()=>({data,error,isLoading,isValidating}),[data,error,isLoading,isValidating])
}

export {useGetCall}
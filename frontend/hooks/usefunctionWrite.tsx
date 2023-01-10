import { useContractWrite, usePrepareContractWrite,  } from 'wagmi'

function usefunctionWrite(functionName='', contractInterface= '', addressOrName= '', args= []) {

const { config } = usePrepareContractWrite({
    addressOrName,
    contractInterface,
    functionName,
    args,
  })
  const { data, isError, isLoading, write, writeAsync } = useContractWrite(config)
  return  { data, isError, isLoading, write, writeAsync }
}

  
export default usefunctionWrite
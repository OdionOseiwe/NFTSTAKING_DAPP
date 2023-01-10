import { useContractRead } from 'wagmi';

function useFunctionRead(functionName='', contractInterface= '', addressOrName= '', args = []) {
  const { data, isError, isLoading } = useContractRead({
    addressOrName,
    contractInterface,
    functionName,
    args,
  })    
  return {data, isError, isLoading}
}

export default useFunctionRead;
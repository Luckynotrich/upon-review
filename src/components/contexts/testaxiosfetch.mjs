import { useAxios } from '../hooks/use-axios.mjs';
const userId = '11d6af03-20ac-4f04-a21c-28ec418a2c18';

   const fetch = async () =>{
    const [data, error, loading, axiosFetch] = useAxios();
    await axiosFetch(
      {
        axiosInstance: axios,
        method: 'get',
        url: 'http://localhost:8081/api/category-api',
        requestConfig: {
          userId,
          data: await response.data,
        },
        
      },
      [(data)])
    await console.log(data)}
    fetch();
      
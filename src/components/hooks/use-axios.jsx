import { useState, useEffect } from "react";


export const useAxios = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); //different!
    const [controller, setController] = useState();

    const  axiosFetch = async (configObj) => {
        const {
            axiosInstance,
            method,
            url,
            // timeout,
            requestConfig = {}
        } = configObj;

        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            });
            // setTimeout(() => {"timeout"}, timeout);
            console.log(res);
            setResponse(res.data);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log(controller)

        // useEffect cleanup function
        return () => controller && controller.abort();

    }, [controller]);

    return [response, error, loading, axiosFetch];
}

//  export default useAxios;
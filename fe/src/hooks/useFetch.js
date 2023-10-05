import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            
            // Check if the response's content type is JSON before processing it
            const contentType = response.headers.get("content-type");
            if (!response.ok || !contentType || !contentType.includes("application/json")) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            setData(data);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }
    
    

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [url]); // everytime the url changes, the useEffect will be triggered and i get the new books, i use this on the book details page

    return { data, isLoading, error }
}

export default useFetch;
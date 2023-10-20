import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UseRefreshDetection() {
    const [refreshCount, setRefreshCount] = useState(0);
     const navigate = useNavigate();

    useEffect(() => {
        const currentCount = sessionStorage.getItem('refreshCount') || 0;
        setRefreshCount(parseInt(currentCount));

        const handleBeforeUnload = () => {
            sessionStorage.setItem('refreshCount', refreshCount + 1);
        };

        const handleRefresh = (event) => {
            event.preventDefault();
            // location.reload(true);
            window.location.href = `${import.meta.env.SNOWPACK_PUBLIC_PROXY_URL}`;//'http://localhost:8081/';
            // navigate('/');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleRefresh);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleRefresh);
        };
    }, [refreshCount, navigate]);

    return refreshCount;
}

export default UseRefreshDetection;

// Is the refresh count required to make this work?


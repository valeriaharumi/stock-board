import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string, onMessage: (data: any) => void) => {
    const [error, setError] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        try {
            ws.current = new WebSocket(url);

            ws.current.onopen = () => {
                setError(null);
            };

            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                onMessage(data);
            };

            ws.current.onerror = () => {
                setError('Falha ao conectar ao servidor.');
            };
        } catch (err) {
            setError('Um erro ocorreu ao conectar ao servidor.');
        }

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url, onMessage, error]);

    return { ws: ws.current, error };
};

export default useWebSocket;
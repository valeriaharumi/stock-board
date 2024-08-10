import React, { useState } from "react";
import Card from '../card/Card';
import './Board.css';
import { useStockStore } from "../../store/stockStore";
import useWebSocket from "../../services/websocket";


const Board: React.FC = () => {

    const { stocks, getSortedStocks , updateStock } = useStockStore();

    const { error } = useWebSocket('ws://localhost:8080/quotes', (data) => {
        const code = Object.keys(data)[0];
        const newPrice = data[code];
        const timestamp = data.timestamp;

        updateStock(code, newPrice, timestamp);
    });

    const [sortType, setSortType] = useState<'up' | 'down' | null>(null);

    const handleSort = (type: 'up' | 'down') => {
        setSortType(type);
    };

    const sortedStocks = sortType 
    ? getSortedStocks().filter(([, stock]) => stock.status === sortType)
    : Object.entries(stocks);

    if (error) {
        return (
            <div className="error-container">
                <div className="error-content">
                    <h2>Oops!</h2>
                    <p>{error}</p>
                    <p>Por favor tente novamente mais tarde.</p>
                </div>
            </div>
        );
    }


    return (
        <div className="board-container">
            <div className="board-header">
                <h1>Explore o mercado</h1>
                <div className="board-filters">
                    <span>Ordenar:</span>
                    <button 
                        onClick={() => handleSort('up')} 
                        className={sortType === 'up' ? 'selected' : ''}
                    >
                        Em alta
                    </button>
                    <button
                        onClick={() => handleSort('down')} 
                        className={sortType === 'down' ? 'selected' : ''}
                    >
                        Em baixa
                    </button>
                </div>
            </div>
            <div className="board-body">
                {sortedStocks.map(([code, { currentPrice, status }]) => (
                    <Card
                        key={code}
                        code={code}
                        price={currentPrice}
                        status={status}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board;
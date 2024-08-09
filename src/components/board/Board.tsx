import Card from '../card/Card';
import './Board.css';


const Board: React.FC = () => {
    return(
        <div className="board-container">
            <div className="board-header">
                <h1>Explore o mercado</h1>
                <div className="board-filters">
                    <span>Ordenar:</span>
                    <button className="selected">Em alta</button>
                    <button>Em baixa</button>
                </div>
            </div>
            <div className="board-body">
                <Card/>
            </div>
        </div>
    )
}

export default Board;
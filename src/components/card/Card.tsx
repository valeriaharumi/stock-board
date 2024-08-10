import graphic from '../../assets/images/Area do gráfico.svg';
import graphicBorder from '../../assets/images/Borda do gráfico.svg';
import up from '../../assets/images/up.svg';
import down from '../../assets/images/down.svg';
import stockNames from '../../data/stockNames';
import './Card.css';

interface CardProps {
    code: string;
    price: number;
    status: 'up' | 'down';
}

const Card: React.FC<CardProps> = ({ code, price, status }) => {
    const stockName = stockNames[code] || code;

    return (
        <div className='card-container'>
            <div className='card-text-container'>
                <div className='active-name'>
                    <span>{stockName}</span>
                    <span>{code}</span>
                </div>
                <span className='price-title'>PREÇO DO ATIVO</span>
                <div className={`active-price ${status === 'down' ? 'down' : ''}`}>
                    <span>R$ {price.toFixed(2)}</span>
                    {status === 'up' ? 
                        <img src={up} alt="seta para cima" /> : 
                        <img src={down} alt="seta para baixo"/>
                    }
                </div>
            </div>
            <div className='image-container'>
                <img src={graphicBorder} alt="grafico" />
                <img src={graphic} alt="grafico" />
            </div>
        </div>
    )
}

export default Card;
import graphic from '../../assets/images/Area do gráfico.svg';
import graphicBorder from '../../assets/images/Borda do gráfico.svg';
import './Card.css';

const Card: React.FC = () => {
    return(
        <div className='card-container'>
            <div className='card-text-container'>
                <div className='active-name'>
                    <span>AES Eletropaulo</span>
                    <span>ELPL4</span>
                </div>
                <span className='price-title'>PREÇO DO ATIVO</span>
                <div className='active-price'>
                    <span>R$ 36,32</span>
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
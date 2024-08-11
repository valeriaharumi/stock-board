import { render, screen, fireEvent } from '@testing-library/react';
import Board from '../components/board/Board';
import { useStockStore } from '../store/stockStore';
import useWebSocket from '../services/websocket';

jest.mock('../store/stockStore');
jest.mock('../services/websocket');

describe('Board Component', () => {
    beforeEach(() => {
        (useStockStore as unknown as jest.Mock).mockReturnValue({
            stocks: {
                'CIEL3': { currentPrice: 150, previousPrice: 145, status: 'up', timestamp: 1723230668 },
                'B3SA3': { currentPrice: 2500, previousPrice: 2510, status: 'down', timestamp: 1723230669 },
                'KROT3': { currentPrice: 300, previousPrice: 295, status: 'up', timestamp: 1723230670 },
            },
            getSortedStocks: jest.fn(),
            hasData: true,
            updateStock: jest.fn(),
        });

        (useWebSocket as jest.Mock).mockReturnValue({
            error: null,
            ws: {},
        });
    });

    it('should render the stock cards correctly', () => {
        render(<Board />);

        expect(screen.getByText('CIEL3')).toBeInTheDocument();
        expect(screen.getByText('B3SA3')).toBeInTheDocument();
        expect(screen.getByText('KROT3')).toBeInTheDocument();
    });

    it('should sort stocks in ascending order when "Em Alta" is clicked', () => {
        (useStockStore as unknown as jest.Mock).mockReturnValue({
            stocks: {
                'CIEL3': { currentPrice: 150, previousPrice: 145, status: 'up', timestamp: 1723230668 },
                'B3SA3': { currentPrice: 2500, previousPrice: 2510, status: 'down', timestamp: 1723230669 },
                'KROT3': { currentPrice: 300, previousPrice: 295, status: 'up', timestamp: 1723230670 },
            },
            getSortedStocks: jest.fn().mockReturnValue([
                ['CIEL3', { currentPrice: 150, previousPrice: 145, status: 'up', timestamp: 1723230668 }],
                ['KROT3', { currentPrice: 300, previousPrice: 295, status: 'up', timestamp: 1723230670 }],
            ]),
            hasData: true,
            updateStock: jest.fn(),
        });

        render(<Board />);

        fireEvent.click(screen.getByText(/Em Alta/i));

        const sortedStocks = screen.getAllByText(/^(CIEL3|KROT3)$/).map(stock => stock.textContent);
        expect(sortedStocks).toEqual(['CIEL3', 'KROT3']);
    });

    it('should show an error message if WebSocket fails and no data is present', () => {
        (useWebSocket as jest.Mock).mockReturnValue({
            error: 'Falha ao conectar ao servidor.',
            ws: null,
        });

        (useStockStore as unknown as jest.Mock).mockReturnValue({
            stocks: {},
            getSortedStocks: jest.fn(),
            updateStock: jest.fn(),
            hasData: false,
        });

        render(<Board />);

        expect(screen.getByText('Falha ao conectar ao servidor.')).toBeInTheDocument();
        expect(screen.getByText('Por favor tente novamente mais tarde.')).toBeInTheDocument();
    });
});

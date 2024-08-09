import logo from '../../assets/images/logo.svg';
import './Header.css';

const Header: React.FC = () => {
    return(
        <header><img src={logo} alt="logo" /></header>
    )
}

export default Header;
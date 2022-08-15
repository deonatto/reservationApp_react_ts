import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <div className='navbar-left'>
            <Link className='link' to="/"><h1>BookingApp</h1></Link>
        </div>
        <div className='navbar-right'>
            <button className='navbar-btn'>Register</button>
            <button className='navbar-btn'>login</button>
        </div>
    </div>
  )
}

export default Navbar;
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <div className='navbar-left'>
            <h1>BookingApp</h1>
        </div>
        <div className='navbar-right'>
            <button className='navbar-btn'>Register</button>
            <button className='navbar-btn'>login</button>
        </div>
    </div>
  )
}

export default Navbar;
import './NavBar.css';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

function NavBar({ user, setUser }) {
  function handlelogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='navBackground'>
      <span className='title'>&nbsp;&nbsp;PARROT&nbsp;🦜</span>
      <br />
      <Link className='navButton' to='/orders/new'>
        Translate
      </Link>
      &nbsp;&nbsp;
      <Link className='navButton' to='/orders'>
        Favourites
      </Link>
      &nbsp;&nbsp;
      <Link className='navButton' onClick={handlelogOut} to=''>
        Log Out
      </Link>
      {/* <span>LoggedIn: {user.name}</span> */}
    </nav>
  );
}

export default NavBar;

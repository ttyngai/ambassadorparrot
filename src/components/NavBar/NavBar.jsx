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
      <Link className='navButton' to='/translate'>
        Translate
      </Link>
      &nbsp;&nbsp;
      {user ? (
        <Link className='navButton' onClick={handlelogOut} to=''>
          Log Out
        </Link>
      ) : (
        <Link className='navButton' to='/login'>
          Login · Signup
        </Link>
      )}
      &nbsp;&nbsp;
      {/* <span>LoggedIn: {user.name}</span> */}
    </nav>
  );
}

export default NavBar;

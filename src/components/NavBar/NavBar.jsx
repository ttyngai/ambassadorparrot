import './NavBar.css';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

function NavBar({ user, setUser, setSpeech, scrollToBottom }) {
  function handlelogOut() {
    userService.logOut();
    setUser(null);
    setSpeech([]);
  }

  return (
    <nav className='navBackground'>
      <span className='title'>&nbsp;&nbsp;PARROT&nbsp;🦜</span>
      <br />
      <Link className='navButton' to='/' onClick={scrollToBottom}>
        Translate
      </Link>
      &nbsp;&nbsp;
      {user ? (
        <Link className='navButton' onClick={handlelogOut} to='/'>
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

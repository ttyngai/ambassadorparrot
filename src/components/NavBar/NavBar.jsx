import './NavBar.css';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

function NavBar({
  user,
  setUser,
  setSpeech,
  scrollToBottom,
  handleStarterConvo,
  toggleFav,
  speechPreFav,
}) {
  function handlelogOut() {
    userService.logOut();
    setUser(null);
    setSpeech([]);
    handleStarterConvo();
  }

  function handleTranslateClick() {
    scrollToBottom();
    if (speechPreFav.length != 0) {
      toggleFav();
    }
  }

  return (
    <nav className='navBackground'>
      <span className='title'>&nbsp;&nbsp;PARROT&nbsp;🦜</span>
      <br />
      <Link className='navButton' to='/' onClick={handleTranslateClick}>
        Translate
      </Link>
      &nbsp;&nbsp;
      {user ? (
        <>
          <span
            className={
              speechPreFav.length > 0 ? 'navButton navActive' : 'navButton'
            }
            to='/'
            onClick={toggleFav}
          >
            Favorites
          </span>
          &nbsp;&nbsp;
          <Link className='navButton' onClick={handlelogOut} to='/'>
            Log Out
          </Link>
        </>
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

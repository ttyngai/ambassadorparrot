import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

function NavBar({
  user,
  setUser,
  setSpeech,
  toggleFav,
  speechPreFav,
  scrollToBottom,
}) {
  const navigate = useNavigate();
  function handlelogOut() {
    userService.logOut();
    setUser(null);
    setSpeech([]);
    setTimeout(function () {
      navigate('/login');
    }, 1000);
  }

  function handleTranslateClick() {
    if (speechPreFav.length != 0) {
      toggleFav();
    } else {
      scrollToBottom();
    }
  }

  function handleDeleteAll() {
    console.log('deleting');
  }
  return (
    <nav className='navBackground'>
      <div className='titleContainer'>
        <span className='title'>
          PARROT<span className='titleLogo'>🦜</span>
        </span>
      </div>
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
          <Link
            className='navButton deleteAllButton'
            onClick={handleDeleteAll}
            to='/'
          >
            {speechPreFav.length > 0 ? 'Delete ★' : 'Clear List'}
          </Link>
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
    </nav>
  );
}

export default NavBar;

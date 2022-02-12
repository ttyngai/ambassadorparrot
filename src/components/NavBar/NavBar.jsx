import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

function NavBar({
  user,
  nav,
  setNav,
  setUser,
  setSpeech,
  renderSpeeches,
  toggleFav,
  speechPreFav,
  scrollToBottom,
}) {
  const navigate = useNavigate();

  function handlelogOut() {
    setSpeech([]);
    userService.logOut();
    setUser(null);
    setNav('loginSignup');
    setTimeout(function () {
      navigate('/login');
    }, 500);
  }

  function handleLogin() {
    setNav('loginSignup');
  }

  function handleTranslateClick() {
    if (nav == 'fav') {
      console.log('Was fav');
      toggleFav();
    } else {
      scrollToBottom();
    }
    setNav('translate');
  }

  function handleDeleteAll() {
    console.log('deleting');
  }
  // console.log('nav: ', nav);

  return (
    <nav className='navBackground'>
      <div className='titleContainer'>
        <span className='title'>
          PARROT<span className='titleLogo'>🦜</span>
        </span>
      </div>
      <Link
        className={nav == 'translate' ? 'navButton navActive' : 'navButton'}
        to='/'
        onClick={handleTranslateClick}
      >
        Translate
      </Link>
      &nbsp;&nbsp;
      {user ? (
        <>
          <span
            className={nav == 'fav' ? 'navButton navActive' : 'navButton'}
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
        <Link
          className={nav == 'loginSignup' ? 'navButton navActive' : 'navButton'}
          to='/login'
          onClick={handleLogin}
        >
          Login · Signup
        </Link>
      )}
      &nbsp;&nbsp;
    </nav>
  );
}

export default NavBar;

import './NavBar.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

function NavBar({
  user,
  nav,
  setNav,
  setUser,
  setSpeech,
  renderFav,
  speechPreFav,
  scrollToBottom,
}) {
  const [confirming, setConfirming] = useState(false);
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
      renderFav();
    } else {
      scrollToBottom('noTopRescroll');
      setNav('translate');
    }
    setConfirming(false);
  }

  function handleFavClick() {
    if (nav == 'fav') {
      scrollToBottom('noTopRescroll');
    } else {
      renderFav();
    }
    setConfirming(false);
  }

  function handleDeleteAll() {
    if (!confirming) {
      console.log('ask');
      setConfirming(true);
      // Waitime to cancel confirm
      setTimeout(function () {
        setConfirming(false);
        console.log('cancel confirm');
      }, 3000);
    } else {
      console.log('delete it');
      setConfirming(false);
    }
  }

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
      &nbsp;
      {user ? (
        <>
          <span
            className={nav == 'fav' ? 'navButton navActive' : 'navButton'}
            to='/'
            onClick={handleFavClick}
          >
            Favorites
          </span>
          &nbsp;
          <Link
            className={
              !confirming
                ? 'navButton deleteAllButton'
                : 'navButton deleteAllButton deleteConfirm'
            }
            onClick={handleDeleteAll}
            to='/'
          >
            {!confirming
              ? nav == 'fav'
                ? 'Delete ★'
                : 'Clear List'
              : 'Confirm?'}
          </Link>
          &nbsp;
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
      &nbsp;
    </nav>
  );
}

export default NavBar;

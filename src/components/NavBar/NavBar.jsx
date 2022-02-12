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
  deleteSpeechList,
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
    // First round to show confirm button
    if (!confirming) {
      setConfirming(true);
      // Waitime to cancel confirm
      setTimeout(function () {
        setConfirming(false);
      }, 3000);
    } else {
      deleteSpeechList(nav);
      setConfirming(false);
    }
    if (nav == 'loginSignup') {
      setNav('translate');
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
        <>
          <Link
            className={
              !confirming
                ? 'navButton deleteAllButton'
                : 'navButton deleteAllButton deleteConfirm'
            }
            onClick={handleDeleteAll}
            to='/'
          >
            {!confirming ? 'Clear List' : 'Confirm?'}
          </Link>
          &nbsp;
          <Link
            className={
              nav == 'loginSignup' ? 'navButton navActive' : 'navButton'
            }
            to='/login'
            onClick={handleLogin}
          >
            Login · Signup
          </Link>
        </>
      )}
      &nbsp;
    </nav>
  );
}

export default NavBar;

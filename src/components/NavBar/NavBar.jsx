import './NavBar.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

function NavBar({
  user,
  setUser,
  nav,
  setNav,
  setSpeech,
  setSpeechNonLoggedIn,
  renderSpeeches,
  renderFav,
  deleteSpeechList,
  scrollToBottom,
  cancelOperation,
}) {
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  function handlelogOut() {
    // To not allow abort speech to render original list
    cancelOperation('logOut');
    setSpeech([]);
    setSpeechNonLoggedIn([]);
    userService.logOut();
    setUser(null);
    setNav('loginSignup');
    setTimeout(function () {
      navigate('/login');
    }, 100);
  }

  function handleLogin() {
    cancelOperation();
    setNav('loginSignup');
  }

  function handleTranslateClick() {
    cancelOperation('quick');
    if (nav == 'fav') {
      renderSpeeches();
    } else {
      scrollToBottom('noTopRescroll');
    }

    setConfirming(false);
  }

  function handleFavClick() {
    cancelOperation('quick');
    if (nav == 'fav') {
      scrollToBottom('noTopRescroll');
    } else {
      renderFav();
    }
    setConfirming(false);
  }

  function handleDeleteAll() {
    cancelOperation();
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
          {nav != 'loginSignup' ? (
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
          ) : (
            ''
          )}
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

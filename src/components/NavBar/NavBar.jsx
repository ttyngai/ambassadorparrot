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
  renderSpeeches,
  renderFav,
  deleteSpeechList,
  scrollToBottom,
  abortOperation,
}) {
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  function handlelogOut() {
    abortOperation();
    setSpeech([]);
    userService.logOut();
    setUser(null);
    setNav('loginSignup');
    setTimeout(function () {
      navigate('/login');
    }, 500);
  }

  function handleLogin() {
    abortOperation();
    setNav('loginSignup');
  }

  function handleTranslateClick() {
    abortOperation('quick');
    if (nav == 'fav') {
      renderSpeeches();
      scrollToBottom();
    } else {
      scrollToBottom('noTopRescroll');
    }

    setConfirming(false);
  }

  function handleFavClick() {
    abortOperation('quick');
    if (nav == 'fav') {
      scrollToBottom('noTopRescroll');
    } else {
      renderFav();
    }
    setConfirming(false);
  }

  function handleDeleteAll() {
    abortOperation();
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

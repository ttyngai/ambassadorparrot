import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';
function AuthPage({ setUser, setNav }) {
  return (
    <main>
      <br />
      <br />
      <div className='bracketContainer'>
        <div className='authContainer'>
          <span className='loginSignupTitle'>Login/Signup</span>
          <LoginForm setUser={setUser} setNav={setNav} />
          <SignUpForm setUser={setUser} setNav={setNav} />
        </div>
      </div>
    </main>
  );
}

export default AuthPage;

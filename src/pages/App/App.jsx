// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import { Routes, Route } from 'react-router-dom';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';

function App() {
  const [user, setUser] = useState(getUser());
  console.log('the user', user);
  return (
    <main className='App'>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path='/orders/new' element={<NewOrderPage />} />
            <Route path='/orders' element={<OrderHistoryPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
      HELLO
    </main>
  );
}

export default App;

import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm({ setUser }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    setForm({ ...form, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const formData = { ...form };
      // delete formData.error;
      delete formData.confirm;
      console.log('the user', formData);
      const user = await signUp(formData);
      console.log('the user', user);
      if (user) {
        setUser(user);
        navigate('/');
      } else {
        setError('Sign Up Failed - Try Again');
      }
    } catch {
      setError('Sign Up Failed - Try Again');
      console.log('failed!!!!');
    }
  }
  const disable = form.password !== form.confirm;

  return (
    <div>
      <div className='form-container'>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={form.name}
            onChange={(evt) => handleChange(evt)}
            required
          />
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={(evt) => handleChange(evt)}
            required
          />
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={(evt) => handleChange(evt)}
            required
          />
          <label>Confirm</label>
          <input
            type='password'
            name='confirm'
            value={form.confirm}
            onChange={(evt) => handleChange(evt)}
            required
          />
          <button type='submit' disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className='error-message'>&nbsp;{error}</p>
    </div>
  );
}

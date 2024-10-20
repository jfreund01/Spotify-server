import React, { useState } from "react";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log("Login attempted with:", username, password);
  };

  return (
    <div className='container'>
      <header>
        <img
          src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png'
          alt='Spotify Logo'
          className='logo'
        />
      </header>
      <main>
        <h1>Log in to Spotify</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Email address or username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='login-button'>
              Log In
            </button>
          </div>
        </form>
        <div className='divider'>
          <span>or</span>
        </div>
        <div className='social-login'>
          <button className='social-button facebook'>
            Continue with Facebook
          </button>
          <button className='social-button apple'>Continue with Apple</button>
          <button className='social-button google'>Continue with Google</button>
        </div>
      </main>
    </div>
  );
}

export default Login;

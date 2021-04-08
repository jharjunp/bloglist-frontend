import React from 'react'

const loginForm = ({ login, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
    <form onSubmit={login}>
      <div>
          username: <input id="username" value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
          password: <input id="password" value={password}
          onChange={handlePasswordChange}
          type="password"
        />
      </div>
      <div>
        <button id="login-button" type="submit">login</button>
      </div>
    </form>
  )
}

export default loginForm
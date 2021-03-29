import React from 'react'

const loginForm = ({ login, username, handleUsernameChange, password, handlePasswordChange }) => {
    return (
      <form onSubmit={login}>
          <div>
            username: <input value={username} 
            onChange={handleUsernameChange}
            />
          </div>
          <div>
            password: <input value={password} 
            onChange={handlePasswordChange}
            type="password"
            />
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
    )
  }

  export default loginForm
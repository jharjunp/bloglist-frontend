import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [Message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
  }, [])

  const login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const newBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blogi = await blogService.newBlog({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url
      }, user.token)

      setBlogs(blogs.concat(blogi))
      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Bad Blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const like = async (blogObject) => {
    try {
      const blogi = await blogService.updateBlog({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: blogObject.likes +1,
        id: blogObject.id
      }, user.token)
      setBlogs(blogs.map(blog => blog.id !== blogi.id ? blog : blogi))
      setMessage('a new like added')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Bad like!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        await blogService.deleteBlog({
          title: blogObject.title,
          author: blogObject.author,
          url: blogObject.url,
          likes: blogObject.likes,
          id: blogObject.id
        }, user.token)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setMessage('a blog was deleted')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      } catch (exception) {
        setErrorMessage('Bad delete!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm newBlog={newBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} style = {false} />
        <LoginForm login = {login} username = {username} handleUsernameChange = {handleUsernameChange}
          password = {password} handlePasswordChange = {handlePasswordChange} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={Message} style = {true} />
      <p>{user.name} logged in <button id='logout-button' onClick={logout}>{'logout'}</button></p>
      {blogForm()}
      <ul>
        {blogs.sort(function(a,b) {
          return b.likes - a.likes}).map(blog =>
          <Blog key={blog.id} blog={blog} like={like} deleteBlog={deleteBlog}
            user={user} />
        )}
      </ul>
    </div>
  )
}

export default App
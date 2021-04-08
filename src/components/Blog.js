import React, { useState } from 'react'

const Blog = ({ blog, like, deleteBlog, user }) => {

  const [form, setForm] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    listStyle: 'none',
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 0
  }

  const remove = { display: user.username === blog.user.username ? '' : 'none' }

  const short = { display: form ? 'none' : '' }
  const long = { display: form ? '' : 'none' }

  const toggleForm = () => {
    setForm(!form)
  }

  const newLike = (event) => {
    event.preventDefault()
    like(blog)
  }

  const newDeleteBlog = (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={short}>
        <li> {blog.title} {blog.author} <button id='view' onClick={toggleForm}>view</button></li>
      </div>
      <div style={long} className='longBlog'>
        <li> {blog.title} <button id='hide' onClick={toggleForm}>hide</button></li>
        <li> {blog.url}</li>
        <li>likes: {blog.likes} <button id='like' onClick={newLike}>like</button></li>
        <li> {blog.user.name} </li>
        <div style={remove}>
          <li><button id='remove' onClick={newDeleteBlog}>remove</button></li>
        </div>
      </div>
    </div>
  )
}

export default Blog
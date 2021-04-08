import React, { useState } from 'react'

const Blog = ({ blog, like, deleteBlog, user }) => {

  const [form, setForm] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const remove = { display: user.username === blog.user.username ? '' : 'none' }
  console.log('User: ', user)
  console.log('Blog: ', blog)
  console.log('Remove: ', remove)
  console.log('Blog User', blog.user)

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
        <p> {blog.title} {blog.author} <button id='view' onClick={toggleForm}>view</button></p>
      </div>
      <div style={long} className='longBlog'>
        <p> {blog.title} <button id='hide' onClick={toggleForm}>hide</button></p>
        <p> {blog.url}</p>
        <p>likes: {blog.likes} <button id='like' onClick={newLike}>like</button></p>
        <p> {blog.user.name} </p>
        <div style={remove}>
          <p><button id='remove' onClick={newDeleteBlog}>remove</button></p>
        </div>
      </div>
    </div>
  )
}

export default Blog
import React, {useState} from 'react'

const Blog = ({ blog, like, deleteBlog }) => {

  const [form, setForm] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const short = { display: form ? 'none' : '' }
  const long = { display: form ? '' : 'none' }
  
  const toggleForm = () => {
    setForm(!form)
  }
/*
  useImperativeHandle(ref, () => {
    return {
      toggleForm
    }
  })
*/
  const newLike = (event) => {
    event.preventDefault()
    like(blog)
  }

  const newDeleteBlog = (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div style={short}>
        <p> {blog.title} <button onClick={toggleForm}>view</button></p>
      </div>
      <div style={long}>
        <p> {blog.title} <button onClick={toggleForm}>hide</button></p>
        <p> {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={newLike}>like</button></p>
        <p> {blog.author} </p>
        <p><button onClick={newDeleteBlog}>remove</button></p>
      </div>
    </div>  
  )
}

export default Blog
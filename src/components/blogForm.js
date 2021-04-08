import React, { useState } from 'react'

const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleauthorChange = (event) => {
    setauthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    newBlog({
      title,
      author,
      url
    })

    setTitle('')
    setauthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input id='title' value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author: <input id='author' value={author}
            onChange={handleauthorChange}
          />
        </div>
        <div>
          url: <input id='url' value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button id='new-blog' type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
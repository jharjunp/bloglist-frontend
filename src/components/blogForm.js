import React, {useState} from 'react' 

const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }

  const handleauthorChange = (event) => {
    console.log(event.target.value)
    setauthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
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
            title: <input value={title} 
            onChange={handleTitleChange}
            />
          </div>
          <div>
          author: <input value={author} 
            onChange={handleauthorChange}
            />
          </div>
          <div>
            url: <input value={url}
            onChange={handleUrlChange}
            />
          </div>
          <div>
            <button type="submit">create</button>
          </div>
      </form>
    </div>
  )
}

  export default BlogForm
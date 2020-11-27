import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [urlAddress, setUrlAddress] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlAddressChange = (event) => {
    setUrlAddress(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: urlAddress,
    })

    setTitle('')
    setAuthor('')
    setUrlAddress('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author:
          <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          <input value={urlAddress} onChange={handleUrlAddressChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default CreateBlogForm

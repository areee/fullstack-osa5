import React, { useState } from 'react'

const CreateBlogForm = ({ handleSubmit }) => {
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

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
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

export default CreateBlogForm

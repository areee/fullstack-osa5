import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  test('renders title and author but not url and likes', () => {
    const blog = {
      title: 'Hienonhieno testiotsikko johonkin supermahtavaan blogiin',
      author: 'Testi T. Testaaja',
      url: 'http://www.testiosoite.fi',
      likes: 0,
      user: { name: 'Arttu' },
    }

    component = render(<Blog blog={blog} />)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Hienonhieno testiotsikko johonkin supermahtavaan blogiin'
    )
    expect(div).toHaveTextContent('Testi T. Testaaja')

    const anotherDiv = component.container.querySelector('.togglableContent')
    expect(anotherDiv).toHaveStyle('display: none')
  })

  test('url and likes are showed when view button is clicked', () => {
    const blog = {
      title: 'Hienonhieno testiotsikko johonkin supermahtavaan blogiin',
      author: 'Testi T. Testaaja',
      url: 'http://www.testiosoite.fi',
      likes: 0,
      user: { name: 'Arttu' },
    }

    component = render(<Blog blog={blog} />)

    // component.debug()

    // const debugDiv = component.container.querySelector('div')
    // console.log(prettyDOM(debugDiv))

    // expect(component.container).toHaveTextContent(
    //   'Hienonhieno testiotsikko johonkin supermahtavaan blogiin'
    // )

    // const element = component.getByText(
    //   'Component testing is done with react-testing-library'
    // )
    // expect(element).toBeDefined()

    const button = component.getByText('view')
    fireEvent.click(button)

    // component.debug()

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    expect(div).toHaveTextContent('http://www.testiosoite.fi')
    expect(div).toHaveTextContent('likes 0')
  })

  test('clicking the like button twice calls event handler twice', () => {
    const blog = {
      title: 'Hienonhieno testiotsikko johonkin supermahtavaan blogiin',
      author: 'Testi T. Testaaja',
      url: 'http://www.testiosoite.fi',
      likes: 0,
      user: { name: 'Arttu' },
    }

    const mockHandler = jest.fn()

    component = render(<Blog blog={blog} addLikes={mockHandler} />)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

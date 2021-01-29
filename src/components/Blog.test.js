import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
  const blog = {
    title: 'Hienonhieno testiotsikko johonkin supermahtavaan blogiin',
    author: 'Testi T. Testaaja',
    url: 'http://www.testiosoite.fi',
    likes: 0,
    user: { name: 'Arttu' },
  }

  const component = render(<Blog blog={blog} />)

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

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Hienonhieno testiotsikko johonkin supermahtavaan blogiin'
  )
  expect(div).toHaveTextContent('Testi T. Testaaja')

  const anotherDiv = component.container.querySelector('.togglableContent')
  expect(anotherDiv).toHaveStyle('display: none')
})

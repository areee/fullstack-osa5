describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'areee',
      password: 'salainen',
      name: 'Arttu Ylhävuori',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('areee')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Arttu Ylhävuori logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('areee')
      cy.get('#password').type('vaarin')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Arttu Ylhävuori logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('areee')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.contains('create new')
      cy.get('#title').type('Cypressin blogin otsikko')
      cy.get('#author').type('Blogin kirjoittaja')
      cy.get('#url').type('https://www.esimerkki.fi')
      cy.get('#create-button').click()
      cy.contains('Cypressin blogin otsikko Blogin kirjoittaja')
    })
  })
  describe.only('When logged in and added a blog', function () {
    beforeEach(function () {
      cy.get('#username').type('areee')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('Cypressin blogin otsikko')
      cy.get('#author').type('Blogin kirjoittaja')
      cy.get('#url').type('https://www.esimerkki.fi')
      cy.get('#create-button').click()
    })

    it('A blog can be liked', function () {
      cy.get('#show-button').click()
      cy.get('#add-likes-button').click()
      cy.contains('likes 1')
    })

    it('and it can be removed', function () {
      cy.get('#show-button').click()
      cy.get('#remove-button').click()
      cy.contains(
        'A blog Cypressin blogin otsikko by Blogin kirjoittaja removed'
      )
    })
  })
})

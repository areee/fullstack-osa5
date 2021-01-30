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

      cy.get('html').should('not.contain', 'Arttu Ylhävuori logged in')
    })
  })
})

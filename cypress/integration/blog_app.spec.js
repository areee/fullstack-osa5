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
      cy.login({ username: 'areee', password: 'salainen' })
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

    describe('and a blog added', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypressin blogin otsikko',
          author: 'Blogin kirjoittaja',
          url: 'https://www.esimerkki.fi',
          likes: 5,
        })
      })

      it('A blog can be liked', function () {
        cy.get('#show-button').click()
        cy.get('#add-likes-button').click()
        cy.get('.togglableContent').contains('likes 6')
      })

      it('and it can be removed', function () {
        cy.get('#show-button').click()
        cy.get('#remove-button').click()
        cy.contains(
          'A blog Cypressin blogin otsikko by Blogin kirjoittaja removed'
        )
      })

      describe.only('and several blogs added', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Cypressin blogin toinen otsikko',
            author: 'Toinen blogin kirjoittaja',
            url: 'https://www.tokaesimerkki.fi',
            likes: 13,
          })

          cy.createBlog({
            title: 'Cypressin blogin kolmas otsikko',
            author: 'Kolmas blogin kirjoittaja',
            url: 'https://www.kolmasesimerkki.fi',
            likes: 11,
          })
        })

        it('The most liked blog is the first', function () {
          cy.get('.togglableContent').then((a) => {
            cy.wrap(a[0]).contains('likes 13')
            cy.wrap(a[1]).contains('likes 11')
            cy.wrap(a[2]).contains('likes 5')
          })
        })
      })
    })
  })
})

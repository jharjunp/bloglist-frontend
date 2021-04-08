describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Hemmo Paskiainen',
      username: 'HemmoP',
      password: 'Salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type('HemmoP')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('wrong credentials')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Hemmo Paskiainen logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('HemmoP')
      cy.get('#password').type('Salainen')
      cy.get('#login-button').click()
      cy.contains('Hemmo Paskiainen logged in')
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#new-blog').click()
      cy.contains('a blog created by cypress')
    })

    it('it can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('another blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#new-blog').click()
      cy.contains('another blog created by cypress')
        .get('#view')
        .click()
      cy.contains('likes')
        .get('#like')
        .click()
      cy.contains('likes: 1')
    })

    it.only('user can delete his/her own blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('yet another blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#new-blog').click()
      cy.contains('yet another blog created by cypress')
        .get('#view')
        .click()
      cy.get('#remove')
        .click()
      cy.contains('yet another blog created by cypress').should('not.exist')
    })
  })
})
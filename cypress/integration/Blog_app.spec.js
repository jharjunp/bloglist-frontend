describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Hemmo Paskiainen',
      username: 'HemmoP',
      password: 'Salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.login({ username: 'HemmoP', password: 'Salainen' })
    cy.createBlog({
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 1
    })
    cy.createBlog({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2
    })
    cy.createBlog({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 3
    })
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('login fails with wrong password', function() {
    cy.get('#logout-button').click()
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
      cy.contains('likes: 4')
    })

    it('user can delete his/her own blog', function () {
      cy.visit('http://localhost:3000')
      cy.get('.blog')
        .get('#view')
        .click()
      cy.get('#remove')
        .click()
      cy.contains('Canonical string reduction').should('not.exist')
    })
  })

  describe('Blogs are sorted by likes', function() {
    beforeEach(function() {
    })
    it('Bloga are sorted by likes', function() {
      cy.get('ul li:first').should('contain', 'Canonical string reduction' )
      cy.get('ul').find('li').find('#view').last().click()
      cy.get('ul').find('button').eq(-2).click().click().click()
      cy.visit('http://localhost:3000')
      cy.get('ul li:first').should('contain', 'React patterns' )
    })
  })
})
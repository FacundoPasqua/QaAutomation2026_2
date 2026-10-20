describe('Sesión', () => {
  it('entra a la pantalla de productos', () => {
    cy.visit('https://www.saucedemo.com/')
    // Llamar al comando login 
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="title"]').should('have.text', 'Products')
  })

  it('cierra sesión', () => {
    cy.visit('https://www.saucedemo.com/')

    // Llamar al comando login y crear un comando logout
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('#react-burger-menu-btn').click()
    cy.get('[data-test="logout-sidebar-link"]').click()
    cy.url().should('eq', 'https://www.saucedemo.com/')
    cy.get('[data-test="login-button"]').should('be.visible')
  })
})
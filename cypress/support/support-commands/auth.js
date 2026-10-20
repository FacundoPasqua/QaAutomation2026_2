Cypress.Commands.add('login',(username, password)=>{
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
})


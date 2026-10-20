Cypress.Commands.add('completeForm',(firstName, lastName, postalCode)=>{
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
})

Cypress.Commands.add('finalizarCompra',()=>{
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
})
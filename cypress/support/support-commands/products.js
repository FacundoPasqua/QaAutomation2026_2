Cypress.Commands.add('addToCart',(product)=>{
    cy.get(`[data-test="add-to-cart-sauce-${product}"]`).click()
})

Cypress.Commands.add('verifyCartQuantity',(quantity)=>{
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', quantity)
})
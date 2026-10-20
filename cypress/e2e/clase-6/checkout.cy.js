describe('Checkout', () => {
  beforeEach(() => {
    cy.login('standard_user','secret_sauce')
    cy.addToCart('labs-backpack')

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
  })

  it('compra completa', () => {
    cy.completeForm('Juan', 'Sapeeee','5000')
    cy.finalizarCompra()
  })

  it('sin nombre muestra error', () => {
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'First Name is required')
  })

  it('sin código postal muestra error', () => {
    cy.get('[data-test="firstName"]').type('Naza')
    cy.get('[data-test="lastName"]').type('Perez')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Postal Code is required')
  })
})
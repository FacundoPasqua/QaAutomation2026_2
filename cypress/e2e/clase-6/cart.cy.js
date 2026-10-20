describe('Carrito', () => {
  beforeEach(() => {
    cy.login('standard_user','secret_sauce')
  })

  it('agrega un producto', () => {
    cy.addToCart('labs-backpack')
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
  })

  it('agrega dos productos', () => {
    cy.addToCart('labs-backpack')
    cy.addToCart('labs-bike-light')
    cy.verifyCartQuantity('2')
  })

  it('el producto aparece en el carrito', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    // Validar que se acceda al carrito
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="title"]').should('have.text', 'Your Cart')
    cy.get('[data-test="inventory-item-name"]').should('have.text', 'Sauce Labs Backpack')
  })
})